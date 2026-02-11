import { PrismaClient, UserRole, ApplicationStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user (replace with actual Clerk user ID after signup)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@talentos.com' },
    update: {},
    create: {
      clerkId: 'user_admin_placeholder',
      email: 'admin@talentos.com',
      role: UserRole.ADMIN,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          timezone: 'America/New_York',
        },
      },
    },
  })

  // Create coordinator user
  const coordinatorUser = await prisma.user.upsert({
    where: { email: 'coordinator@talentos.com' },
    update: {},
    create: {
      clerkId: 'user_coordinator_placeholder',
      email: 'coordinator@talentos.com',
      role: UserRole.COORDINATOR,
      profile: {
        create: {
          firstName: 'Coordinator',
          lastName: 'User',
          timezone: 'America/New_York',
        },
      },
    },
  })

  // Create sample candidate
  const candidate = await prisma.candidate.create({
    data: {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      status: ApplicationStatus.APPLIED,
      applications: {
        create: {
          status: ApplicationStatus.APPLIED,
          source: 'linkedin',
        },
      },
    },
  })

  console.log('Seed data created:', {
    adminUser,
    coordinatorUser,
    candidate,
  })
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
