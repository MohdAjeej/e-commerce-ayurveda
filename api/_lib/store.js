// In-memory persistence for OTPs/users/sessions/orders.
//
// LIMITATION: attached to `globalThis` so a warm Vercel serverless instance
// reuses the same Maps across invocations, but this resets on every cold
// start and is NOT shared across concurrent lambda instances. Fine for a
// demo/low-traffic deployment; swap this file for Upstash Redis (or another
// real datastore) before relying on it in production — every API handler
// only imports from this module, so the swap is isolated to this one file.
const g = globalThis;
g.__ojasStore ??= {
  otps: new Map(),
  users: new Map(),
  sessions: new Map(),
  orders: new Map(),
};

const store = g.__ojasStore;

export function saveOtp(email, record) {
  store.otps.set(email, record);
}

export function getOtp(email) {
  return store.otps.get(email) ?? null;
}

export function deleteOtp(email) {
  store.otps.delete(email);
}

export function incrementOtpAttempts(email) {
  const record = store.otps.get(email);
  if (record) record.attempts += 1;
}

export function getUserByEmail(email) {
  for (const user of store.users.values()) {
    if (user.email === email) return user;
  }
  return null;
}

export function createUser({ email }) {
  const id = randomId();
  const user = { id, email, name: null, mobile: null, createdAt: Date.now() };
  store.users.set(id, user);
  return user;
}

export function updateUser(id, patch) {
  const user = store.users.get(id);
  if (!user) return null;
  const updated = { ...user, ...patch };
  store.users.set(id, updated);
  return updated;
}

export function getUserById(id) {
  return store.users.get(id) ?? null;
}

export function saveSession(token, session) {
  store.sessions.set(token, session);
}

export function getSession(token) {
  return store.sessions.get(token) ?? null;
}

export function deleteSession(token) {
  store.sessions.delete(token);
}

export function saveOrder(id, order) {
  store.orders.set(id, order);
}

export function getOrder(id) {
  return store.orders.get(id) ?? null;
}

export function getOrdersByUser(userId) {
  return [...store.orders.values()]
    .filter((order) => order.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

function randomId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}
