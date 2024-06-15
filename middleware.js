import { NextResponse } from 'next/server'

export function middleware(request) {
  console.log('Middleware called')
  const isAuthenticated = true

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next()
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/dashboard/:path*',
}