// Shared helper for talking to the Printify API from server.js.
// Never import this from client-side code — PRINTIFY_API_KEY must stay server-side.

const PRINTIFY_BASE = "https://api.printify.com/v1";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export async function printifyFetch(path, init = {}) {
  const apiKey = requireEnv("PRINTIFY_API_KEY");
  const res = await fetch(`${PRINTIFY_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Printify API error (${res.status}): ${body}`);
  }

  return res.json();
}

export function getShopId() {
  return requireEnv("PRINTIFY_SHOP_ID");
}
