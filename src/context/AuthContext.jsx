import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch, ApiError } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch("/auth/me");
        if (!cancelled) setUser(data?.user || null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sendOTP = useCallback(async (email) => {
    return apiFetch("/auth/send-otp", { method: "POST", body: { email } });
  }, []);

  const verifyOTP = useCallback(async (email, otp) => {
    try {
      const data = await apiFetch("/auth/verify-otp", { method: "POST", body: { email, otp } });
      if (data?.success && data?.user) setUser(data.user);
      return data;
    } catch (err) {
      if (err instanceof ApiError && err.status && err.status < 500) {
        return { success: false, message: err.message, attemptsRemaining: err.payload?.attemptsRemaining };
      }
      throw err;
    }
  }, []);

  const completeProfile = useCallback(async (name, mobile) => {
    const data = await apiFetch("/auth/profile", { method: "PATCH", body: { name, mobile } });
    if (data?.user) setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      sendOTP,
      verifyOTP,
      completeProfile,
      logout,
    }),
    [user, loading, sendOTP, verifyOTP, completeProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
