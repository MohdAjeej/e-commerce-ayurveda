const PENDING_ACTION_KEY = "ojas_pending_action_v1";

export function stashPendingAction(action) {
  try {
    sessionStorage.setItem(PENDING_ACTION_KEY, JSON.stringify(action));
  } catch {
    // ignore
  }
}

export function consumePendingAction() {
  try {
    const raw = sessionStorage.getItem(PENDING_ACTION_KEY);
    sessionStorage.removeItem(PENDING_ACTION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
