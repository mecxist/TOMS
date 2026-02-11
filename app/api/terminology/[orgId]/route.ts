import { NextRequest, NextResponse } from 'next/server'
import { getTerminology, updateTerminology } from '@/lib/terminology'
import { requireAuth } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    await requireAuth()
    const terminology = await getTerminology(params.orgId)
    return NextResponse.json(terminology)
  } catch (error) {
    console.error('Error fetching terminology:', error)
    return NextResponse.json(
      { error: 'Failed to fetch terminology' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    await requireAuth()
    const body = await request.json()
    const terminology = await updateTerminology(params.orgId, body)
    return NextResponse.json(terminology)
  } catch (error) {
    console.error('Error updating terminology:', error)
    return NextResponse.json(
      { error: 'Failed to update terminology' },
      { status: 500 }
    )
  }
}
