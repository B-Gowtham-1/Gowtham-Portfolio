import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Only protect routes matching /admin or /admin/*
  if (path.startsWith("/admin")) {
    // Check if the system is running in mock mode (which sets a specific test cookie)
    const mockRoleCookie = request.cookies.get("zenitsu-mock-role");
    
    // In actual production, Supabase stores tokens in cookies like sb-[id]-auth-token
    // Let's check for any supabase auth token cookie
    let hasRealSupabaseSession = false;
    
    const cookies = request.cookies.getAll();
    for (const cookie of cookies) {
      if (cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token")) {
        hasRealSupabaseSession = true;
        break;
      }
    }

    // Determine authorization state
    const isMockAdmin = mockRoleCookie?.value === "admin";
    const isAuthorized = isMockAdmin || hasRealSupabaseSession;

    if (!isAuthorized) {
      // Redirect unauthorized attempts to `/login`
      url.pathname = "/login";
      // Save the target url so we can redirect them back after successful login
      url.searchParams.set("redirectTo", path);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Limit middleware to run only on /admin and sub-paths
export const config = {
  matcher: ["/admin/:path*"],
};
