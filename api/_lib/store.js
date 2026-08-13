// In-memory persistence for orders.
//
// LIMITATION: attached to `globalThis` so a warm Vercel serverless instance
// reuses the same Map across invocations, but this resets on every cold
// start and is NOT shared across concurrent lambda instances. Fine for a
// demo/low-traffic deployment; swap this file for Upstash Redis (or another
// real datastore) before relying on it in production — every API handler
// only imports from this module, so the swap is isolated to this one file.
const g = globalThis;
g.__ojasStore ??= {
  orders: new Map(),
};

const store = g.__ojasStore;

export function saveOrder(id, order) {
  store.orders.set(id, order);
}

export function getOrder(id) {
  return store.orders.get(id) ?? null;
}
