import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import cookie from 'cookie';

const publicRoutes = ['/login', '/registration'];
const protectedRoutes = ['/dashboard', '/api/:path*'];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const token = cookies.token;

  let isAuthenticated = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (err) {
      console.error('Token verification failed:', err);
    }
  }

  if (isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (isAuthenticated) {
    return NextResponse.next();
  }

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*', '/login', '/registration'],
};
