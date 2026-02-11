'use client'

interface ReviewSummaryProps {
  data: {
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
  onComplete: (data: any) => void
  onBack: () => void
}

export function ReviewSummary({
  data,
  onComplete,
  onBack,
}: ReviewSummaryProps) {
  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(data)
  }

  const getTalentModelLabel = (model?: string) => {
    const labels: Record<string, string> = {
      EMPLOYMENT: 'Employment',
      CONTINGENT_WORKFORCE: 'Contingent Workforce',
      VOLUNTEER: 'Volunteer',
      HYBRID: 'Hybrid',
    }
    return labels[model || ''] || model || 'Not selected'
  }

  return (
    <form onSubmit={handleComplete} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
          Review Your Settings
        </h2>
        <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">
          Review your configuration before completing setup.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-white dark:bg-[#1e1e1e]">
          <h3 className="font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
            Organization
          </h3>
          <div className="text-sm text-[#666] dark:text-[#aaa] space-y-1">
            <p>Name: {data.organization?.name || 'Not set'}</p>
            <p>Slug: {data.organization?.slug || 'Not set'}</p>
            {data.organization?.domain && (
              <p>Domain: {data.organization.domain}</p>
            )}
          </div>
        </div>

        <div className="p-4 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-white dark:bg-[#1e1e1e]">
          <h3 className="font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
            Talent Model
          </h3>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            {getTalentModelLabel(data.talentModel)}
          </p>
        </div>

        <div className="p-4 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-white dark:bg-[#1e1e1e]">
          <h3 className="font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
            Key Terminology
          </h3>
          <div className="text-sm text-[#666] dark:text-[#aaa] space-y-1">
            <p>Offer: {data.terminology?.offer || 'Default'}</p>
            <p>Hired: {data.terminology?.hired || 'Default'}</p>
            <p>Employee: {data.terminology?.employee || 'Default'}</p>
          </div>
        </div>

        <div className="p-4 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-white dark:bg-[#1e1e1e]">
          <h3 className="font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
            Enabled Features
          </h3>
          <div className="text-sm text-[#666] dark:text-[#aaa]">
            {data.features
              ? Object.entries(data.features)
                  .filter(([, enabled]) => enabled)
                  .map(([key]) => key)
                  .join(', ') || 'None'
              : 'Not configured'}
          </div>
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
          className="px-6 py-2 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors"
        >
          Complete Setup
        </button>
      </div>
    </form>
  )
}
