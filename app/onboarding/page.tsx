'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import { Filter, FileText, Upload, ClipboardCheck, PenLine, CheckCircle2, Clock, AlertCircle, ChevronRight, ClipboardList } from 'lucide-react'

// --- Admin View Types & Data ---

interface OnboardingCandidate {
  id: string
  name: string
  initials: string
  role: string
  day: string
  dayColor: string
  progress: number
  color: string
  completedTasks: string[]
  pendingTasks: string[]
}

const candidates: OnboardingCandidate[] = [
  {
    id: '1',
    name: 'Sarah K.',
    initials: 'SK',
    role: 'Product Designer',
    day: 'Day 3',
    dayColor: 'green',
    progress: 65,
    color: 'purple',
    completedTasks: ['Contract Signed', 'Employment Setup'],
    pendingTasks: ['Team Introduction'],
  },
  {
    id: '2',
    name: 'Michael J.',
    initials: 'MJ',
    role: 'Backend Lead',
    day: 'Day 1',
    dayColor: 'orange',
    progress: 95,
    color: 'blue',
    completedTasks: ['Contract Signed'],
    pendingTasks: ['Equipment Setup'],
  },
]

// --- Talent Self-Service Types & Data ---

type ItemStatus = 'completed' | 'in-progress' | 'pending' | 'not-started'

interface OnboardingItem {
  id: string
  title: string
  description: string
  status: ItemStatus
  score?: number
}

interface OnboardingSection {
  id: string
  title: string
  icon: React.ReactNode
  items: OnboardingItem[]
}

const talentSections: OnboardingSection[] = [
  {
    id: 'documentation',
    title: 'Documentation',
    icon: <FileText className="size-4" />,
    items: [
      { id: 'd1', title: 'Government ID', description: 'Upload a valid government-issued photo ID', status: 'completed' },
      { id: 'd2', title: 'Resume / CV', description: 'Upload your most recent resume or CV', status: 'completed' },
      { id: 'd3', title: 'Certifications', description: 'Upload any relevant professional certifications', status: 'pending' },
      { id: 'd4', title: 'Portfolio / Work Samples', description: 'Share links or upload samples of past work', status: 'not-started' },
    ],
  },
  {
    id: 'assessments',
    title: 'Skill Assessments',
    icon: <ClipboardCheck className="size-4" />,
    items: [
      { id: 'a1', title: 'Technical Assessment', description: 'Complete the technical skills evaluation', status: 'completed', score: 92 },
      { id: 'a2', title: 'Soft Skills Evaluation', description: 'Complete the communication & teamwork assessment', status: 'in-progress' },
      { id: 'a3', title: 'Domain Knowledge', description: 'Industry-specific knowledge check', status: 'pending' },
    ],
  },
  {
    id: 'agreements',
    title: 'Agreements',
    icon: <PenLine className="size-4" />,
    items: [
      { id: 'g1', title: 'NDA', description: 'Non-disclosure agreement', status: 'completed' },
      { id: 'g2', title: 'Code of Conduct', description: 'Review and acknowledge the code of conduct', status: 'pending' },
      { id: 'g3', title: 'Rate Agreement', description: 'Confirm your agreed hourly / project rate', status: 'not-started' },
      { id: 'g4', title: 'W-9 / Tax Form', description: 'Submit required tax documentation', status: 'not-started' },
    ],
  },
]

function getItemStatusBadge(status: ItemStatus, score?: number) {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="size-3" />
          {score != null ? `Completed · ${score}%` : 'Completed'}
        </span>
      )
    case 'in-progress':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Clock className="size-3" />
          In Progress
        </span>
      )
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <Clock className="size-3" />
          Pending
        </span>
      )
    case 'not-started':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          <AlertCircle className="size-3" />
          Not Started
        </span>
      )
  }
}

function getActionLabel(sectionId: string, status: ItemStatus) {
  if (status === 'completed') return null
  if (sectionId === 'documentation') return 'Upload'
  if (sectionId === 'assessments') return status === 'in-progress' ? 'Continue' : 'Start'
  return 'Sign'
}

// --- Talent Self-Service View ---

function TalentOnboardingView() {
  const [activeSection, setActiveSection] = useState('documentation')

  const allItems = talentSections.flatMap(s => s.items)
  const completedCount = allItems.filter(i => i.status === 'completed').length
  const totalCount = allItems.length
  const overallPercent = Math.round((completedCount / totalCount) * 100)

  const currentSection = talentSections.find(s => s.id === activeSection) || talentSections[0]

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${overallPercent}%` }} />
        </div>
        <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5] shrink-0">{overallPercent}% complete</span>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar — Step list */}
        <div className="w-56 shrink-0 space-y-1">
          {talentSections.map(section => {
            const done = section.items.filter(i => i.status === 'completed').length
            const total = section.items.length
            const isActive = section.id === activeSection
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-white dark:bg-[#1e1e1e] shadow-sm border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <span className={`${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`}>
                  {section.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`}>
                    {section.title}
                  </div>
                  <div className="text-[10px] text-[#999] dark:text-[#666]">{done}/{total} complete</div>
                </div>
                <ChevronRight className={`size-3.5 shrink-0 ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#ccc] dark:text-[#555]'}`} />
              </button>
            )
          })}
        </div>

        {/* Right Content — Checklist */}
        <div className="flex-1 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
          <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-4">{currentSection.title}</h2>
          <div className="space-y-3">
            {currentSection.items.map(item => {
              const action = getActionLabel(currentSection.id, item.status)
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-0.5">{item.title}</div>
                    <div className="text-xs text-[#666] dark:text-[#aaa]">{item.description}</div>
                  </div>
                  {getItemStatusBadge(item.status, item.score)}
                  {action && (
                    <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#111] text-white dark:bg-[#e5e5e5] dark:text-[#111] hover:opacity-90 transition-opacity shrink-0">
                      {action}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

// --- Admin View ---

interface OnboardingCardProps {
  candidate: OnboardingCandidate
}

function OnboardingCard({ candidate }: OnboardingCardProps) {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    }
    return colorMap[color] || colorMap.blue
  }

  const getDayColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    }
    return colorMap[color] || colorMap.green
  }

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`size-12 rounded-full flex items-center justify-center text-base font-medium shrink-0 ${getColorClass(
            candidate.color
          )}`}
        >
          {candidate.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.name}</h3>
            <span
              className={`text-[10px] font-medium px-2 py-1 rounded ${getDayColorClass(
                candidate.dayColor
              )}`}
            >
              {candidate.day}
            </span>
          </div>
          <p className="text-xs text-[#666] dark:text-[#aaa]">{candidate.role}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#666] dark:text-[#aaa]">Progress</span>
          <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.progress}%</span>
        </div>
        <div className="h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${candidate.progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {candidate.completedTasks.map((task, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs text-green-700 dark:text-green-500">{task}</span>
          </div>
        ))}
        {candidate.pendingTasks.map((task, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-4 rounded-full border-2 border-[rgba(0,0,0,0.15)] dark:border-[rgba(255,255,255,0.2)] shrink-0" />
            <span className="text-xs text-[#666] dark:text-[#aaa]">{task}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminOnboardingView() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-3xl font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">12</div>
            <div className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">Onboarding</div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-green-500 mb-1">4</div>
            <div className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">Completed</div>
          </div>
        </div>

        <button className="px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-xs font-medium text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <OnboardingCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </>
  )
}

// --- Main Page ---

export default function OnboardingPage() {
  const [isTalent, setIsTalent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const role = sessionStorage.getItem('demo_user_role')
    setIsTalent(role === 'talent')
  }, [])

  if (!mounted) return null

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Onboarding</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Complete documentation, assessments, and agreements</p>
        </div>
        {isTalent ? <TalentOnboardingView /> : <AdminOnboardingView />}
      </div>
    </AppLayout>
  )
}
