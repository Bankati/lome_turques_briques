import { NextRequest, NextResponse } from "next/server";

const TOKEN_TTL = 24 * 60 * 60 * 1000;

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

async function verifyToken(token: string): Promise<boolean> {
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

export async function middleware(request: NextRequest) {
  // Normalize pathname: remove trailing slash (next.config.js has trailingSlash: true)
  const raw = request.nextUrl.pathname;
  const pathname = raw.length > 1 && raw.endsWith("/") ? raw.slice(0, -1) : raw;

  // Inject normalized pathname into request headers for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Allow login page and login API without auth
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Protect all /admin and /api/admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    const valid = token ? await verifyToken(token) : false;

    if (!valid) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
      }
      // Redirect with trailing slash to avoid a Next.js double-redirect
      return NextResponse.redirect(new URL("/admin/login/", request.url));
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
