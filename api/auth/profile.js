import { requireAuth } from "../_lib/requireAuth.js";
import { updateUser } from "../_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const user = requireAuth(req, res);
  if (!user) return;

  const name = req.body?.name != null ? String(req.body.name).trim().slice(0, 120) : user.name;
  const mobile = req.body?.mobile != null ? String(req.body.mobile).trim().slice(0, 20) : user.mobile;

  const updated = updateUser(user.id, { name, mobile });
  res.status(200).json({ success: true, user: updated });
}
