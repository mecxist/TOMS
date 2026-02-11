import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './db'
import { UserRole } from '@prisma/client'

// Better Auth configuration
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    {
      id: 'two-factor',
    } as any,
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  email: {
    sendVerificationEmail: async ({ user, url }: { user: { email: string }; url: string }) => {
      // Email sending will be handled by our email service
      // This is a placeholder - actual implementation in lib/emails/sender.ts
      console.log('Verification email:', { email: user.email, url })
    },
    sendPasswordResetEmail: async ({ user, url }: { user: { email: string }; url: string }) => {
      console.log('Password reset email:', { email: user.email, url })
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || 'change-me-in-production',
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
})

// Auth helper functions
export async function requireAuth() {
  const session = await auth.api.getSession({ headers: {} })
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session.user
}

export async function requireRole(allowedRoles: UserRole[]) {
  const session = await auth.api.getSession({ headers: {} })
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // Get user from database to check role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (!user || !allowedRoles.includes(user.role)) {
    throw new Error('Forbidden')
  }

  return {
    user: session.user,
    role: user.role,
    userId: session.user.id,
  }
}

export async function getCurrentUserRole(): Promise<UserRole | null> {
  try {
    const session = await auth.api.getSession({ headers: {} })
    if (!session?.user) return null

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    return user?.role || null
  } catch {
    return null
  }
}

export function hasPermission(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole)
}

// Client-side auth helper - re-exported from lib/auth-client.ts
export { authClient } from './auth-client'
