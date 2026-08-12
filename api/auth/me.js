import { getSessionToken } from "../_lib/cookies.js";
import { getSession, getUserById } from "../_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const token = getSessionToken(req);
  const session = token && getSession(token);

  if (!session || session.expiresAt < Date.now()) {
    res.status(200).json({ user: null });
    return;
  }

  const user = getUserById(session.userId);
  res.status(200).json({ user: user || null });
}
