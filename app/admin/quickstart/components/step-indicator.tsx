'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                step < currentStep
                  ? 'bg-[#10b981] text-white'
                  : step === currentStep
                  ? 'bg-[#6366f1] text-white'
                  : 'bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa]'
              }`}
            >
              {step < currentStep ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            <span
              className={`mt-2 text-xs text-center ${
                step === currentStep
                  ? 'text-[#6366f1] font-medium'
                  : 'text-[#666] dark:text-[#aaa]'
              }`}
            >
              {getStepLabel(step)}
            </span>
          </div>
          {step < totalSteps && (
            <div
              className={`h-0.5 flex-1 mx-2 ${
                step < currentStep
                  ? 'bg-[#10b981]'
                  : 'bg-[#ececf0] dark:bg-[#27272a]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function getStepLabel(step: number): string {
  const labels: Record<number, string> = {
    1: 'Organization',
    2: 'Talent Model',
    3: 'Terminology',
    4: 'Features',
    5: 'Integrations',
    6: 'Talent',
    7: 'Review',
  }
  return labels[step] || `Step ${step}`
}
