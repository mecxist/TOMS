'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState } from 'react'
import { MapPin, CheckCircle2, Eye, Circle, Users } from 'lucide-react'

interface Role {
  id: string
  title: string
  type: string
  matches: number
}

interface Candidate {
  id: string
  name: string
  initials: string
  location: string
  matchPercentage: number
  matchColor: string
  availability: {
    status: 'verified' | 'partial'
    description: string
    color: string
  }
  assessment?: {
    description: string
  }
  skillMatch?: {
    description: string
  }
  tags: string[]
}

export default function AIMatchingPage() {
  const [selectedRole, setSelectedRole] = useState<string>('1')
  const [confidenceThreshold, setConfidenceThreshold] = useState(95)

  const openRoles: Role[] = [
    {
      id: '1',
      title: 'Senior Frontend Engineer',
      type: 'HYBRID',
      matches: 3,
    },
    {
      id: '2',
      title: 'Product Designer',
      type: 'HYBRID',
      matches: 1,
    },
  ]

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Jordan P.',
      initials: 'JP',
      location: 'London, UK',
      matchPercentage: 94,
      matchColor: '#8b5cf6',
      availability: {
        status: 'verified',
        description: 'Talent confirmed availability for full-time work from Nov 25',
        color: '#8b5cf6',
      },
      assessment: {
        description: 'Scored 8.5/10 in React Technical Interview',
      },
      tags: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      name: 'Elena S.',
      initials: 'ES',
      location: 'Berlin, DE',
      matchPercentage: 88,
      matchColor: '#10b981',
      availability: {
        status: 'partial',
        description: 'Available 25hrs/week immediately. Full-time from Dec.',
        color: '#10b981',
      },
      skillMatch: {
        description: 'Strong expertise in UX/UI, but lacks proven Node.js experience.',
      },
      tags: ['Vue.js', 'JavaScript'],
    },
  ]

  return (
    <AppLayout>
      <div className="p-8 flex flex-col gap-6 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">AI Matching</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Match talent to open roles by skills and availability</p>
        </div>
        <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Panel - Open Roles */}
        <div className="w-[240px] flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">Open Roles</h3>
            <button className="text-[#666] dark:text-[#888] hover:text-[#666] dark:hover:text-[#aaa] transition-colors">
              <Circle className="size-4" />
            </button>
          </div>

          <div className="space-y-2">
            {openRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  selectedRole === role.id
                    ? 'bg-white dark:bg-[#1e1e1e] border-[#eb3a14] shadow-sm'
                    : 'bg-white dark:bg-[#1e1e1e] border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,0,0,0.15)] dark:hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-1">{role.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#666] dark:text-[#888] uppercase tracking-wide">{role.type}</span>
                  <span className="bg-[#fef2f2] dark:bg-red-900/30 text-[#ef4444] dark:text-red-400 text-[9px] font-medium px-1.5 py-0.5 rounded">
                    {role.matches} Match{role.matches > 1 ? 'es' : ''}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - AI Suggestions */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">AI Suggestions</h2>
              <p className="text-xs text-[#666] dark:text-[#aaa]">
                Based on skills, assessment scores, and verified availability.
              </p>
            </div>

            {/* Confidence Threshold */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-[#666] dark:text-[#888] uppercase tracking-wide mb-1">
                  Confidence Threshold
                </div>
                <div className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">{confidenceThreshold}%</div>
              </div>
              <div className="w-32">
                <div className="h-2 bg-[#e5e5e5] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${confidenceThreshold}%`,
                      background: 'linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Candidate Cards */}
          <div className="grid grid-cols-2 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="p-6 pb-5 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#ececf0] dark:bg-[#27272a] flex items-center justify-center text-sm font-medium text-[#666] dark:text-[#aaa]">
                        {candidate.initials}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">{candidate.name}</h3>
                        <div className="flex items-center gap-1 text-[11px] text-[#666] dark:text-[#888] mt-0.5">
                          <MapPin className="size-3" />
                          {candidate.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div
                        className="text-2xl font-bold leading-none mb-1"
                        style={{ color: candidate.matchColor }}
                      >
                        {candidate.matchPercentage}%
                      </div>
                      <div className="text-[9px] text-[#666] dark:text-[#888] uppercase tracking-wider">Match</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${candidate.matchPercentage}%`,
                        background:
                          candidate.id === '1'
                            ? 'linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #8b5cf6 100%)'
                            : 'linear-gradient(90deg, #6ee7b7 0%, #34d399 50%, #10b981 100%)',
                      }}
                    />
                  </div>

                  {/* Availability */}
                  <div className="flex items-start gap-2 mb-4">
                    <div
                      className="px-2 py-0.5 rounded text-[9px] font-medium uppercase tracking-wide"
                      style={{
                        backgroundColor: `${candidate.availability.color}15`,
                        color: candidate.availability.color,
                      }}
                    >
                      {candidate.availability.status === 'verified'
                        ? 'Verified Availability'
                        : 'Partial Availability'}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#666] dark:text-[#aaa] leading-relaxed mb-4">
                    {candidate.availability.description}
                  </p>

                  {/* Assessment or Skill Match */}
                  {candidate.assessment && (
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className="px-2 py-0.5 rounded text-[9px] font-medium uppercase tracking-wide"
                          style={{
                            backgroundColor: '#8b5cf615',
                            color: '#8b5cf6',
                          }}
                        >
                          Assessment Score
                        </div>
                      </div>
                      <p className="text-[11px] text-[#666] dark:text-[#aaa] leading-relaxed">
                        {candidate.assessment.description}
                      </p>
                    </div>
                  )}

                  {candidate.skillMatch && (
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <div className="px-2 py-0.5 rounded text-[9px] font-medium uppercase tracking-wide bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa]">
                          Skill Match
                        </div>
                      </div>
                      <p className="text-[11px] text-[#666] dark:text-[#aaa] leading-relaxed">
                        {candidate.skillMatch.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#fafafa] dark:bg-[#2a2a2a]">
                  <div className="flex items-center gap-2 mb-4">
                    {candidate.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] text-[#666] dark:text-[#aaa] text-[10px] font-medium rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
                      candidate.id === '1'
                        ? 'bg-[#111] dark:bg-white text-white dark:text-[#111] hover:bg-[#222] dark:hover:bg-[#e5e5e5]'
                        : 'bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.15)] dark:border-[rgba(255,255,255,0.2)] text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    Approve Match
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </AppLayout>
  )
}
