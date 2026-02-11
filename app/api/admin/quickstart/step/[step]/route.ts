import { NextRequest, NextResponse } from 'next/server'
import { updateQuickstartProgress } from '@/lib/organization'
import { requireAuth } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ step: string }> }
) {
  try {
    await requireAuth()
    const { step: stepParam } = await params
    const body = await request.json()
    const { orgId, data } = body

    if (!orgId) {
      return NextResponse.json(
        { error: 'Organization ID required' },
        { status: 400 }
      )
    }

    const step = parseInt(stepParam)
    if (isNaN(step) || step < 0 || step > 6) {
      return NextResponse.json(
        { error: 'Invalid step number' },
        { status: 400 }
      )
    }

    await updateQuickstartProgress(orgId, step, data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating quickstart progress:', error)
    return NextResponse.json(
      { error: 'Failed to update quickstart progress' },
      { status: 500 }
    )
  }
}
