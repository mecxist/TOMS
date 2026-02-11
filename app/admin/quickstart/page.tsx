'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import { StepIndicator } from './components/step-indicator'
import { OrganizationSetup } from './components/organization-setup'
import { TalentModelSelector } from './components/talent-model-selector'
import { TerminologyCustomizer } from './components/terminology-customizer'
import { FeatureSelector } from './components/feature-selector'
import { IntegrationSetup } from './components/integration-setup'
import { TalentOnboarding } from './components/talent-onboarding'
import { ReviewSummary } from './components/review-summary'

interface QuickstartData {
  organization?: {
    name: string
    slug: string
    domain?: string
  }
  talentModel?: string
  terminology?: Record<string, string>
  features?: Record<string, boolean>
  integrations?: Record<string, any>
}

const TOTAL_STEPS = 7

export default function QuickstartPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<QuickstartData>({})
  const [orgId, setOrgId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Get organizationId from user context
    // For now, we'll need to handle this differently
    loadQuickstartStatus()
  }, [])

  const loadQuickstartStatus = async () => {
    try {
      // TODO: Get orgId from user context
      const response = await fetch('/api/admin/quickstart/current?orgId=temp')
      if (response.ok) {
        const status = await response.json()
        if (status) {
          setCurrentStep(status.step || 1)
          setData(status.data || {})
        }
      }
    } catch (error) {
      console.error('Error loading quickstart status:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveStep = async (step: number, stepData: any) => {
    try {
      const updatedData = { ...data, ...stepData }
      setData(updatedData)

      // TODO: Get orgId from user context
      await fetch(`/api/admin/quickstart/step/${step}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgId: orgId || 'temp',
          data: updatedData,
        }),
      })
    } catch (error) {
      console.error('Error saving step:', error)
    }
  }

  const handleNext = async (stepData: any) => {
    await saveStep(currentStep, stepData)
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async (finalData: any) => {
    await saveStep(TOTAL_STEPS, finalData)
    try {
      // TODO: Get orgId from user context
      await fetch('/api/admin/quickstart/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgId: orgId || 'temp' }),
      })
      // Redirect to dashboard
      window.location.href = '/'
    } catch (error) {
      console.error('Error completing quickstart:', error)
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6366f1] mx-auto mb-4"></div>
            <p className="text-[#666] dark:text-[#aaa]">Loading...</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
            Welcome! Let's set up your organization
          </h1>
          <p className="text-[#666] dark:text-[#aaa]">
            This will only take a few minutes. You can always change these settings later.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="mt-8">
          {currentStep === 1 && (
            <OrganizationSetup
              data={data.organization}
              onNext={(orgData) => handleNext({ organization: orgData })}
            />
          )}
          {currentStep === 2 && (
            <TalentModelSelector
              selected={data.talentModel}
              onNext={(model) => handleNext({ talentModel: model })}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <TerminologyCustomizer
              talentModel={data.talentModel}
              terminology={data.terminology}
              onNext={(terms) => handleNext({ terminology: terms })}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <FeatureSelector
              talentModel={data.talentModel}
              features={data.features}
              onNext={(features) => handleNext({ features })}
              onBack={handleBack}
            />
          )}
          {currentStep === 5 && (
            <IntegrationSetup
              integrations={data.integrations}
              onNext={(integrations) => handleNext({ integrations })}
              onBack={handleBack}
            />
          )}
          {currentStep === 6 && (
            <TalentOnboarding
              organizationId={orgId || undefined}
              onNext={(talentData) => handleNext({ talentInvitations: talentData.invitations })}
              onBack={handleBack}
            />
          )}
          {currentStep === 7 && (
            <ReviewSummary
              data={data}
              onComplete={handleComplete}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </AppLayout>
  )
}
