// Swappable OTP delivery. No email provider is configured yet: this logs the
// code server-side and echoes it back in the response only outside
// production, so the full auth flow is testable without any external
// service. Wire a real provider (e.g. Resend) here later using a
// server-only env var (never VITE_-prefixed) — never change the
// production-safe default below.
export async function sendOtpEmail(email, code) {
  const isProd = process.env.NODE_ENV === "production";
  const devMode = process.env.OTP_DEV_MODE === "true" || !isProd;

  if (!process.env.EMAIL_PROVIDER_API_KEY) {
    console.log(`[OJAS OTP - DEV MODE] ${email}: ${code}`);
    return { devOtp: devMode ? code : undefined };
  }

  // Future: call the real email provider using process.env.EMAIL_PROVIDER_API_KEY.
  return {};
}
