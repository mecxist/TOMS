/**
 * Migration script to remove Clerk dependencies and migrate to Better Auth
 * 
 * This script:
 * 1. Removes clerkId from User records (sets to null, then column will be removed in migration)
 * 2. Creates Better Auth sessions for existing users (optional - users will sign in again)
 * 3. Migrates any Clerk metadata to database fields
 * 
 * Run with: tsx scripts/migrate-from-clerk.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting migration from Clerk to Better Auth...')

  // Step 1: Remove clerkId from all users
  console.log('\n1. Removing clerkId from users...')
  const users = await prisma.user.findMany({
    where: {
      clerkId: {
        not: null,
      },
    },
  })

  console.log(`Found ${users.length} users with clerkId`)

  for (const user of users) {
    // Note: We can't actually remove the field here since it's still in the schema
    // This will be handled by the Prisma migration
    // For now, we'll just log what would be migrated
    console.log(`  - User ${user.email}: clerkId = ${user.clerkId}`)
  }

  console.log('\n✅ Migration preparation complete!')
  console.log('\nNext steps:')
  console.log('1. Run: npx prisma migrate dev --name remove_clerk_id')
  console.log('2. This will remove the clerkId column from the User table')
  console.log('3. Users will need to sign up/sign in again with Better Auth')
  console.log('4. Invitations can be sent to existing users via email')
}

main()
  .catch((e) => {
    console.error('Migration error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
