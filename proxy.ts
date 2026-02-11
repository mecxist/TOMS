import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/login',
  '/welcome',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
  '/accept-invitation',
  '/apply',
  '/api/auth',
  '/design-system',
]

const adminRoutes = ['/admin']
const managerRoutes = ['/projects', '/matching', '/payroll']
const coordinatorRoutes = ['/applications', '/interviews', '/offers', '/requisitions']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Demo mode auth via cookies
  const demoAuthenticated = req.cookies.get('demo_authenticated')?.value
  const demoRole = req.cookies.get('demo_role')?.value

  if (!demoAuthenticated || !demoRole) {
    // Unauthenticated: redirect root to /welcome, everything else to /login
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/welcome', req.url))
    }
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based access checks
  if (adminRoutes.some(route => pathname.startsWith(route)) && demoRole !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (managerRoutes.some(route => pathname.startsWith(route)) && !['admin', 'manager'].includes(demoRole)) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (coordinatorRoutes.some(route => pathname.startsWith(route)) && !['admin', 'manager', 'coordinator'].includes(demoRole)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
