'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppLayout } from '@/components/shared/app-layout'
import { ArrowLeft, ExternalLink, Users, ChevronRight } from 'lucide-react'
import {
  CANDIDATES_BY_REQUISITION,
  REQUISITIONS,
  REQUISITION_CANDIDATES,
  type RequisitionMeta,
  type RequisitionCandidateRow,
} from '@/lib/mock-requisitions'

function getStatusBadge(status: string) {
  const base = 'inline-flex items-center px-2 py-1 rounded text-xs font-medium'
  switch (status) {
    case 'Reviewing':
      return <span className={`${base} bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`}>{status}</span>
    case 'Rejected':
      return <span className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400`}>{status}</span>
    case 'Offer Sent':
      return <span className={`${base} bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`}>{status}</span>
    case 'Shortlisted':
      return <span className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`}>{status}</span>
    default:
      return <span className={`${base} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400`}>{status}</span>
  }
}

export default function RequisitionCandidatesPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const requisition = REQUISITIONS[id]
  const applicationIds = CANDIDATES_BY_REQUISITION[id] ?? []
  const candidates = applicationIds
    .map((appId) => REQUISITION_CANDIDATES[appId])
    .filter(Boolean) as RequisitionCandidateRow[]

  if (!requisition) {
    return (
      <AppLayout>
        <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">Requisition not found</h2>
            <Link href="/requisitions" className="text-sm text-[#6366f1] hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="size-3.5" /> Back to Requisitions
            </Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <Link
          href="/requisitions"
          className="inline-flex items-center gap-1.5 text-sm text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to Requisitions
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Users className="size-5 text-[#6366f1]" />
            <h1 className="text-xl font-semibold text-[#111] dark:text-[#e5e5e5]">{requisition.title}</h1>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            {requisition.department} · {requisition.location} · {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} applied
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
          {candidates.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-[#666] dark:text-[#aaa]">No candidates have applied to this role yet.</p>
              <Link href="/" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#6366f1] hover:underline">
                View pipeline <ChevronRight className="size-3.5" />
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Applied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#666] dark:text-[#888]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr
                    key={c.applicationId}
                    className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-9 rounded-full flex items-center justify-center text-xs font-medium text-white"
                          style={{ backgroundColor: c.avatarColor }}
                        >
                          {c.initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{c.name}</div>
                          <div className="text-xs text-[#666] dark:text-[#aaa]">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#111] dark:text-[#e5e5e5]">
                      {c.appliedDate}, {c.appliedTime}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {c.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/applications/${c.applicationId}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#6366f1] hover:underline"
                        >
                          Application
                          <ExternalLink className="size-3" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => router.push('/')}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors"
                        >
                          Pipeline
                          <ChevronRight className="size-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
