'use client'

interface IntegrationSetupProps {
  integrations?: Record<string, any>
  onNext: (integrations: Record<string, any>) => void
  onBack: () => void
}

export function IntegrationSetup({
  integrations,
  onNext,
  onBack,
}: IntegrationSetupProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(integrations || {})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
          Integration Setup (Optional)
        </h2>
        <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">
          Connect external tools to import projects and sync data. You can set this up later.
        </p>
      </div>

      <div className="p-6 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-[#f5f5f5] dark:bg-[#2a2a2a]">
        <p className="text-sm text-[#666] dark:text-[#aaa] text-center">
          Integration setup will be available after quickstart completion.
        </p>
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
          Skip & Continue
        </button>
      </div>
    </form>
  )
}
