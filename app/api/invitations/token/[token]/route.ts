import { NextRequest, NextResponse } from 'next/server'
import { getInvitationByToken } from '@/lib/invitations'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const invitation = await getInvitationByToken(params.token)

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found or expired' },
        { status: 404 }
      )
    }

    return NextResponse.json(invitation)
  } catch (error: any) {
    console.error('Error fetching invitation by token:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch invitation' },
      { status: 500 }
    )
  }
}
