'use client'

import Link from 'next/link'
import { AppLayout } from '@/components/shared/app-layout'
import { Clock, Video, Users, Bold, Italic, Link as LinkIcon, FileText, CalendarCheck } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Interview {
  id: string
  time: string
  title: string
  candidate: string
  platform: string
  type: string
  /** Meeting location (e.g. "Building A, Room 12" or "Video call") - in sync with scheduling */
  meetingLocation: string
  /** Duration in minutes - in sync with scheduling */
  durationMinutes: number
  /** Meeting URL for video calls - in sync with scheduling */
  meetingUrl?: string
  /** Interviewer name - in sync with scheduling */
  interviewer: string
  /** Start time for display (e.g. "10:30 AM") */
  startTime: string
  /** End time derived from start + duration */
  endTime: string
}

const upcomingInterviews: Interview[] = [
  {
    id: '1',
    time: 'TODAY, 10:30 AM',
    title: 'Technical Screening',
    candidate: 'Alex K.',
    platform: 'Google Meet',
    type: 'Technical',
    meetingLocation: 'Google Meet (video call)',
    durationMinutes: 45,
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    interviewer: 'Rachel Adams',
    startTime: '10:30 AM',
    endTime: '11:15 AM',
  },
  {
    id: '2',
    time: 'TODAY, 02:30 PM',
    title: 'System Design',
    candidate: 'John L.',
    platform: 'Zoom',
    type: 'System',
    meetingLocation: 'Zoom (video call)',
    durationMinutes: 60,
    meetingUrl: 'https://zoom.us/j/123456789',
    interviewer: 'Marcus Johnson',
    startTime: '02:30 PM',
    endTime: '03:30 PM',
  },
  {
    id: '3',
    time: 'TOMORROW, 11:00 AM',
    title: 'Culture Fit',
    candidate: 'Maria R.',
    platform: 'In-Office',
    type: 'Culture',
    meetingLocation: 'Building A, Conference Room 3',
    durationMinutes: 45,
    interviewer: 'Priya Patel',
    startTime: '11:00 AM',
    endTime: '11:45 AM',
  },
]

export default function InterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState(upcomingInterviews[0])
  const [overallScore, setOverallScore] = useState(4)
  const [userRole, setUserRole] = useState<'ADMIN' | 'MANAGER' | 'COORDINATOR' | 'TALENT'>('ADMIN')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const role = sessionStorage.getItem('demo_user_role') || document.cookie.match(/demo_role=(\w+)/)?.[1]
    if (role) {
      setUserRole(role.toUpperCase() as typeof userRole)
    }
  }, [])

  if (!mounted) return null

  const isTalent = userRole === 'TALENT'

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-[#f5f5f5] dark:bg-[#2a2a2a] p-8">
        {/* Header */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <CalendarCheck className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Interviews</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            {isTalent ? 'View your scheduled interviews' : 'Run and score scheduled interviews'}
          </p>
          {!isTalent && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Link href="/" className="text-xs text-[#6366f1] hover:underline">Pipeline</Link>
              <span className="text-[#999] dark:text-[#666]">·</span>
              <Link href="/applications" className="text-xs text-[#6366f1] hover:underline inline-flex items-center gap-1">
                <FileText className="size-3" /> Applications
              </Link>
            </div>
          )}
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Left Sidebar - Interview List */}
          <div className="w-[420px] flex-shrink-0 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 overflow-y-auto scroller">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-1">Upcoming</h3>
              <p className="text-xs text-[#666] dark:text-[#aaa]">3 interviews scheduled for today</p>
            </div>

            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  isSelected={selectedInterview.id === interview.id}
                  onClick={() => setSelectedInterview(interview)}
                />
              ))}
            </div>
          </div>

          {/* Right Panel - Interview Details */}
          <div className="flex-1 min-w-0 overflow-y-auto scroller">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
              <div className="max-w-4xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-xl font-semibold text-[#111] dark:text-[#e5e5e5]">{selectedInterview.title}</h1>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium px-2 py-1 rounded">
                        LIVE
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#666] dark:text-[#aaa]">
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span>{selectedInterview.startTime} – {selectedInterview.endTime}</span>
                        <span className="text-[#999] dark:text-[#666]">({selectedInterview.durationMinutes} min)</span>
                      </div>
                      {isTalent ? (
                        <div className="flex items-center gap-1">
                          <Users className="size-3" />
                          <span>Interviewer: {selectedInterview.interviewer}</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-1">
                            <Users className="size-3" />
                            <span>{selectedInterview.candidate} (Candidate)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{selectedInterview.interviewer} (Interviewer)</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-medium text-[#111] dark:text-[#e5e5e5]">Meeting location:</span>
                      <span className="text-[#666] dark:text-[#aaa]">{selectedInterview.meetingLocation}</span>
                      {selectedInterview.meetingUrl && (
                        <a
                          href={selectedInterview.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6366f1] hover:underline"
                        >
                          Join meeting
                        </a>
                      )}
                    </div>
                  </div>

                  {!isTalent && (
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-xs font-medium text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                        Resume
                      </button>
                      <button className="px-4 py-2 bg-[#eb3a14] text-white rounded text-xs font-medium hover:bg-[#d63512] transition-colors">
                        Join Call
                      </button>
                    </div>
                  )}
                </div>

                {isTalent ? (
                  <>
                    {/* Talent View - Interview Info */}
                    <div className="bg-[#f5f5f5] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 mb-6">
                      <h2 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-4">
                        Interview Details
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-[#666] dark:text-[#aaa] mb-1">Type</div>
                          <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{selectedInterview.type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#666] dark:text-[#aaa] mb-1">Duration</div>
                          <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{selectedInterview.durationMinutes} minutes</div>
                        </div>
                        {selectedInterview.meetingUrl && (
                          <div>
                            <a
                              href={selectedInterview.meetingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1] text-white rounded-md text-sm font-medium hover:bg-[#5856eb] transition-colors"
                            >
                              <Video className="size-4" />
                              Join Interview
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Admin View - Agenda */}
                    <div className="bg-[#f5f5f5] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 mb-6">
                      <h2 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-4">
                        Agenda
                      </h2>
                      <div className="space-y-3">
                        <AgendaItem title="Introduction & Experience (5m)" isCompleted={true} />
                        <AgendaItem title="React Component Lifecycle (10m)" isCompleted={false} />
                        <AgendaItem title="State Management Challenge (20m)" isCompleted={false} />
                        <AgendaItem title="Q&A (10m)" isCompleted={false} />
                      </div>
                    </div>

                    {/* Interviewer Notes */}
                    <div className="bg-[#f5f5f5] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 mb-6">
                      <h2 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-4">
                        Interviewer Notes
                      </h2>
                      <textarea
                        placeholder="Type your observations here... Use markdown for formatting."
                        className="w-full min-h-[120px] p-3 bg-white dark:bg-[#1e1e1e] rounded border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] outline-none text-sm text-[#111] dark:text-[#e5e5e5] placeholder-[#999] dark:placeholder-[#888] resize-none"
                      />
                      <div className="flex items-center gap-2 mt-3">
                        <button className="p-1.5 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                          <Bold className="size-4 text-[#666] dark:text-[#aaa]" />
                        </button>
                        <button className="p-1.5 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                          <Italic className="size-4 text-[#666] dark:text-[#aaa]" />
                        </button>
                        <button className="p-1.5 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                          <LinkIcon className="size-4 text-[#666] dark:text-[#aaa]" />
                        </button>
                      </div>
                    </div>

                    {/* Evaluation */}
                    <div className="bg-[#f5f5f5] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
                      <h2 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-4">
                        Evaluation
                      </h2>
                      <div>
                        <label className="text-sm text-[#111] dark:text-[#e5e5e5] mb-3 block">Overall Score</label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <button
                              key={score}
                              onClick={() => setOverallScore(score)}
                              className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
                                score === overallScore
                                  ? 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
                                  : 'bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
                              }`}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

interface InterviewCardProps {
  interview: Interview
  isSelected: boolean
  onClick: () => void
}

function InterviewCard({ interview, isSelected, onClick }: InterviewCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'bg-[#ececf0] dark:bg-[#27272a] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.15)]'
          : 'bg-white dark:bg-[#1e1e1e] border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,0,0,0.1)] dark:hover:border-[rgba(255,255,255,0.15)]'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-medium text-[#666] dark:text-[#888] uppercase tracking-wide">
          {interview.time}
        </span>
        {isSelected && <Video className="size-4 text-[#eb3a14]" />}
      </div>

      <h3 className="font-medium text-sm text-[#111] dark:text-[#e5e5e5] mb-1">{interview.title}</h3>
      <div className="flex items-center gap-2 text-xs text-[#666] dark:text-[#aaa]">
        <Users className="size-3" />
        <span>{interview.candidate}</span>
      </div>

      <div className="mt-3">
        <span className="bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] text-[10px] font-medium px-2 py-1 rounded">
          {interview.platform}
        </span>
      </div>
    </div>
  )
}

interface AgendaItemProps {
  title: string
  isCompleted: boolean
}

function AgendaItem({ title, isCompleted }: AgendaItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`size-4 rounded-full mt-0.5 flex items-center justify-center ${
          isCompleted ? 'bg-green-500' : 'bg-white dark:bg-[#1e1e1e] border-2 border-[rgba(0,0,0,0.15)] dark:border-[rgba(255,255,255,0.2)]'
        }`}
      >
        {isCompleted && (
          <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-sm ${isCompleted ? 'text-[#666] dark:text-[#888] line-through' : 'text-[#111] dark:text-[#e5e5e5]'}`}>
        {title}
      </span>
    </div>
  )
}
