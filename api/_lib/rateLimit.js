// Simple in-memory sliding-window rate limiter, keyed by client IP.
// Same globalThis-attached-Map pattern as store.js; resets on cold start,
// which is acceptable for the abuse-deterrence this is meant to provide.
const g = globalThis;
g.__ojasRateLimits ??= new Map();
const hits = g.__ojasRateLimits;

export function isRateLimited(req, key, { max, windowMs }) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();

  const timestamps = (hits.get(bucketKey) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= max) {
    hits.set(bucketKey, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(bucketKey, timestamps);
  return false;
}
