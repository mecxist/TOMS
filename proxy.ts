import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// Public routes that don't require authentication
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
]

// Admin-only routes
const adminRoutes = [
  '/admin',
]

// Manager and above routes
const managerRoutes = [
  '/projects',
  '/matching',
  '/payroll',
]

// Coordinator and above routes
const coordinatorRoutes = [
  '/applications',
  '/interviews',
  '/offers',
  '/requisitions',
]

// Role hierarchy for demo mode access checks
const roleHierarchy: Record<string, string[]> = {
  admin: ['admin', 'manager', 'coordinator', 'talent'],
  manager: ['manager', 'coordinator', 'talent'],
  coordinator: ['coordinator', 'talent'],
  talent: ['talent'],
}

function checkDemoAccess(demoRole: string, pathname: string): boolean {
  const roles = roleHierarchy[demoRole] || []

  if (adminRoutes.some(route => pathname.startsWith(route))) {
    return roles.includes('admin') || demoRole === 'admin'
  }
  if (managerRoutes.some(route => pathname.startsWith(route))) {
    return demoRole === 'admin' || demoRole === 'manager'
  }
  if (coordinatorRoutes.some(route => pathname.startsWith(route))) {
    return demoRole === 'admin' || demoRole === 'manager' || demoRole === 'coordinator'
  }
  return true
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Allow API auth routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Demo mode: bypass better-auth, use demo cookie instead
  if (isDemoMode) {
    const demoAuthenticated = req.cookies.get('demo_authenticated')?.value
    const demoRole = req.cookies.get('demo_role')?.value

    if (!demoAuthenticated || !demoRole) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!checkDemoAccess(demoRole, pathname)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    return NextResponse.next()
  }

  // Production mode: use better-auth
  try {
    const { auth } = await import('@/lib/auth')
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signInUrl)
    }

    const { prisma } = await import('@/lib/db')
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    if (!user) {
      const signInUrl = new URL('/sign-in', req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Check role-based access
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }

    if (managerRoutes.some(route => pathname.startsWith(route))) {
      if (!['ADMIN', 'MANAGER'].includes(user.role)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }

    if (coordinatorRoutes.some(route => pathname.startsWith(route))) {
      if (!['ADMIN', 'MANAGER', 'COORDINATOR'].includes(user.role)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Proxy error:', error)
    const signInUrl = new URL('/sign-in', req.url)
    return NextResponse.redirect(signInUrl)
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes (except auth)
    '/(api|trpc)(.*)',
  ],
}
