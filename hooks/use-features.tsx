'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export interface FeatureFlags {
  payroll: boolean
  projectManagement: boolean
  externalProjectIntegration: boolean
  timeTracking: boolean
  skillAssessments: boolean
  availabilityManagement: boolean
  aiMatching: boolean
}

const DEFAULT_FEATURES: FeatureFlags = {
  payroll: true,
  projectManagement: true,
  externalProjectIntegration: false,
  timeTracking: true,
  skillAssessments: true,
  availabilityManagement: true,
  aiMatching: true,
}

export function useFeatures(organizationId?: string) {
  const { data, error, isLoading, mutate } = useSWR<FeatureFlags>(
    organizationId ? `/api/features/${organizationId}` : null,
    fetcher,
    {
      fallbackData: DEFAULT_FEATURES,
      revalidateOnFocus: false,
    }
  )

  const isEnabled = (feature: keyof FeatureFlags): boolean => {
    if (!data) return DEFAULT_FEATURES[feature] ?? false
    return data[feature] ?? false
  }

  return {
    isEnabled,
    features: data || DEFAULT_FEATURES,
    isLoading,
    error,
    mutate,
  }
}
