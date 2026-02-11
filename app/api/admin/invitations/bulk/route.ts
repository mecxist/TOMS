import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'
import { createBulkInvitations } from '@/lib/invitations'
import { parseTalentCSV } from '@/lib/csv-import'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

const bulkInviteSchema = z.object({
  organizationId: z.string(),
  users: z.array(
    z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      role: z.nativeEnum(UserRole).default('TALENT'),
    })
  ),
})

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireRole(['ADMIN', 'MANAGER'])
    const formData = await request.formData()
    const csvFile = formData.get('file') as File | null

    if (csvFile) {
      // Handle CSV file upload
      const organizationId = formData.get('organizationId') as string
      if (!organizationId) {
        return NextResponse.json(
          { error: 'Organization ID required' },
          { status: 400 }
        )
      }

      const parseResult = await parseTalentCSV(csvFile)

      if (parseResult.errors.length > 0) {
        return NextResponse.json(
          {
            error: 'CSV validation errors',
            errors: parseResult.errors,
            valid: parseResult.valid,
          },
          { status: 400 }
        )
      }

      const invitations = parseResult.valid.map((userData) => ({
        email: userData.email,
        organizationId,
        role: userData.role as UserRole,
        invitedById: user.id,
      }))

      const result = await createBulkInvitations(invitations)

      return NextResponse.json(result)
    } else {
      // Handle JSON array
      const body = await request.json()
      const validated = bulkInviteSchema.parse(body)

      const invitations = validated.users.map((userData) => ({
        email: userData.email,
        organizationId: validated.organizationId,
        role: userData.role,
        invitedById: user.id,
      }))

      const result = await createBulkInvitations(invitations)

      return NextResponse.json(result)
    }
  } catch (error: any) {
    console.error('Error creating bulk invitations:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create bulk invitations' },
      { status: 500 }
    )
  }
}
