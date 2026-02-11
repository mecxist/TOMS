'use client'

import { useState } from 'react'
import { TalentModel } from '@prisma/client'
import { getDefaultTerminology } from '@/lib/terminology'

interface TerminologyCustomizerProps {
  talentModel?: string
  terminology?: Record<string, string>
  onNext: (terminology: Record<string, string>) => void
  onBack: () => void
}

export function TerminologyCustomizer({
  talentModel,
  terminology,
  onNext,
  onBack,
}: TerminologyCustomizerProps) {
  const defaults = talentModel
    ? getDefaultTerminology(talentModel as TalentModel)
    : {}
  const [terms, setTerms] = useState<Record<string, string>>(
    terminology || defaults
  )

  const handleTermChange = (key: string, value: string) => {
    setTerms({ ...terms, [key]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(terms)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
          Customize Terminology
        </h2>
        <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">
          Customize terms to match your organization's language. You can change these later in settings.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
            Offer
          </label>
          <input
            type="text"
            value={terms.offer || defaults.offer || ''}
            onChange={(e) => handleTermChange('offer', e.target.value)}
            className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5]"
            placeholder={defaults.offer || 'Offer'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
            Hired
          </label>
          <input
            type="text"
            value={terms.hired || defaults.hired || ''}
            onChange={(e) => handleTermChange('hired', e.target.value)}
            className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5]"
            placeholder={defaults.hired || 'Hired'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
            Employee
          </label>
          <input
            type="text"
            value={terms.employee || defaults.employee || ''}
            onChange={(e) => handleTermChange('employee', e.target.value)}
            className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5]"
            placeholder={defaults.employee || 'Employee'}
          />
        </div>
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
