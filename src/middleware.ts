import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

// We just need a dummy config to init next-auth in the Edge Runtime
const { auth } = NextAuth({
  providers: [],
});

const protectedRoutes = ['/workspace', '/archive', '/insights', '/settings'];
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/workspace', nextUrl));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
