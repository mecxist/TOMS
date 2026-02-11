import { prisma as db } from './db'
import { TalentModel } from '@prisma/client'

/**
 * Default feature flags by talent model
 */
export const DEFAULT_FEATURES: Record<TalentModel, Record<string, boolean>> = {
  EMPLOYMENT: {
    payroll: true,
    projectManagement: true,
    externalProjectIntegration: false,
    timeTracking: true,
    skillAssessments: true,
    availabilityManagement: true,
    aiMatching: true,
  },
  CONTINGENT_WORKFORCE: {
    payroll: true,
    projectManagement: true,
    externalProjectIntegration: true,
    timeTracking: true,
    skillAssessments: true,
    availabilityManagement: true,
    aiMatching: true,
  },
  VOLUNTEER: {
    payroll: false,
    projectManagement: true,
    externalProjectIntegration: false,
    timeTracking: true,
    skillAssessments: false,
    availabilityManagement: true,
    aiMatching: false,
  },
  HYBRID: {
    payroll: true,
    projectManagement: true,
    externalProjectIntegration: true,
    timeTracking: true,
    skillAssessments: true,
    availabilityManagement: true,
    aiMatching: true,
  },
}

export interface FeatureFlags {
  payroll: boolean
  projectManagement: boolean
  externalProjectIntegration: boolean
  timeTracking: boolean
  skillAssessments: boolean
  availabilityManagement: boolean
  aiMatching: boolean
}

/**
 * Get feature flags for an organization
 */
export async function getFeatures(orgId: string): Promise<FeatureFlags> {
  const org = await db.organization.findUnique({
    where: { id: orgId },
    select: {
      talentModel: true,
      features: true,
    },
  })

  if (!org) {
    throw new Error('Organization not found')
  }

  const defaults = DEFAULT_FEATURES[org.talentModel]
  const custom = (org.features as Partial<FeatureFlags>) || {}

  // Merge defaults with custom features
  return { ...defaults, ...custom } as FeatureFlags
}

/**
 * Check if a feature is enabled
 */
export async function isFeatureEnabled(
  feature: keyof FeatureFlags,
  orgId: string
): Promise<boolean> {
  const features = await getFeatures(orgId)
  return features[feature] ?? false
}

/**
 * Update feature flags for an organization
 */
export async function updateFeatures(
  orgId: string,
  features: Partial<FeatureFlags>
) {
  const currentFeatures = await getFeatures(orgId)
  const updatedFeatures = { ...currentFeatures, ...features }

  return db.organization.update({
    where: { id: orgId },
    data: {
      features: updatedFeatures,
    },
  })
}

/**
 * Get default features for a talent model
 */
export function getDefaultFeatures(model: TalentModel): FeatureFlags {
  return DEFAULT_FEATURES[model] as FeatureFlags
}
