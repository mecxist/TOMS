import { NextRequest, NextResponse } from 'next/server'
import { completeQuickstart } from '@/lib/organization'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { orgId } = body

    if (!orgId) {
      return NextResponse.json(
        { error: 'Organization ID required' },
        { status: 400 }
      )
    }

    await completeQuickstart(orgId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error completing quickstart:', error)
    return NextResponse.json(
      { error: 'Failed to complete quickstart' },
      { status: 500 }
    )
  }
}
