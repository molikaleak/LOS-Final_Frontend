import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, PUBLIC_ROUTES } from "@/lib/constants";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Next.js Middleware Route Protection Example
  // 1. Get the mocked user role from our cookie
  const userRoleCookie = request.cookies.get("user-role");
  const userRole = userRoleCookie?.value || "head-admin"; // default to admin

  // 2. Define our protected routes mapping (route prefix -> required role / conditions)
  // In a real app, this might involve decoding a JWT and checking an array of capabilities
  const routePermissions: Record<string, string[]> = {
    "/settings": ["head-admin"], // Only head-admin can access settings
    "/users": ["head-admin", "compliance-officer"],
    "/audit-logs": ["head-admin", "compliance-officer"],
    "/credit-scoring": ["head-admin", "credit-analyst", "risk-manager"],
    "/risk-analytics": ["head-admin", "credit-analyst", "risk-manager", "compliance-officer"],
    "/approvals": ["head-admin", "senior-lo", "risk-manager"],
  };

  // 3. Scan our route map to see if the user is visiting a restricted page
  for (const [protectedRoute, allowedRoles] of Object.entries(routePermissions)) {
    if (pathname.startsWith(protectedRoute)) {
      if (!allowedRoles.includes(userRole)) {
        // 4. User lacks permission! Redirect them to the safest page (Dashboard)
        const redirectUrl = new URL("/dashboard", request.url);
        // Optional: append an error message param `?error=unauthorized`
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  // Check for session token (kept from original code)
  const session = request.cookies.get(SESSION_COOKIE_NAME);
  if (!session?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
