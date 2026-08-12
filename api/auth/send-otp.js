import { generateOtp, hashOtp } from "../_lib/crypto.js";
import { saveOtp, getOtp } from "../_lib/store.js";
import { sendOtpEmail } from "../_lib/sendOtpEmail.js";
import { OTP_EXPIRY_SECONDS, RESEND_COOLDOWN_SECONDS } from "../_lib/config.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ message: "Please enter a valid email address." });
    return;
  }

  const existing = getOtp(email);
  if (existing && Date.now() - existing.createdAt < RESEND_COOLDOWN_SECONDS * 1000) {
    const cooldownSecondsRemaining = Math.ceil(
      (RESEND_COOLDOWN_SECONDS * 1000 - (Date.now() - existing.createdAt)) / 1000
    );
    res.status(429).json({ message: "Please wait before requesting another code.", cooldownSecondsRemaining });
    return;
  }

  const otp = generateOtp();
  const hash = hashOtp(otp, email);
  saveOtp(email, {
    hash,
    attempts: 0,
    createdAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY_SECONDS * 1000,
  });

  let devOtp;
  try {
    const result = await sendOtpEmail(email, otp);
    devOtp = result?.devOtp;
  } catch {
    res.status(502).json({ message: "Unable to send OTP. Please try again." });
    return;
  }

  res.status(200).json({
    success: true,
    expiresInSeconds: OTP_EXPIRY_SECONDS,
    cooldownSeconds: RESEND_COOLDOWN_SECONDS,
    ...(devOtp ? { devOtp } : {}),
  });
}
