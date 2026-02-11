'use client'

import { TalentModel } from '@prisma/client'
import { useState } from 'react'

interface TalentModelSelectorProps {
  selected?: string
  onNext: (model: TalentModel) => void
  onBack: () => void
}

const TALENT_MODELS: Array<{
  value: TalentModel
  label: string
  description: string
  icon: string
}> = [
  {
    value: 'EMPLOYMENT',
    label: 'Employment',
    description: 'Traditional W2 employment with permanent positions, benefits, and ongoing relationships',
    icon: '💼',
  },
  {
    value: 'CONTINGENT_WORKFORCE',
    label: 'Contingent Workforce',
    description: 'Contractors, freelancers, gig workers, and project-based talent with flexible assignments',
    icon: '🔄',
  },
  {
    value: 'VOLUNTEER',
    label: 'Volunteer',
    description: 'Non-profit or volunteer-based model with minimal or no payment',
    icon: '🤝',
  },
  {
    value: 'HYBRID',
    label: 'Hybrid',
    description: 'Mix of both employment and contingent workforce (e.g., consulting firms)',
    icon: '⚡',
  },
]

export function TalentModelSelector({
  selected,
  onNext,
  onBack,
}: TalentModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState<TalentModel | null>(
    (selected as TalentModel) || null
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedModel) {
      onNext(selectedModel)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
          What type of talent model does your organization use?
        </h2>
        <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">
          This helps us customize terminology and features for your needs. You can change this later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TALENT_MODELS.map((model) => (
          <button
            key={model.value}
            type="button"
            onClick={() => setSelectedModel(model.value)}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              selectedModel === model.value
                ? 'border-[#6366f1] bg-[#eef2ff] dark:bg-[#312e81]'
                : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] hover:border-[#6366f1]/50'
            }`}
          >
            <div className="text-3xl mb-3">{model.icon}</div>
            <h3 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
              {model.label}
            </h3>
            <p className="text-sm text-[#666] dark:text-[#aaa]">
              {model.description}
            </p>
          </button>
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
          disabled={!selectedModel}
          className="px-6 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </form>
  )
}
