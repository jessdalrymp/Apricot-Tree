// Shared helper for talking to the Printify API from serverless functions.
// Never import this from client code — PRINTIFY_API_KEY must stay server-side.

const PRINTIFY_BASE = "https://api.printify.com/v1";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export async function printifyFetch(path: string, init: RequestInit = {}) {
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

export function getShopId(): string {
  return requireEnv("PRINTIFY_SHOP_ID");
}
