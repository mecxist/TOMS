'use client'

import useSWR from 'swr'
import { TalentModel } from '@prisma/client'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export interface Organization {
  id: string
  name: string
  slug: string
  domain?: string
  talentModel: TalentModel
  quickstartCompleted: boolean
  quickstartStep: number
  features: Record<string, boolean>
  terminology: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export function useOrganization(organizationId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Organization>(
    organizationId ? `/api/organizations/${organizationId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    organization: data,
    isLoading,
    error,
    mutate,
  }
}
