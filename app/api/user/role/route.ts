import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { user } = await requireAuth()
    
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ role: dbUser.role })
  } catch (error: any) {
    console.error('Error fetching user role:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch user role' },
      { status: 500 }
    )
  }
}
