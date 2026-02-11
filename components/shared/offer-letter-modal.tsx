'use client'

import { Modal } from '@/components/shared/modal'
import { Button } from '@/components/ui/button'

export interface OfferLetterData {
  candidateName: string
  role: string
  salary: string
  startDate: string
  sentDate: string
  expiryDate?: string
  companyName?: string
}

const DEFAULT_COMPANY = 'TOMS'

export function OfferLetterModal({
  isOpen,
  onClose,
  offer,
}: {
  isOpen: boolean
  onClose: () => void
  offer: OfferLetterData | null
}) {
  if (!offer) return null

  const companyName = offer.companyName || DEFAULT_COMPANY

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Offer letter"
      size="lg"
      footer={
        <div className="flex justify-end w-full">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="max-h-[70vh] overflow-y-auto">
        <article className="bg-white dark:bg-[#0f0f0f] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] p-8 text-[#111] dark:text-[#e5e5e5]">
          <header className="mb-8">
            <p className="text-sm font-semibold text-[#6366f1] mb-1">{companyName}</p>
            <p className="text-xs text-[#666] dark:text-[#888]">Employment Offer Letter</p>
          </header>

          <p className="text-xs text-[#666] dark:text-[#888] mb-6">{offer.sentDate}</p>

          <p className="text-sm font-medium mb-2">{offer.candidateName}</p>

          <p className="text-sm font-semibold mb-6">Offer of Employment – {offer.role}</p>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
            <p>
              We are pleased to extend an offer of employment at {companyName} for the position of <strong>{offer.role}</strong>.
            </p>

            <p>
              <strong>Compensation:</strong> Your starting salary will be <strong>{offer.salary}</strong> per year, paid in accordance with our standard payroll schedule.
            </p>

            <p>
              <strong>Start date:</strong> Your anticipated start date will be <strong>{offer.startDate}</strong>. You will receive onboarding details and schedule prior to that date.
            </p>

            <p>
              This offer is contingent upon the completion of any required background checks and verification of your right to work. Benefits eligibility and other terms are as described in our employee handbook and will be shared during onboarding.
            </p>

            {offer.expiryDate && (
              <p className="text-xs text-[#666] dark:text-[#888] mt-6">
                This offer expires on {offer.expiryDate}. Please sign and return by that date to accept.
              </p>
            )}

            <p className="mt-8">
              We look forward to welcoming you to the team.
            </p>
            <p className="font-medium">{companyName} Hiring Team</p>
          </div>
        </article>
      </div>
    </Modal>
  )
}
