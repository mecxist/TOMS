'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import {
  Filter,
  FileText,
  Upload,
  ClipboardCheck,
  PenLine,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  ClipboardList,
  Award,
  User,
  Search,
  ChevronDown,
  Star,
} from 'lucide-react'

// --- Types ---

type ItemStatus = 'completed' | 'in-progress' | 'pending' | 'not-started'

interface OnboardingModule {
  id: string
  title: string
  description: string
  type: 'CONTRACT' | 'W9_OR_W4' | 'SKILL_ASSESSMENT' | 'TOOL_TRAINING' | 'BACKGROUND_CHECK' | 'VIDEO_TRAINING' | 'DOCUMENT_UPLOAD'
  status: ItemStatus
  completedAt?: string
  documentUrl?: string
}

interface OnboardingSection {
  id: string
  title: string
  icon: React.ReactNode
  modules: OnboardingModule[]
}

// --- Talent View: Personal Onboarding ---

interface TalentOnboardingData {
  sections: OnboardingSection[]
  overallProgress: number
}

function TalentOnboardingView() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Mock data - in production, fetch from API based on current user
  const [data] = useState<TalentOnboardingData>({
    sections: [
      {
        id: 'documentation',
        title: 'Documentation',
        icon: <FileText className="size-4" />,
        modules: [
          {
            id: 'doc1',
            title: 'Government ID',
            description: 'Upload a valid government-issued photo ID',
            type: 'DOCUMENT_UPLOAD',
            status: 'completed',
            completedAt: '2024-01-15',
          },
          {
            id: 'doc2',
            title: 'Resume / CV',
            description: 'Upload your most recent resume or CV',
            type: 'DOCUMENT_UPLOAD',
            status: 'completed',
            completedAt: '2024-01-15',
          },
          {
            id: 'doc3',
            title: 'Certifications',
            description: 'Upload any relevant professional certifications',
            type: 'DOCUMENT_UPLOAD',
            status: 'pending',
          },
        ],
      },
      {
        id: 'agreements',
        title: 'Agreements',
        icon: <PenLine className="size-4" />,
        modules: [
          {
            id: 'agr1',
            title: 'Contract',
            description: 'Review and sign your employment contract',
            type: 'CONTRACT',
            status: 'completed',
            completedAt: '2024-01-16',
          },
          {
            id: 'agr2',
            title: 'W-9 / Tax Form',
            description: 'Submit required tax documentation',
            type: 'W9_OR_W4',
            status: 'in-progress',
          },
          {
            id: 'agr3',
            title: 'NDA',
            description: 'Non-disclosure agreement',
            type: 'DOCUMENT_UPLOAD',
            status: 'completed',
            completedAt: '2024-01-16',
          },
        ],
      },
      {
        id: 'training',
        title: 'Training & Checks',
        icon: <ClipboardCheck className="size-4" />,
        modules: [
          {
            id: 'train1',
            title: 'Background Check',
            description: 'Complete background verification',
            type: 'BACKGROUND_CHECK',
            status: 'completed',
            completedAt: '2024-01-17',
          },
          {
            id: 'train2',
            title: 'Tool Training',
            description: 'Complete onboarding training for internal tools',
            type: 'TOOL_TRAINING',
            status: 'in-progress',
          },
          {
            id: 'train3',
            title: 'Video Training',
            description: 'Watch required orientation videos',
            type: 'VIDEO_TRAINING',
            status: 'pending',
          },
        ],
      },
    ],
    overallProgress: 65,
  })

  useEffect(() => {
    setMounted(true)
    // Set first section as active by default
    if (data.sections.length > 0) {
      setActiveSection(data.sections[0].id)
    }
  }, [])

  if (!mounted) return null

  const allModules = data.sections.flatMap(s => s.modules)
  const completedModules = allModules.filter(m => m.status === 'completed').length
  const totalModules = allModules.length

  const currentSection = data.sections.find(s => s.id === activeSection)

  function getStatusBadge(status: ItemStatus, score?: number, maxScore?: number) {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 className="size-3" />
            {score != null && maxScore != null ? `Completed · ${score}/${maxScore}` : 'Completed'}
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

  function getActionLabel(module: OnboardingModule) {
    if (module.status === 'completed') return null
    if (module.type === 'DOCUMENT_UPLOAD') return 'Upload'
    if (module.type === 'CONTRACT' || module.type === 'W9_OR_W4') return 'Sign'
    if (module.status === 'in-progress') return 'Continue'
    return 'Start'
  }

  return (
    <>
      {/* Progress Overview */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${data.overallProgress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5] shrink-0">
            {data.overallProgress}% complete
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#666] dark:text-[#aaa]">
          <span>
            <strong className="text-[#111] dark:text-[#e5e5e5]">{completedModules}</strong>/{totalModules} modules
            completed
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar — Sections */}
        <div className="w-56 shrink-0 space-y-1">
          {data.sections.map(section => {
            const done = section.modules.filter(m => m.status === 'completed').length
            const total = section.modules.length
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
                  <div
                    className={`text-xs font-medium ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`}
                  >
                    {section.title}
                  </div>
                  <div className="text-[10px] text-[#999] dark:text-[#666]">
                    {done}/{total} complete
                  </div>
                </div>
                <ChevronRight
                  className={`size-3.5 shrink-0 ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#ccc] dark:text-[#555]'}`}
                />
              </button>
            )
          })}
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
          {currentSection ? (
            <>
              <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-4">{currentSection.title}</h2>
              <div className="space-y-3">
                {currentSection.modules.map(module => {
                  const action = getActionLabel(module)
                  return (
                    <div
                      key={module.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-0.5">
                          {module.title}
                        </div>
                        <div className="text-xs text-[#666] dark:text-[#aaa]">{module.description}</div>
                        {module.completedAt && (
                          <div className="text-[10px] text-[#999] dark:text-[#666] mt-1">
                            Completed on {new Date(module.completedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      {getStatusBadge(module.status)}
                      {action && (
                        <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#111] text-white dark:bg-[#e5e5e5] dark:text-[#111] hover:opacity-90 transition-opacity shrink-0">
                          {action}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-sm text-[#666] dark:text-[#aaa]">
              Select a section to view modules
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// --- Admin/Manager/Coordinator View: Candidate Overview ---

interface CandidateOnboardingData {
  id: string
  name: string
  email: string
  initials: string
  avatarColor: string
  role: string
  onboardingProgress: number
  completedModules: string[]
  pendingModules: string[]
  skillAssessments: {
    skill: string
    score: number
    maxScore: number
    status: ItemStatus
    assessedAt?: string
    assessorName?: string
  }[]
  daysSinceStart: number
}

function AdminOnboardingView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'completed'>('all')
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null)

  // Mock data - in production, fetch from API
  const [candidates] = useState<CandidateOnboardingData[]>([
    {
      id: '1',
      name: 'Sarah K.',
      email: 'sarah.k@example.com',
      initials: 'SK',
      avatarColor: '#a855f7',
      role: 'Product Designer',
      onboardingProgress: 75,
      completedModules: ['Contract', 'W-9', 'Government ID', 'Background Check'],
      pendingModules: ['Tool Training', 'Video Training'],
      skillAssessments: [
        { skill: 'Figma', score: 95, maxScore: 100, status: 'completed', assessedAt: '2024-01-18', assessorName: 'John M.' },
        { skill: 'Design Systems', score: 88, maxScore: 100, status: 'completed', assessedAt: '2024-01-19', assessorName: 'John M.' },
        { skill: 'Communication', score: 0, maxScore: 100, status: 'pending' },
      ],
      daysSinceStart: 3,
    },
    {
      id: '2',
      name: 'Michael J.',
      email: 'michael.j@example.com',
      initials: 'MJ',
      avatarColor: '#60a5fa',
      role: 'Backend Lead',
      onboardingProgress: 95,
      completedModules: ['Contract', 'W-9', 'Government ID', 'Background Check', 'Tool Training'],
      pendingModules: ['Video Training'],
      skillAssessments: [
        { skill: 'Node.js', score: 92, maxScore: 100, status: 'completed', assessedAt: '2024-01-17', assessorName: 'Sarah C.' },
        { skill: 'PostgreSQL', score: 90, maxScore: 100, status: 'completed', assessedAt: '2024-01-18', assessorName: 'Sarah C.' },
        { skill: 'AWS', score: 85, maxScore: 100, status: 'completed', assessedAt: '2024-01-19', assessorName: 'Sarah C.' },
      ],
      daysSinceStart: 1,
    },
    {
      id: '3',
      name: 'Alex K.',
      email: 'alex.k@example.com',
      initials: 'AK',
      avatarColor: '#34d399',
      role: 'Frontend Engineer',
      onboardingProgress: 45,
      completedModules: ['Contract', 'Government ID'],
      pendingModules: ['W-9', 'Background Check', 'Tool Training', 'Video Training'],
      skillAssessments: [
        { skill: 'React', score: 85, maxScore: 100, status: 'completed', assessedAt: '2024-01-16', assessorName: 'John M.' },
        { skill: 'TypeScript', score: 0, maxScore: 100, status: 'in-progress' },
        { skill: 'Communication', score: 0, maxScore: 100, status: 'pending' },
      ],
      daysSinceStart: 5,
    },
  ])

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && candidate.onboardingProgress === 100) ||
      (filterStatus === 'in-progress' && candidate.onboardingProgress < 100)
    return matchesSearch && matchesFilter
  })

  function getStatusBadge(status: ItemStatus, score?: number, maxScore?: number) {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 className="size-3" />
            {score != null && maxScore != null ? `${score}/${maxScore}` : 'Completed'}
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

  function getScoreColor(score: number, maxScore: number) {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'text-green-600 dark:text-green-400'
    if (percentage >= 60) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <>
      {/* Header Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-3xl font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">
              {candidates.length}
            </div>
            <div className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">Onboarding</div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-green-500 mb-1">
              {candidates.filter(c => c.onboardingProgress === 100).length}
            </div>
            <div className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">Completed</div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-blue-500 mb-1">
              {candidates.filter(c => c.onboardingProgress < 100).length}
            </div>
            <div className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">In Progress</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#666] dark:text-[#aaa]" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] dark:placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
              className="appearance-none pl-3 pr-8 py-2 text-xs border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-[#666] dark:text-[#aaa] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="space-y-4">
        {filteredCandidates.map(candidate => {
          const isExpanded = expandedCandidate === candidate.id
          const completedAssessments = candidate.skillAssessments.filter(a => a.status === 'completed').length
          const totalAssessments = candidate.skillAssessments.length

          return (
            <div
              key={candidate.id}
              className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="size-12 rounded-full flex items-center justify-center text-base font-medium text-white shrink-0"
                    style={{ backgroundColor: candidate.avatarColor }}
                  >
                    {candidate.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.name}</h3>
                      <span className="text-[10px] font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        Day {candidate.daysSinceStart}
                      </span>
                    </div>
                    <p className="text-xs text-[#666] dark:text-[#aaa]">{candidate.role}</p>
                    <p className="text-xs text-[#999] dark:text-[#666] mt-1">{candidate.email}</p>
                  </div>

                  <button
                    onClick={() => setExpandedCandidate(isExpanded ? null : candidate.id)}
                    className="px-3 py-1.5 text-xs font-medium border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-1"
                  >
                    {isExpanded ? 'Collapse' : 'View Details'}
                    <ChevronDown
                      className={`size-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#666] dark:text-[#aaa]">Overall Progress</span>
                    <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5]">
                      {candidate.onboardingProgress}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${candidate.onboardingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-4 flex items-center gap-6 text-xs text-[#666] dark:text-[#aaa]">
                  <span>
                    <strong className="text-[#111] dark:text-[#e5e5e5]">{candidate.completedModules.length}</strong>{' '}
                    modules completed
                  </span>
                  <span>
                    <strong className="text-[#111] dark:text-[#e5e5e5]">{completedAssessments}</strong>/{totalAssessments}{' '}
                    assessments
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 space-y-6">
                  {/* Onboarding Modules */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5] mb-3 flex items-center gap-2">
                      <ClipboardList className="size-4" />
                      Onboarding Modules
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] text-[#666] dark:text-[#aaa] mb-2 uppercase tracking-wide">
                          Completed
                        </div>
                        <div className="space-y-1.5">
                          {candidate.completedModules.length > 0 ? (
                            candidate.completedModules.map((module, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="size-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                  <svg
                                    className="size-2.5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                                <span className="text-xs text-green-700 dark:text-green-500">{module}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-[#999] dark:text-[#666]">None</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#666] dark:text-[#aaa] mb-2 uppercase tracking-wide">
                          Pending
                        </div>
                        <div className="space-y-1.5">
                          {candidate.pendingModules.length > 0 ? (
                            candidate.pendingModules.map((module, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="size-4 rounded-full border-2 border-[rgba(0,0,0,0.15)] dark:border-[rgba(255,255,255,0.2)] shrink-0" />
                                <span className="text-xs text-[#666] dark:text-[#aaa]">{module}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-green-700 dark:text-green-500">All complete!</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skill Assessments */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5] mb-3 flex items-center gap-2">
                      <Award className="size-4" />
                      Skill Assessments
                    </h4>
                    <div className="space-y-2">
                      {candidate.skillAssessments.map((assessment, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-3 rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <Award className="size-4 text-[#6366f1]" />
                              <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">
                                {assessment.skill}
                              </div>
                            </div>
                            {assessment.status === 'completed' && assessment.assessedAt && (
                              <div className="text-xs text-[#666] dark:text-[#aaa]">
                                Assessed on {new Date(assessment.assessedAt).toLocaleDateString()}
                                {assessment.assessorName && ` by ${assessment.assessorName}`}
                              </div>
                            )}
                          </div>
                          {assessment.status === 'completed' && (
                            <div
                              className={`text-sm font-semibold ${getScoreColor(assessment.score, assessment.maxScore)}`}
                            >
                              {assessment.score}/{assessment.maxScore}
                            </div>
                          )}
                          {getStatusBadge(assessment.status, assessment.score, assessment.maxScore)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12 text-sm text-[#666] dark:text-[#aaa]">
          No candidates found matching your search criteria.
        </div>
      )}
    </>
  )
}

// --- Main Page ---

export default function OnboardingPage() {
  const [userRole, setUserRole] = useState<'ADMIN' | 'MANAGER' | 'COORDINATOR' | 'TALENT'>('TALENT')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // In demo mode, check sessionStorage
    const role = sessionStorage.getItem('demo_user_role') || document.cookie.match(/demo_role=(\w+)/)?.[1]
    if (role) {
      setUserRole(role.toUpperCase() as typeof userRole)
    } else {
      // In production, fetch from API
      // const response = await fetch('/api/user/role')
      // const { role } = await response.json()
      // setUserRole(role)
    }
  }, [])

  if (!mounted) return null

  const isTalent = userRole === 'TALENT'

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Onboarding</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            {isTalent
              ? 'Complete your onboarding modules'
              : 'Track candidate onboarding progress and skill assessments'}
          </p>
        </div>
        {isTalent ? <TalentOnboardingView /> : <AdminOnboardingView />}
      </div>
    </AppLayout>
  )
}
