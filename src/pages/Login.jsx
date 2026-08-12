import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, ShieldCheck, User } from "lucide-react";
import OtpInput from "../components/common/OtpInput";
import Reveal from "../components/common/Reveal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import useCountdown from "../hooks/useCountdown";
import { isValidEmail, isValidMobile, maskEmail } from "../utils/validators";
import { consumePendingAction } from "../utils/pendingAction";
import "./Login.css";

export default function Login() {
  const { isAuthenticated, loading: authLoading, sendOTP, verifyOTP, completeProfile } = useAuth();
  const cart = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState("email"); // 'email' | 'otp' | 'profile'
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [cooldownUntil, setCooldownUntil] = useState(null);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const { secondsLeft: expirySecondsLeft, isExpired } = useCountdown(expiresAt);
  const { secondsLeft: cooldownSecondsLeft, isExpired: cooldownDone } = useCountdown(cooldownUntil);

  const redirectTarget = () => {
    const pending = consumePendingAction();
    if (pending?.type === "BUY_NOW" && pending.product) {
      cart.setBuyNowItem(pending.product, pending.quantity || 1);
    } else if (pending?.type === "ADD_TO_CART" && pending.product) {
      cart.addToCart(pending.product, pending.quantity || 1);
    }
    return pending?.redirectTo || location.state?.from || "/";
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirectTarget(), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated]);

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSending(true);
    try {
      const data = await sendOTP(email.trim().toLowerCase());
      setExpiresAt(Date.now() + (data.expiresInSeconds || 300) * 1000);
      setCooldownUntil(Date.now() + (data.cooldownSeconds || 60) * 1000);
      setOtp("");
      setOtpError("");
      setStep("otp");
      if (data.devOtp) {
        toast.info(`Dev mode: your OTP is ${data.devOtp}`, 8000);
      }
    } catch (err) {
      if (err.status === 429 && err.payload?.cooldownSecondsRemaining) {
        setCooldownUntil(Date.now() + err.payload.cooldownSecondsRemaining * 1000);
        setStep("otp");
      }
      toast.error(err.message || "Unable to send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (code = otp) => {
    if (code.length !== 6 || verifying) return;
    setVerifying(true);
    setOtpError("");
    try {
      const data = await verifyOTP(email.trim().toLowerCase(), code);
      if (data.success) {
        if (data.isNewUser) {
          setStep("profile");
        } else {
          navigate(redirectTarget(), { replace: true });
        }
      } else {
        setOtpError(data.message || "Incorrect OTP. Please try again.");
        setOtp("");
      }
    } catch {
      toast.error("Something went wrong verifying your code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!cooldownDone) return;
    await handleSendOtp();
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (mobile && !isValidMobile(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    setSavingProfile(true);
    try {
      if (fullName.trim() || mobile.trim()) {
        await completeProfile(fullName.trim(), mobile.trim());
      }
      navigate(redirectTarget(), { replace: true });
    } catch {
      toast.error("Couldn't save your profile. You can update it later from Account.");
      navigate(redirectTarget(), { replace: true });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSkipProfile = () => {
    navigate(redirectTarget(), { replace: true });
  };

  return (
    <section className="login-page">
      <div className="container login-page__inner">
        <Reveal className="login-card">
          {step === "email" && (
            <>
              <span className="login-card__icon">
                <Mail size={22} strokeWidth={1.75} />
              </span>
              <h1>Welcome Back</h1>
              <p className="login-card__subtitle">Sign in or create your account</p>

              <form onSubmit={handleSendOtp} className="login-card__form" noValidate>
                <label className="login-card__label" htmlFor="login-email">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  className={`login-card__input ${emailError ? "has-error" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  autoFocus
                  autoComplete="email"
                />
                {emailError && <span className="login-card__error">{emailError}</span>}

                <button type="submit" className="btn login-card__submit" disabled={sending}>
                  {sending ? "Sending..." : "Continue"}
                </button>
              </form>

              <p className="login-card__hint">We'll send a verification code to your email.</p>
            </>
          )}

          {step === "otp" && (
            <>
              <span className="login-card__icon">
                <ShieldCheck size={22} strokeWidth={1.75} />
              </span>
              <h1>Verify your email</h1>
              <p className="login-card__subtitle">
                We sent a 6-digit verification code to
                <br />
                <strong>{maskEmail(email)}</strong>
              </p>

              <div className="login-card__otp-wrap">
                <OtpInput value={otp} onChange={setOtp} onComplete={handleVerify} disabled={verifying} error={!!otpError} />
                {otpError && <span className="login-card__error login-card__error--center">{otpError}</span>}
                {!isExpired ? (
                  <span className="login-card__expiry">
                    Code expires in {Math.floor(expirySecondsLeft / 60)}:{String(expirySecondsLeft % 60).padStart(2, "0")}
                  </span>
                ) : (
                  <span className="login-card__expiry login-card__expiry--expired">
                    OTP expired. Please request a new one.
                  </span>
                )}
              </div>

              <button
                type="button"
                className="btn login-card__submit"
                disabled={otp.length !== 6 || verifying}
                onClick={() => handleVerify()}
              >
                {verifying ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="login-card__resend">
                <span>Didn't receive the code?</span>
                {cooldownDone ? (
                  <button type="button" className="login-card__resend-btn" onClick={handleResend} disabled={sending}>
                    {sending ? "Sending..." : "Resend OTP"}
                  </button>
                ) : (
                  <span className="login-card__resend-cooldown">Resend OTP in {cooldownSecondsLeft}s</span>
                )}
              </div>

              <button type="button" className="login-card__back" onClick={() => setStep("email")}>
                ← Use a different email
              </button>
            </>
          )}

          {step === "profile" && (
            <>
              <span className="login-card__icon">
                <User size={22} strokeWidth={1.75} />
              </span>
              <h1>Complete your profile</h1>
              <p className="login-card__subtitle">Just a couple of details to personalize your experience.</p>

              <form onSubmit={handleProfileSubmit} className="login-card__form" noValidate>
                <label className="login-card__label" htmlFor="login-name">
                  Full Name
                </label>
                <input
                  id="login-name"
                  type="text"
                  className="login-card__input"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoFocus
                />

                <label className="login-card__label" htmlFor="login-mobile">
                  Mobile Number
                </label>
                <input
                  id="login-mobile"
                  type="tel"
                  inputMode="numeric"
                  className={`login-card__input ${mobileError ? "has-error" : ""}`}
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                    if (mobileError) setMobileError("");
                  }}
                />
                {mobileError && <span className="login-card__error">{mobileError}</span>}

                <button type="submit" className="btn login-card__submit" disabled={savingProfile}>
                  {savingProfile ? "Saving..." : "Continue"}
                </button>
                <button type="button" className="login-card__skip" onClick={handleSkipProfile} disabled={savingProfile}>
                  Skip for now
                </button>
              </form>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
