import { NextRequest, NextResponse } from 'next/server'
import { getFeatures, updateFeatures } from '@/lib/features'
import { requireAuth } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    await requireAuth()
    const features = await getFeatures(params.orgId)
    return NextResponse.json(features)
  } catch (error) {
    console.error('Error fetching features:', error)
    return NextResponse.json(
      { error: 'Failed to fetch features' },
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
    const features = await updateFeatures(params.orgId, body)
    return NextResponse.json(features)
  } catch (error) {
    console.error('Error updating features:', error)
    return NextResponse.json(
      { error: 'Failed to update features' },
      { status: 500 }
    )
  }
}
