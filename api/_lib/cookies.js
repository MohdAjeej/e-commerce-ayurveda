import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "./config.js";

export function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  return header.split(";").reduce((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (key) acc[key] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}

export function setSessionCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${SESSION_COOKIE_NAME}=${token}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  if (isProd) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearSessionCookie(res) {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [`${SESSION_COOKIE_NAME}=`, "HttpOnly", "Path=/", "Max-Age=0", "SameSite=Lax"];
  if (isProd) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function getSessionToken(req) {
  return parseCookies(req)[SESSION_COOKIE_NAME] || null;
}
