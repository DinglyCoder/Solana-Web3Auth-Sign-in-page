import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/lib/session'

export async function middleware(request: NextRequest) {
  // Skip middleware for API routes, static files, and public assets
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/favicon.ico') ||
    request.nextUrl.pathname.startsWith('/public/')
  ) {
    return NextResponse.next()
  }

  // Check for session on protected routes
  const session = await getSession()
  
  // If no session and trying to access protected content, redirect to login
  if (!session && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
