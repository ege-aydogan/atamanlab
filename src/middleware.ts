import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes — no i18n, auth guard
  if (pathname.startsWith('/admin')) {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    // Check for NextAuth session cookie
    const sessionToken = request.cookies.get('next-auth.session-token') || 
                         request.cookies.get('__Secure-next-auth.session-token');
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // API routes — no i18n
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Public pages — i18n locale routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Admin auth guard
    '/admin/:path*',
    // i18n locale routing — exclude static files and API
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
