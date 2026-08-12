import { hashOtp, timingSafeEqualHex, generateSessionToken } from "../_lib/crypto.js";
import {
  getOtp,
  deleteOtp,
  incrementOtpAttempts,
  getUserByEmail,
  createUser,
  saveSession,
} from "../_lib/store.js";
import { setSessionCookie } from "../_lib/cookies.js";
import { MAX_VERIFY_ATTEMPTS, SESSION_MAX_AGE_SECONDS } from "../_lib/config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  const otp = String(req.body?.otp || "").trim();

  const record = getOtp(email);
  if (!record) {
    res.status(400).json({ message: "OTP not requested or already used. Please request a new code." });
    return;
  }

  if (Date.now() > record.expiresAt) {
    deleteOtp(email);
    res.status(400).json({ message: "OTP has expired. Please request a new OTP." });
    return;
  }

  if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
    deleteOtp(email);
    res.status(429).json({ message: "Too many attempts. Please request a new OTP." });
    return;
  }

  const candidateHash = hashOtp(otp, email);
  if (!timingSafeEqualHex(candidateHash, record.hash)) {
    incrementOtpAttempts(email);
    res.status(400).json({
      message: "Incorrect OTP. Please try again.",
      attemptsRemaining: Math.max(0, MAX_VERIFY_ATTEMPTS - (record.attempts + 1)),
    });
    return;
  }

  deleteOtp(email);

  let user = getUserByEmail(email);
  const isNewUser = !user;
  if (!user) user = createUser({ email });

  const token = generateSessionToken();
  saveSession(token, { userId: user.id, expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 });
  setSessionCookie(res, token);

  res.status(200).json({ success: true, isNewUser, user });
}
