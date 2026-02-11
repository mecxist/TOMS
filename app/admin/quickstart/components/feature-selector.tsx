'use client'

import { useState } from 'react'
import { getDefaultFeatures } from '@/lib/features'
import { TalentModel } from '@prisma/client'

interface FeatureSelectorProps {
  talentModel?: string
  features?: Record<string, boolean>
  onNext: (features: Record<string, boolean>) => void
  onBack: () => void
}

export function FeatureSelector({
  talentModel,
  features,
  onNext,
  onBack,
}: FeatureSelectorProps) {
  const defaults = talentModel
    ? getDefaultFeatures(talentModel as TalentModel)
    : {
        payroll: true,
        projectManagement: true,
        externalProjectIntegration: false,
        timeTracking: true,
        skillAssessments: true,
        availabilityManagement: true,
        aiMatching: true,
      }

  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>(
    features || defaults
  )

  const toggleFeature = (feature: string) => {
    setSelectedFeatures({
      ...selectedFeatures,
      [feature]: !selectedFeatures[feature],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(selectedFeatures)
  }

  const FEATURES = [
    {
      key: 'payroll',
      label: 'Payroll Management',
      description: 'Process payments and manage payroll runs',
      disabled: talentModel === 'VOLUNTEER',
    },
    {
      key: 'projectManagement',
      label: 'Project Management',
      description: 'Native project and assignment management',
    },
    {
      key: 'externalProjectIntegration',
      label: 'External Project Integration',
      description: 'Import and sync projects from external tools',
    },
    {
      key: 'timeTracking',
      label: 'Time Tracking',
      description: 'Track hours worked and manage timesheets',
    },
    {
      key: 'skillAssessments',
      label: 'Skill Assessments',
      description: 'Assess and track talent skills',
    },
    {
      key: 'availabilityManagement',
      label: 'Availability Management',
      description: 'Manage talent availability and scheduling',
    },
    {
      key: 'aiMatching',
      label: 'AI Matching',
      description: 'AI-powered talent matching and recommendations',
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
          Select Features
        </h2>
        <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">
          Choose which features you'd like to enable. You can change these later.
        </p>
      </div>

      <div className="space-y-3">
        {FEATURES.map((feature) => (
          <label
            key={feature.key}
            className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedFeatures[feature.key]
                ? 'border-[#6366f1] bg-[#eef2ff] dark:bg-[#312e81]'
                : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e]'
            } ${feature.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedFeatures[feature.key] || false}
              onChange={() => !feature.disabled && toggleFeature(feature.key)}
              disabled={feature.disabled}
              className="mt-1 mr-3 size-5 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1]"
            />
            <div className="flex-1">
              <div className="font-medium text-[#111] dark:text-[#e5e5e5]">
                {feature.label}
              </div>
              <div className="text-sm text-[#666] dark:text-[#aaa] mt-1">
                {feature.description}
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  )
}
