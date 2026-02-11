import { NextRequest, NextResponse } from 'next/server'
import { getQuickstartStatus } from '@/lib/organization'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const userId = await requireAuth()
    
    // TODO: Get organizationId from user
    // For now, we'll need to pass it as a query param or get from user
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get('orgId')

    if (!orgId) {
      return NextResponse.json(
        { error: 'Organization ID required' },
        { status: 400 }
      )
    }

    const status = await getQuickstartStatus(orgId)
    return NextResponse.json(status)
  } catch (error) {
    console.error('Error fetching quickstart status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quickstart status' },
      { status: 500 }
    )
  }
}
