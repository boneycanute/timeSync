// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("🛡️ Middleware running for path:", req.nextUrl.pathname);

  // Skip middleware for auth-related routes
  if (
    req.nextUrl.pathname === "/auth/callback" ||
    req.nextUrl.pathname === "/auth-error"
  ) {
    console.log("⏭️ Skipping middleware for auth route");
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res,
  });

  // Only protect dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("🔒 Checking dashboard access");
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      console.log("❌ No session, redirecting to home");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/callback", "/auth-error"],
};
