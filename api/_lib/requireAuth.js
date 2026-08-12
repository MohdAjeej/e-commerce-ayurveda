import { getSessionToken } from "./cookies.js";
import { getSession, getUserById } from "./store.js";

export function requireAuth(req, res) {
  const token = getSessionToken(req);
  const session = token && getSession(token);
  if (!session || session.expiresAt < Date.now()) {
    res.status(401).json({ message: "Not authenticated" });
    return null;
  }
  const user = getUserById(session.userId);
  if (!user) {
    res.status(401).json({ message: "Not authenticated" });
    return null;
  }
  return user;
}
