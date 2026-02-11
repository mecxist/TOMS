'use client'

import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/shared/app-layout'
import { useState } from 'react'
import { Filter, Handshake, CheckCircle2, XCircle, Clock } from 'lucide-react'
import {
  CandidateDetailModal,
  MessageModal,
  ScheduleModal,
  type PipelineCandidate,
} from '@/components/shared/candidate-modals'

interface Offer {
  id: string
  /** Application id – used for "View application" and pipeline modal */
  applicationId: string
  candidate: {
    name: string
    email: string
    avatar: string
    avatarColor: string
  }
  role: string
  salary: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  sentDate: string
  expiryDate: string
}

function offerToPipelineCandidate(offer: Offer): PipelineCandidate {
  return {
    id: offer.applicationId,
    code: `OFFER-${offer.id}`,
    name: offer.candidate.name,
    role: offer.role,
    initials: offer.candidate.avatar,
    avatarColor: offer.candidate.avatarColor,
    tags: [],
  }
}

export default function OffersPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')
  const [selectedOffers, setSelectedOffers] = useState<Set<string>>(new Set())
  const [detailCandidate, setDetailCandidate] = useState<PipelineCandidate | null>(null)
  const [detailOfferStatus, setDetailOfferStatus] = useState<Offer['status'] | null>(null)
  const [messagingCandidate, setMessagingCandidate] = useState<PipelineCandidate | null>(null)
  const [schedulingCandidate, setSchedulingCandidate] = useState<PipelineCandidate | null>(null)

  const offers: Offer[] = [
    {
      id: '1',
      applicationId: '21',
      candidate: {
        name: 'John L.',
        email: 'john.l@acme.co',
        avatar: 'JL',
        avatarColor: '#34d399',
      },
      role: 'Backend Engineer',
      salary: '$120,000',
      status: 'pending',
      sentDate: 'Oct 25',
      expiryDate: 'Nov 1',
    },
    {
      id: '2',
      applicationId: '14',
      candidate: {
        name: 'Sarah M.',
        email: 'sarah.m@email.com',
        avatar: 'SM',
        avatarColor: '#a78bfa',
      },
      role: 'Product Designer',
      salary: '$95,000',
      status: 'accepted',
      sentDate: 'Oct 20',
      expiryDate: 'Oct 27',
    },
    {
      id: '3',
      applicationId: '9',
      candidate: {
        name: 'Michael T.',
        email: 'michael@tech.io',
        avatar: 'MT',
        avatarColor: '#f59e0b',
      },
      role: 'Frontend Engineer',
      salary: '$110,000',
      status: 'rejected',
      sentDate: 'Oct 18',
      expiryDate: 'Oct 25',
    },
    {
      id: '4',
      applicationId: '26',
      candidate: {
        name: 'Emily R.',
        email: 'emily.r@design.co',
        avatar: 'ER',
        avatarColor: '#ec4899',
      },
      role: 'UX Designer',
      salary: '$100,000',
      status: 'pending',
      sentDate: 'Oct 26',
      expiryDate: 'Nov 2',
    },
  ]

  const filteredOffers = offers.filter((offer) => {
    if (selectedTab === 'all') return true
    return offer.status === selectedTab
  })

  const toggleOffer = (id: string) => {
    const newSelected = new Set(selectedOffers)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedOffers(newSelected)
  }

  const toggleAll = () => {
    if (selectedOffers.size === filteredOffers.length) {
      setSelectedOffers(new Set())
    } else {
      setSelectedOffers(new Set(filteredOffers.map(offer => offer.id)))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#d1fae5] dark:bg-green-900/30 text-[#059669] dark:text-green-400 rounded text-xs font-medium">
            <CheckCircle2 className="size-3" />
            Accepted
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#fee2e2] dark:bg-red-900/30 text-[#dc2626] dark:text-red-400 rounded text-xs font-medium">
            <XCircle className="size-3" />
            Rejected
          </span>
        )
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded text-xs font-medium">
            <Clock className="size-3" />
            Expired
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#fef3c7] dark:bg-yellow-900/30 text-[#d97706] dark:text-yellow-400 rounded text-xs font-medium">
            <Clock className="size-3" />
            Pending
          </span>
        )
    }
  }

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Handshake className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Job Offers</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Manage and track job offers sent to candidates</p>
        </div>
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <button className="px-3 py-1.5 bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] rounded-md flex items-center gap-2 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              <Filter className="size-3.5 text-[#666] dark:text-[#aaa]" />
              <span className="text-xs text-[#666] dark:text-[#aaa]">Filter</span>
            </button>

            {/* Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'all'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                All ({offers.length})
              </button>
              <button
                onClick={() => setSelectedTab('pending')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'pending'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Pending ({offers.filter(o => o.status === 'pending').length})
              </button>
              <button
                onClick={() => setSelectedTab('accepted')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'accepted'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Accepted ({offers.filter(o => o.status === 'accepted').length})
              </button>
              <button
                onClick={() => setSelectedTab('rejected')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'rejected'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Rejected ({offers.filter(o => o.status === 'rejected').length})
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-md text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors">
              Send New Offer
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOffers.size === filteredOffers.length && filteredOffers.length > 0}
                    onChange={toggleAll}
                    className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Expires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr
                  key={offer.id}
                  className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOffers.has(offer.id)}
                      onChange={() => toggleOffer(offer.id)}
                      className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setDetailCandidate(offerToPipelineCandidate(offer))
                        setDetailOfferStatus(offer.status)
                      }}
                      className="w-full text-left flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer rounded-md -m-2 p-2"
                    >
                      <div
                        className="size-8 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                        style={{ backgroundColor: offer.candidate.avatarColor }}
                      >
                        {offer.candidate.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-[#111] dark:text-[#e5e5e5] font-medium truncate">
                          {offer.candidate.name}
                        </div>
                        <div className="text-xs text-[#666] dark:text-[#aaa] truncate">
                          {offer.candidate.email}
                        </div>
                      </div>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{offer.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{offer.salary}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-[#666] dark:text-[#aaa]">{offer.sentDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-[#666] dark:text-[#aaa]">{offer.expiryDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(offer.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CandidateDetailModal
        candidate={detailCandidate}
        stageName="Offer"
        offerStatus={detailCandidate ? detailOfferStatus : null}
        onClose={() => {
          setDetailCandidate(null)
          setDetailOfferStatus(null)
        }}
        onMessage={(c) => {
          setDetailCandidate(null)
          setMessagingCandidate(c)
        }}
        onSchedule={(c) => {
          setDetailCandidate(null)
          setSchedulingCandidate(c)
        }}
        onViewApplication={(c) => {
          setDetailCandidate(null)
          router.push(`/applications/${c.id}`)
        }}
      />

      <MessageModal
        candidate={messagingCandidate}
        onClose={() => setMessagingCandidate(null)}
      />

      <ScheduleModal
        candidate={schedulingCandidate}
        onClose={() => setSchedulingCandidate(null)}
        onViewInterviews={() => {
          setSchedulingCandidate(null)
          router.push('/interviews')
        }}
      />
    </AppLayout>
  )
}
