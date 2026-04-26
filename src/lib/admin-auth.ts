const TOKEN_TTL = 24 * 60 * 60 * 1000; // 24h

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "ltb-default-secret";
  const payload = btoa(JSON.stringify({ ts: Date.now(), role: "admin" }));
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toHex(sig)}`;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_SECRET ?? "ltb-default-secret";
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const key = await getKey(secret);
    const expected = toHex(
      await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
    );
    if (sig !== expected) return false;
    const { ts } = JSON.parse(atob(payload));
    return Date.now() - ts < TOKEN_TTL;
  } catch {
    return false;
  }
}
