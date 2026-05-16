import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight middleware that checks for the auth session cookie
 * WITHOUT importing NextAuth or Prisma (which crash in Edge Runtime
 * and cause infinite error loops that thrash CPU/RAM).
 */

const protectedRoutes = ['/workspace', '/archive', '/insights', '/settings'];
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

function hasSessionCookie(req: NextRequest): boolean {
  return (
    req.cookies.has('authjs.session-token') ||
    req.cookies.has('__Secure-authjs.session-token')
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = hasSessionCookie(req);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/workspace', req.url));
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname + (req.nextUrl.search || ''));
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/workspace/:path*',
    '/archive/:path*',
    '/insights/:path*',
    '/settings/:path*',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ],
};
