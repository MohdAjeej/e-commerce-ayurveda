const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();

    console.log(data);
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new ApiError(data?.message || "Something went wrong. Please try again.", res.status, data);
  }


  return data;
}
