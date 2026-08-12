import { getSessionToken, clearSessionCookie } from "../_lib/cookies.js";
import { deleteSession } from "../_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const token = getSessionToken(req);
  if (token) deleteSession(token);
  clearSessionCookie(res);

  res.status(200).json({ success: true });
}
