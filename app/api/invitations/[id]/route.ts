import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { cancelInvitation } from '@/lib/invitations'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireRole(['ADMIN', 'MANAGER', 'COORDINATOR'])
    
    const invitation = await prisma.invitation.findUnique({
      where: { id: params.id },
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
        invitee: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    return NextResponse.json(invitation)
  } catch (error: any) {
    console.error('Error fetching invitation:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch invitation' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireRole(['ADMIN', 'MANAGER', 'COORDINATOR'])
    
    await cancelInvitation(params.id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error cancelling invitation:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to cancel invitation' },
      { status: 500 }
    )
  }
}
