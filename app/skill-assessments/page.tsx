'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Award, Filter, Star, CheckCircle2, Clock } from 'lucide-react'

// --- Types ---

type AssessmentStatus = 'completed' | 'in-progress' | 'pending'

interface TalentAssessment {
  id: string
  skill: string
  score: number
  maxScore: number
  status: AssessmentStatus
  assessedAt?: string
  assessorName?: string
  assignedDate: string
}

interface AdminAssessment {
  id: string
  candidate: {
    name: string
    email: string
    avatar: string
    avatarColor: string
  }
  skill: string
  score: number
  maxScore: number
  status: AssessmentStatus
  completedDate?: string
  assignedDate: string
}

// --- Talent View: Personal Skill Assessments ---

function TalentSkillAssessmentsView() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all')

  // Mock data - in production, fetch from API based on current user
  const [assessments] = useState<TalentAssessment[]>([
    {
      id: 'sa1',
      skill: 'React',
      score: 92,
      maxScore: 100,
      status: 'completed',
      assessedAt: '2024-01-18',
      assessorName: 'John Manager',
      assignedDate: '2024-01-15',
    },
    {
      id: 'sa2',
      skill: 'TypeScript',
      score: 0,
      maxScore: 100,
      status: 'in-progress',
      assignedDate: '2024-01-16',
    },
    {
      id: 'sa3',
      skill: 'Node.js',
      score: 0,
      maxScore: 100,
      status: 'pending',
      assignedDate: '2024-01-17',
    },
    {
      id: 'sa4',
      skill: 'Communication',
      score: 85,
      maxScore: 100,
      status: 'completed',
      assessedAt: '2024-01-19',
      assessorName: 'Sarah Coordinator',
      assignedDate: '2024-01-18',
    },
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredAssessments = assessments.filter(assessment => {
    if (selectedTab === 'all') return true
    return assessment.status === selectedTab
  })

  const completedCount = assessments.filter(a => a.status === 'completed').length
  const totalCount = assessments.length
  const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  function getStatusBadge(status: AssessmentStatus) {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle2 className="size-3" />
            Completed
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
    }
  }

  function getScoreColor(score: number, maxScore: number) {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'text-green-600 dark:text-green-400'
    if (percentage >= 60) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  function getActionLabel(status: AssessmentStatus) {
    if (status === 'completed') return null
    if (status === 'in-progress') return 'Continue'
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
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5] shrink-0">
            {overallProgress}% complete
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#666] dark:text-[#aaa]">
          <span>
            <strong className="text-[#111] dark:text-[#e5e5e5]">{completedCount}</strong>/{totalCount} assessments
            completed
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1">
        <button
          onClick={() => setSelectedTab('all')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
            selectedTab === 'all'
              ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
              : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
          }`}
        >
          All ({assessments.length})
        </button>
        <button
          onClick={() => setSelectedTab('completed')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
            selectedTab === 'completed'
              ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
              : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
          }`}
        >
          Completed ({completedCount})
        </button>
        <button
          onClick={() => setSelectedTab('in-progress')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
            selectedTab === 'in-progress'
              ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
              : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
          }`}
        >
          In Progress ({assessments.filter(a => a.status === 'in-progress').length})
        </button>
        <button
          onClick={() => setSelectedTab('pending')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
            selectedTab === 'pending'
              ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
              : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
          }`}
        >
          Pending ({assessments.filter(a => a.status === 'pending').length})
        </button>
      </div>

      {/* Assessments List */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
        <div className="space-y-3">
          {filteredAssessments.length > 0 ? (
            filteredAssessments.map(assessment => {
              const action = getActionLabel(assessment.status)
              return (
                <div
                  key={assessment.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="size-5 text-[#6366f1]" />
                      <div className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">{assessment.skill}</div>
                    </div>
                    <div className="text-xs text-[#666] dark:text-[#aaa] space-y-0.5">
                      {assessment.status === 'completed' && assessment.assessedAt ? (
                        <>
                          <div>Completed on {new Date(assessment.assessedAt).toLocaleDateString()}</div>
                          {assessment.assessorName && <div>Assessed by {assessment.assessorName}</div>}
                        </>
                      ) : assessment.status === 'in-progress' ? (
                        <div>In progress - continue your assessment</div>
                      ) : (
                        <div>Assigned on {new Date(assessment.assignedDate).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                  {assessment.status === 'completed' && (
                    <div className="flex items-center gap-3">
                      <div className={`text-lg font-semibold ${getScoreColor(assessment.score, assessment.maxScore)}`}>
                        {assessment.score}/{assessment.maxScore}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${
                              i < Math.floor((assessment.score / assessment.maxScore) * 5)
                                ? 'fill-[#fbbf24] text-[#fbbf24]'
                                : 'text-[#d1d5db] dark:text-[#4b5563]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {getStatusBadge(assessment.status)}
                  {action && (
                    <button
                      type="button"
                      onClick={() => router.push(`/skill-assessments/${assessment.id}`)}
                      className="px-4 py-2 text-xs font-medium rounded-md bg-[#111] text-white dark:bg-[#e5e5e5] dark:text-[#111] hover:opacity-90 transition-opacity shrink-0"
                    >
                      {action}
                    </button>
                  )}
                </div>
              )
            })
          ) : (
            <div className="text-center py-12 text-sm text-[#666] dark:text-[#aaa]">
              No assessments found matching your filter.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// --- Admin/Manager/Coordinator View: Candidate Overview ---

function AdminSkillAssessmentsView() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all')
  const [selectedAssessments, setSelectedAssessments] = useState<Set<string>>(new Set())

  // Mock data - in production, fetch from API
  const [assessments] = useState<AdminAssessment[]>([
    {
      id: '1',
      candidate: {
        name: 'Alex K.',
        email: 'alex.k@mail.com',
        avatar: 'AK',
        avatarColor: '#9ca3af',
      },
      skill: 'React',
      score: 85,
      maxScore: 100,
      status: 'completed',
      completedDate: 'Oct 25',
      assignedDate: 'Oct 20',
    },
    {
      id: '2',
      candidate: {
        name: 'Maria R.',
        email: 'maria@email.co',
        avatar: 'MR',
        avatarColor: '#a78bfa',
      },
      skill: 'TypeScript',
      score: 92,
      maxScore: 100,
      status: 'completed',
      completedDate: 'Oct 24',
      assignedDate: 'Oct 19',
    },
    {
      id: '3',
      candidate: {
        name: 'John L.',
        email: 'john.l@acme.co',
        avatar: 'JL',
        avatarColor: '#34d399',
      },
      skill: 'Node.js',
      score: 0,
      maxScore: 100,
      status: 'in-progress',
      assignedDate: 'Oct 22',
    },
    {
      id: '4',
      candidate: {
        name: 'Sarah M.',
        email: 'sarah.m@email.com',
        avatar: 'SM',
        avatarColor: '#f59e0b',
      },
      skill: 'Python',
      score: 0,
      maxScore: 100,
      status: 'pending',
      assignedDate: 'Oct 26',
    },
  ])

  const filteredAssessments = assessments.filter(assessment => {
    if (selectedTab === 'all') return true
    return assessment.status === selectedTab
  })

  const toggleAssessment = (id: string) => {
    const newSelected = new Set(selectedAssessments)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedAssessments(newSelected)
  }

  const toggleAll = () => {
    if (selectedAssessments.size === filteredAssessments.length) {
      setSelectedAssessments(new Set())
    } else {
      setSelectedAssessments(new Set(filteredAssessments.map(assessment => assessment.id)))
    }
  }

  const getStatusBadge = (status: AssessmentStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#d1fae5] dark:bg-green-900/30 text-[#059669] dark:text-green-400 rounded text-xs font-medium">
            <CheckCircle2 className="size-3" />
            Completed
          </span>
        )
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#dbeafe] dark:bg-blue-900/30 text-[#2563eb] dark:text-blue-400 rounded text-xs font-medium">
            <Clock className="size-3" />
            In Progress
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

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'text-[#059669] dark:text-green-400'
    if (percentage >= 60) return 'text-[#d97706] dark:text-yellow-400'
    return 'text-[#dc2626] dark:text-red-400'
  }

  return (
    <>
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
              All ({assessments.length})
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedTab === 'completed'
                  ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                  : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
              }`}
            >
              Completed ({assessments.filter(a => a.status === 'completed').length})
            </button>
            <button
              onClick={() => setSelectedTab('in-progress')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedTab === 'in-progress'
                  ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                  : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
              }`}
            >
              In Progress ({assessments.filter(a => a.status === 'in-progress').length})
            </button>
            <button
              onClick={() => setSelectedTab('pending')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedTab === 'pending'
                  ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                  : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
              }`}
            >
              Pending ({assessments.filter(a => a.status === 'pending').length})
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-md text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors">
            Assign Assessment
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
                  checked={selectedAssessments.size === filteredAssessments.length && filteredAssessments.length > 0}
                  onChange={toggleAll}
                  className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Skill</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Assigned</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Completed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssessments.map(assessment => (
              <tr
                key={assessment.id}
                className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedAssessments.has(assessment.id)}
                    onChange={() => toggleAssessment(assessment.id)}
                    className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                      style={{ backgroundColor: assessment.candidate.avatarColor }}
                    >
                      {assessment.candidate.avatar}
                    </div>
                    <div>
                      <div className="text-sm text-[#111] dark:text-[#e5e5e5] font-medium">
                        {assessment.candidate.name}
                      </div>
                      <div className="text-xs text-[#666] dark:text-[#aaa]">{assessment.candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-[#6366f1]" />
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{assessment.skill}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {assessment.status === 'completed' ? (
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${getScoreColor(assessment.score, assessment.maxScore)}`}>
                        {assessment.score}/{assessment.maxScore}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 ${
                              i < Math.floor((assessment.score / assessment.maxScore) * 5)
                                ? 'fill-[#fbbf24] text-[#fbbf24]'
                                : 'text-[#d1d5db] dark:text-[#4b5563]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-[#666] dark:text-[#aaa]">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-[#666] dark:text-[#aaa]">{assessment.assignedDate}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-[#666] dark:text-[#aaa]">{assessment.completedDate || '—'}</div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(assessment.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// --- Main Page ---

export default function SkillAssessmentsPage() {
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
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Skill Assessments</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            {isTalent
              ? 'Complete your skill assessments and track your progress'
              : 'Track and evaluate candidate skill assessments'}
          </p>
        </div>

        {isTalent ? <TalentSkillAssessmentsView /> : <AdminSkillAssessmentsView />}
      </div>
    </AppLayout>
  )
}
