import { prisma } from './db'
import { UserRole, InvitationStatus } from '@prisma/client'
import { randomBytes } from 'crypto'
import { sendInvitationEmail } from './emails/sender'

export interface CreateInvitationInput {
  email: string
  organizationId: string
  role: UserRole
  invitedById: string
}

export interface InvitationWithDetails {
  id: string
  email: string
  organizationId: string
  organization: {
    name: string
  }
  role: UserRole
  invitedBy: {
    id: string
    email: string
    name: string | null
  }
  token: string
  status: InvitationStatus
  expiresAt: Date
  acceptedAt: Date | null
  createdAt: Date
}

/**
 * Generate a secure invitation token
 */
function generateToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Create a new invitation
 */
export async function createInvitation(input: CreateInvitationInput) {
  const token = generateToken()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiration

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  })

  // Check for existing pending invitation
  const existingInvitation = await prisma.invitation.findFirst({
    where: {
      email: input.email,
      organizationId: input.organizationId,
      status: 'PENDING',
      expiresAt: {
        gt: new Date(),
      },
    },
  })

  if (existingInvitation) {
    throw new Error('An invitation already exists for this email')
  }

  const invitation = await prisma.invitation.create({
    data: {
      email: input.email,
      organizationId: input.organizationId,
      role: input.role,
      invitedById: input.invitedById,
      token,
      expiresAt,
      status: 'PENDING',
      inviteeId: existingUser?.id,
    },
    include: {
      organization: {
        select: {
          name: true,
        },
      },
      inviter: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  })

  // Send invitation email
  try {
    await sendInvitationEmail({
      email: invitation.email,
      token: invitation.token,
      organizationName: invitation.organization.name,
      inviterName: invitation.inviter.name || invitation.inviter.email,
      role: invitation.role,
    })
  } catch (error) {
    console.error('Failed to send invitation email:', error)
    // Don't fail the invitation creation if email fails
  }

  return invitation
}

/**
 * Create multiple invitations (bulk)
 */
export async function createBulkInvitations(
  inputs: CreateInvitationInput[]
): Promise<{ success: number; failed: Array<{ email: string; error: string }> }> {
  const results = { success: 0, failed: [] as Array<{ email: string; error: string }> }

  for (const input of inputs) {
    try {
      await createInvitation(input)
      results.success++
    } catch (error: any) {
      results.failed.push({
        email: input.email,
        error: error.message || 'Unknown error',
      })
    }
  }

  return results
}

/**
 * Get invitation by token
 */
export async function getInvitationByToken(token: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      inviter: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  })

  if (!invitation) {
    return null
  }

  // Check if expired
  if (invitation.expiresAt < new Date() && invitation.status === 'PENDING') {
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: 'EXPIRED' },
    })
    return null
  }

  return invitation
}

/**
 * Accept an invitation
 */
export async function acceptInvitation(token: string, userId: string) {
  const invitation = await getInvitationByToken(token)

  if (!invitation) {
    throw new Error('Invalid or expired invitation')
  }

  if (invitation.status !== 'PENDING') {
    throw new Error('Invitation has already been used or cancelled')
  }

  // Update user's organization and role
  await prisma.user.update({
    where: { id: userId },
    data: {
      organizationId: invitation.organizationId,
      role: invitation.role,
    },
  })

  // Mark invitation as accepted
  await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
      status: 'ACCEPTED',
      acceptedAt: new Date(),
      inviteeId: userId,
    },
  })

  return invitation
}

/**
 * Resend invitation email
 */
export async function resendInvitation(invitationId: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: {
      organization: {
        select: {
          name: true,
        },
      },
      inviter: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  })

  if (!invitation) {
    throw new Error('Invitation not found')
  }

  if (invitation.status !== 'PENDING') {
    throw new Error('Can only resend pending invitations')
  }

  // Extend expiration if needed
  const newExpiresAt = new Date()
  newExpiresAt.setDate(newExpiresAt.getDate() + 7)

  await prisma.invitation.update({
    where: { id: invitationId },
    data: {
      expiresAt: newExpiresAt,
    },
  })

  // Resend email
  await sendInvitationEmail({
    email: invitation.email,
    token: invitation.token,
    organizationName: invitation.organization.name,
    inviterName: invitation.inviter.name || invitation.inviter.email,
    role: invitation.role,
  })

  return invitation
}

/**
 * Get pending invitations for an organization
 */
export async function getPendingInvitations(organizationId: string) {
  return prisma.invitation.findMany({
    where: {
      organizationId,
      status: 'PENDING',
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      inviter: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

/**
 * Get all invitations for an organization
 */
export async function getAllInvitations(organizationId: string) {
  return prisma.invitation.findMany({
    where: {
      organizationId,
    },
    include: {
      inviter: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      invitee: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

/**
 * Cancel an invitation
 */
export async function cancelInvitation(invitationId: string) {
  return prisma.invitation.update({
    where: { id: invitationId },
    data: {
      status: 'CANCELLED',
    },
  })
}

/**
 * Clean up expired invitations (should be run periodically)
 */
export async function cleanupExpiredInvitations() {
  const result = await prisma.invitation.updateMany({
    where: {
      status: 'PENDING',
      expiresAt: {
        lt: new Date(),
      },
    },
    data: {
      status: 'EXPIRED',
    },
  })

  return result.count
}
