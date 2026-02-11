import { prisma as db } from './db'
import { TalentModel } from '@prisma/client'

export interface OrganizationConfig {
  name: string
  slug: string
  domain?: string
  talentModel: TalentModel
  features: Record<string, boolean>
  terminology: Record<string, string>
}

export interface QuickstartData {
  step: number
  data: Record<string, any>
}

/**
 * Get organization by ID
 */
export async function getOrganization(orgId: string) {
  return db.organization.findUnique({
    where: { id: orgId },
    include: {
      users: true,
      projects: true,
    },
  })
}

/**
 * Get organization by slug
 */
export async function getOrganizationBySlug(slug: string) {
  return db.organization.findUnique({
    where: { slug },
  })
}

/**
 * Get organization by domain
 */
export async function getOrganizationByDomain(domain: string) {
  return db.organization.findUnique({
    where: { domain },
  })
}

/**
 * Create a new organization
 */
export async function createOrganization(config: OrganizationConfig) {
  return db.organization.create({
    data: {
      name: config.name,
      slug: config.slug,
      domain: config.domain,
      talentModel: config.talentModel,
      features: config.features,
      terminology: config.terminology,
      quickstartCompleted: false,
      quickstartStep: 0,
      integrations: {},
    },
  })
}

/**
 * Update organization
 */
export async function updateOrganization(
  orgId: string,
  updates: Partial<OrganizationConfig>
) {
  return db.organization.update({
    where: { id: orgId },
    data: {
      ...(updates.name && { name: updates.name }),
      ...(updates.slug && { slug: updates.slug }),
      ...(updates.domain !== undefined && { domain: updates.domain }),
      ...(updates.talentModel && { talentModel: updates.talentModel }),
      ...(updates.features && { features: updates.features }),
      ...(updates.terminology && { terminology: updates.terminology }),
    },
  })
}

/**
 * Update quickstart progress
 */
export async function updateQuickstartProgress(
  orgId: string,
  step: number,
  data?: Record<string, any>
) {
  const org = await db.organization.findUnique({
    where: { id: orgId },
  })

  if (!org) {
    throw new Error('Organization not found')
  }

  const currentData = (org.integrations as Record<string, any>) || {}
  const updatedData = data ? { ...currentData, ...data } : currentData

  return db.organization.update({
    where: { id: orgId },
    data: {
      quickstartStep: step,
      integrations: updatedData,
    },
  })
}

/**
 * Complete quickstart
 */
export async function completeQuickstart(orgId: string) {
  return db.organization.update({
    where: { id: orgId },
    data: {
      quickstartCompleted: true,
    },
  })
}

/**
 * Get quickstart status
 */
export async function getQuickstartStatus(orgId: string) {
  const org = await db.organization.findUnique({
    where: { id: orgId },
    select: {
      quickstartCompleted: true,
      quickstartStep: true,
      integrations: true,
    },
  })

  if (!org) {
    return null
  }

  return {
    completed: org.quickstartCompleted,
    step: org.quickstartStep,
    data: (org.integrations as Record<string, any>) || {},
  }
}

/**
 * Generate a unique slug from organization name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
