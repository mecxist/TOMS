import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'
import { resendInvitation } from '@/lib/invitations'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(['ADMIN', 'MANAGER', 'COORDINATOR'])
    const { id } = await params

    const invitation = await resendInvitation(id)

    return NextResponse.json(invitation)
  } catch (error: any) {
    console.error('Error resending invitation:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to resend invitation' },
      { status: 500 }
    )
  }
}
