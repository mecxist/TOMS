'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/shared/app-layout'
import { Users, FileText, MessageSquare, FileCheck, LayoutDashboard } from 'lucide-react'
import {
  CandidateDetailModal,
  MessageModal,
  ScheduleModal,
} from '@/components/shared/candidate-modals'

interface Candidate {
  id: string
  code: string
  name: string
  role: string
  initials: string
  avatarColor: string
  tags: string[]
  time?: string
  badge?: {
    text: string
    color: 'red' | 'green' | 'blue' | 'gray'
  }
}

interface Column {
  id: string
  title: string
  icon: React.ReactNode
  count: number
  candidates: Candidate[]
}

const columns: Column[] = [
  {
    id: 'applied',
    title: 'Applied',
    icon: <FileText className="size-4 text-[#999]" />,
    count: 8,
    candidates: [
      {
        id: '1',
        code: 'DEV-01',
        name: 'Alex Konstantopoulos',
        role: 'Senior Frontend Engineer',
        initials: 'AK',
        avatarColor: '#60a5fa',
        tags: ['React', 'Vue'],
        time: '2m ago',
      },
      {
        id: '2',
        code: 'DES-04',
        name: 'Sarah Miller',
        role: 'Product Designer',
        initials: 'SM',
        avatarColor: '#f472b6',
        tags: ['Figma'],
        time: '45m ago',
      },
      {
        id: '3',
        code: 'ENG-09',
        name: 'James Lee',
        role: 'Backend Developer',
        initials: 'JL',
        avatarColor: '#34d399',
        tags: ['Node', 'AWS'],
        time: '3h ago',
      },
    ],
  },
  {
    id: 'screening',
    title: 'Screening',
    icon: <FileCheck className="size-4 text-[#999]" />,
    count: 4,
    candidates: [
      {
        id: '4',
        code: 'OPS-02',
        name: 'Mike Ross',
        role: 'DevOps Engineer',
        initials: 'MR',
        avatarColor: '#9ca3af',
        tags: ['Docker'],
        badge: { text: 'Review', color: 'red' },
      },
      {
        id: '5',
        code: 'MKT-01',
        name: 'Elena Fisher',
        role: 'Growth Marketer',
        initials: 'EF',
        avatarColor: '#fbbf24',
        tags: ['SEO'],
        time: '1d ago',
      },
    ],
  },
  {
    id: 'interview',
    title: 'Interview',
    icon: <MessageSquare className="size-4 text-[#999]" />,
    count: 2,
    candidates: [
      {
        id: '6',
        code: 'PM-05',
        name: 'Emily Wong',
        role: 'Product Manager',
        initials: 'EW',
        avatarColor: '#a78bfa',
        tags: ['SaaS', 'Agile'],
        badge: { text: 'Tomorrow', color: 'green' },
      },
      {
        id: '7',
        code: 'ENG-12',
        name: 'Tom Chen',
        role: 'Full Stack Engineer',
        initials: 'TC',
        avatarColor: '#34d399',
        tags: ['Python'],
        time: '2d ago',
      },
    ],
  },
  {
    id: 'offer',
    title: 'Offer',
    icon: <Users className="size-4 text-[#999]" />,
    count: 1,
    candidates: [
      {
        id: '8',
        code: 'DEV-05',
        name: 'David Cole',
        role: 'Senior Backend Engineer',
        initials: 'DC',
        avatarColor: '#60a5fa',
        tags: ['Go', 'K8s'],
      },
    ],
  },
]

export default function PipelinePage() {
  const router = useRouter()
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [messagingCandidate, setMessagingCandidate] = useState<Candidate | null>(null)
  const [schedulingCandidate, setSchedulingCandidate] = useState<Candidate | null>(null)

  const openCandidate = (candidate: Candidate, stageName: string) => {
    setSelectedCandidate(candidate)
    setSelectedStage(stageName)
  }

  const closeCandidate = () => {
    setSelectedCandidate(null)
    setSelectedStage(null)
  }

  const handleMessage = (candidate: Candidate) => {
    closeCandidate()
    setMessagingCandidate(candidate)
  }

  const handleSchedule = (candidate: Candidate) => {
    closeCandidate()
    setSchedulingCandidate(candidate)
  }

  const handleViewApplication = (candidate: Candidate) => {
    closeCandidate()
    router.push(`/applications/${candidate.id}`)
  }

  return (
    <AppLayout>
      <div className="flex-1 overflow-x-auto p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a]">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Pipeline</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Track candidates through hiring stages</p>
        </div>
        <div className="flex gap-6 min-w-max h-full">
          {columns.map((column) => (
            <div key={column.id} className="w-[300px] flex flex-col">
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4 px-1">
                {column.icon}
                <span className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">
                  {column.title}
                </span>
                <span className="ml-auto text-xs text-[#666] dark:text-[#888] bg-[#ececf0] dark:bg-[#27272a] px-2 py-0.5 rounded-full">
                  {column.count}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-3">
                {column.candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => openCandidate(candidate, column.title)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CandidateDetailModal
        candidate={selectedCandidate}
        stageName={selectedStage}
        onClose={closeCandidate}
        onMessage={handleMessage}
        onSchedule={handleSchedule}
        onViewApplication={(c) => {
          closeCandidate()
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

// ─── Candidate Card ──────────────────────────────────────────────────────────

function CandidateCard({
  candidate,
  onClick,
}: {
  candidate: Candidate
  onClick: () => void
}) {
  const getBadgeStyles = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-[#ef4444] bg-transparent'
      case 'green':
        return 'text-[#10b981] bg-[#d1fae5] dark:bg-green-900/30'
      case 'blue':
        return 'text-[#3b82f6] bg-[#dbeafe] dark:bg-blue-900/30'
      default:
        return 'text-[#666] bg-[#ececf0] dark:bg-[#27272a]'
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4 hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb3a14] focus-visible:ring-offset-2"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase">
          {candidate.code}
        </span>
        <div className="flex items-center gap-2">
          {candidate.badge && (
            <span className={`text-[10px] font-medium flex items-center gap-1 px-1.5 py-0.5 rounded ${getBadgeStyles(candidate.badge.color)}`}>
              {candidate.badge.color === 'red' && <span className="text-[#ef4444]">★</span>}
              {candidate.badge.color === 'green' && <span>📅</span>}
              {candidate.badge.text}
            </span>
          )}
          {candidate.time && (
            <span className="text-[10px] text-[#666] dark:text-[#888]">
              {candidate.time}
            </span>
          )}
        </div>
      </div>

      {/* Name and Role */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-0.5">
            {candidate.name}
          </h4>
          <p className="text-xs text-[#666] dark:text-[#aaa]">
            {candidate.role}
          </p>
        </div>
      </div>

      {/* Tags and Avatar */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1.5">
          {candidate.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] font-medium px-2 py-1 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="size-7 rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
      </div>
    </button>
  )
}
