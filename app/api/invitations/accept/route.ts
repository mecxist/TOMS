import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { acceptInvitation } from '@/lib/invitations'
import { z } from 'zod'

const acceptInvitationSchema = z.object({
  token: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    const validated = acceptInvitationSchema.parse(body)

    const invitation = await acceptInvitation(validated.token, user.id)

    return NextResponse.json({ success: true, invitation })
  } catch (error: any) {
    console.error('Error accepting invitation:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: error.message || 'Failed to accept invitation' },
      { status: 500 }
    )
  }
}
