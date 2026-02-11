import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireRole } from '@/lib/auth'
import { createInvitation, getAllInvitations, getPendingInvitations } from '@/lib/invitations'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

const createInvitationSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
  role: z.nativeEnum(UserRole),
})

export async function GET(request: NextRequest) {
  try {
    const { user } = await requireRole(['ADMIN', 'MANAGER', 'COORDINATOR'])
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID required' },
        { status: 400 }
      )
    }

    // TODO: Verify user has access to this organization
    const pendingOnly = searchParams.get('pending') === 'true'
    const invitations = pendingOnly
      ? await getPendingInvitations(organizationId)
      : await getAllInvitations(organizationId)

    return NextResponse.json(invitations)
  } catch (error: any) {
    console.error('Error fetching invitations:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch invitations' },
      { status: error.message === 'Unauthorized' || error.message === 'Forbidden' ? 403 : 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireRole(['ADMIN', 'MANAGER', 'COORDINATOR'])
    const body = await request.json()
    const validated = createInvitationSchema.parse(body)

    // TODO: Verify user has access to this organization
    const invitation = await createInvitation({
      ...validated,
      invitedById: user.id,
    })

    return NextResponse.json(invitation, { status: 201 })
  } catch (error: any) {
    console.error('Error creating invitation:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create invitation' },
      { status: error.message === 'Unauthorized' || error.message === 'Forbidden' ? 403 : 500 }
    )
  }
}
