'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/shared/app-layout'
import { Users, FileText, MessageSquare, FileCheck, LayoutDashboard, CalendarCheck, CheckCircle2, Clock, Video, Calendar, Send, Inbox } from 'lucide-react'
import {
  CandidateDetailModal,
  MessageModal,
  ScheduleModal,
} from '@/components/shared/candidate-modals'
import { Modal } from '@/components/shared/modal'
import { Button } from '@/components/ui/button'
import { OfferLetterModal, type OfferLetterData } from '@/components/shared/offer-letter-modal'

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

// Talent: scheduled interview (for list view)
interface ScheduledInterview {
  id: string
  type: string
  date: string
  time: string
  interviewer: string
  platform: string
  meetingUrl?: string
  score?: number
  status: 'upcoming' | 'completed'
  scheduledBy?: string
  coordinatorName?: string
  coordinatorEmail?: string
  interviewerEmail?: string
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

// Talent: scheduled interviews (demo – coordinator/manager/admin set these)
const talentScheduledInterviews: ScheduledInterview[] = [
  {
    id: 'tech-1',
    type: 'Technical Screening',
    date: 'Jan 15, 2024',
    time: '10:00 AM',
    interviewer: 'Rachel Adams',
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    score: 92,
    status: 'completed',
    scheduledBy: 'Hiring Coordinator',
    coordinatorName: 'Hiring Coordinator',
    coordinatorEmail: 'coordinator@company.com',
    interviewerEmail: 'rachel.adams@company.com',
  },
  {
    id: 'sys-1',
    type: 'System Design',
    date: 'Jan 18, 2024',
    time: '2:00 PM',
    interviewer: 'Marcus Johnson',
    platform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/123456789',
    score: 88,
    status: 'completed',
    scheduledBy: 'Engineering Manager',
    coordinatorName: 'Hiring Coordinator',
    coordinatorEmail: 'coordinator@company.com',
    interviewerEmail: 'marcus.johnson@company.com',
  },
  {
    id: 'cult-1',
    type: 'Culture Fit',
    date: 'Jan 20, 2024',
    time: '11:00 AM',
    interviewer: 'Priya Patel',
    platform: 'In-Office',
    score: 95,
    status: 'completed',
    scheduledBy: 'HR',
    coordinatorName: 'Hiring Coordinator',
    coordinatorEmail: 'coordinator@company.com',
    interviewerEmail: 'priya.patel@company.com',
  },
  {
    id: 'final-1',
    type: 'Final Round',
    date: 'Jan 22, 2024',
    time: '3:00 PM',
    interviewer: 'Sarah Manager',
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/xyz-uvw-rst',
    score: 90,
    status: 'completed',
    scheduledBy: 'Hiring Manager',
    coordinatorName: 'Hiring Coordinator',
    coordinatorEmail: 'coordinator@company.com',
    interviewerEmail: 'sarah.manager@company.com',
  },
]

const talentOffer = { status: 'accepted' as const, date: 'Jan 24, 2024' }

// Talent view: offer letter data (for "View offer letter" from Interviews page)
const talentOfferLetterData: OfferLetterData = {
  candidateName: 'Talent User',
  role: 'Senior Frontend Engineer',
  salary: '$135,000',
  startDate: 'Feb 12, 2024',
  sentDate: 'Jan 24, 2024',
  expiryDate: 'Jan 31, 2024',
}

// Simulate new scheduled notification (e.g. when coordinator adds one)
const hasNewScheduledNotification = false // set true to show "new interview scheduled" banner

// --- Talent: Interview detail + Reschedule + Message modals ---

function TalentInterviewDetailModal({
  interview,
  onClose,
  onRequestReschedule,
  onMessageCoordinator,
  onMessageInterviewer,
}: {
  interview: ScheduledInterview | null
  onClose: () => void
  onRequestReschedule: () => void
  onMessageCoordinator: () => void
  onMessageInterviewer: () => void
}) {
  if (!interview) return null
  const isUpcoming = interview.status === 'upcoming'
  return (
    <Modal isOpen={!!interview} onClose={onClose} title={interview.type} size="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-[#666] dark:text-[#888]">Date & time</span>
            <p className="font-medium text-[#111] dark:text-[#e5e5e5]">{interview.date} at {interview.time}</p>
          </div>
          <div>
            <span className="text-[#666] dark:text-[#888]">Platform</span>
            <p className="font-medium text-[#111] dark:text-[#e5e5e5]">{interview.platform}</p>
          </div>
          <div>
            <span className="text-[#666] dark:text-[#888]">Interviewer</span>
            <p className="font-medium text-[#111] dark:text-[#e5e5e5]">{interview.interviewer}</p>
          </div>
          {interview.scheduledBy && (
            <div>
              <span className="text-[#666] dark:text-[#888]">Scheduled by</span>
              <p className="font-medium text-[#111] dark:text-[#e5e5e5]">{interview.scheduledBy}</p>
            </div>
          )}
          {interview.score != null && (
            <div>
              <span className="text-[#666] dark:text-[#888]">Score</span>
              <p className="font-medium text-green-600 dark:text-green-400">{interview.score}%</p>
            </div>
          )}
        </div>
        {isUpcoming && interview.meetingUrl && (
          <a
            href={interview.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6366f1] hover:underline"
          >
            <Video className="size-4" />
            Join meeting
          </a>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] flex flex-wrap gap-2">
        {isUpcoming && (
          <Button variant="outline" size="sm" onClick={onRequestReschedule}>
            <Calendar className="size-3.5" />
            Request reschedule
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onMessageCoordinator}>
          <MessageSquare className="size-3.5" />
          Message coordinator
        </Button>
        <Button variant="outline" size="sm" onClick={onMessageInterviewer}>
          <MessageSquare className="size-3.5" />
          Message interviewer
        </Button>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  )
}

function RescheduleRequestModal({
  interview,
  onClose,
}: {
  interview: ScheduledInterview | null
  onClose: () => void
}) {
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [reason, setReason] = useState('')
  const [sent, setSent] = useState(false)
  if (!interview) return null
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }
  if (sent) {
    return (
      <Modal isOpen onClose={onClose} title="Request reschedule" size="default">
        <p className="text-sm text-[#111] dark:text-[#e5e5e5]">
          Your reschedule request has been sent. The coordinator will follow up with you.
        </p>
      </Modal>
    )
  }
  return (
    <Modal isOpen onClose={onClose} title="Request reschedule" size="lg">
      <form id="reschedule-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#666] dark:text-[#888] mb-1.5">Preferred date</label>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#666] dark:text-[#888] mb-1.5">Preferred time</label>
          <input
            type="time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#666] dark:text-[#888] mb-1.5">Reason (optional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. conflict with another commitment"
            rows={2}
            className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
          />
        </div>
      </form>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button variant="default" size="sm" type="submit" form="reschedule-form">Submit request</Button>
      </div>
    </Modal>
  )
}

function TalentComposeMessageModal({
  recipientName,
  recipientRole,
  onClose,
}: {
  recipientName: string
  recipientRole: string
  onClose: () => void
}) {
  const router = useRouter()
  const [messageText, setMessageText] = useState('')
  const [sent, setSent] = useState(false)
  const handleSend = () => {
    if (!messageText.trim()) return
    setSent(true)
    setTimeout(() => onClose(), 1200)
  }
  if (sent) {
    return (
      <Modal isOpen onClose={onClose} title={`Message ${recipientName}`} size="default">
        <p className="text-sm text-[#111] dark:text-[#e5e5e5]">Message sent. They’ll get back to you soon.</p>
      </Modal>
    )
  }
  return (
    <Modal isOpen onClose={onClose} title={`Message ${recipientName}`} size="lg">
      <p className="text-xs text-[#666] dark:text-[#888] mb-3">Sending to {recipientName} ({recipientRole})</p>
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
        rows={4}
        className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => { onClose(); router.push('/messages') }}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#6366f1] hover:underline"
        >
          <Inbox className="size-4" />
          View all messages in inbox
        </button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="default" size="sm" onClick={handleSend} disabled={!messageText.trim()}>
            <Send className="size-3.5" />
            Send
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function TalentInterviewsView() {
  const upcoming = talentScheduledInterviews.filter((i) => i.status === 'upcoming')
  const completed = talentScheduledInterviews.filter((i) => i.status === 'completed')
  const showNotification = hasNewScheduledNotification || upcoming.length > 0
  const [selectedInterview, setSelectedInterview] = useState<ScheduledInterview | null>(null)
  const [interviewForReschedule, setInterviewForReschedule] = useState<ScheduledInterview | null>(null)
  const [showReschedule, setShowReschedule] = useState(false)
  const [messageRecipient, setMessageRecipient] = useState<{ name: string; role: string } | null>(null)
  const [showOfferLetter, setShowOfferLetter] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Notification when coordinator/manager/admin schedules an interview */}
      {showNotification && upcoming.length > 0 && (
        <div className="mb-4 flex-shrink-0 rounded-lg border border-[#6366f1]/30 bg-[#eef2ff] dark:bg-[#1e1e2e] dark:border-[#6366f1]/40 p-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6366f1]/20">
            <CalendarCheck className="size-5 text-[#6366f1]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">
              New interview scheduled
            </p>
            <p className="text-xs text-[#666] dark:text-[#aaa]">
              A coordinator or manager has scheduled an interview. See below for details.
            </p>
          </div>
        </div>
      )}

      {/* Scheduled interviews – compact cards */}
      <section className="mb-6 flex-shrink-0">
        <h3 className="text-sm font-medium text-[#666] dark:text-[#aaa] mb-3">
          {upcoming.length > 0 ? 'Upcoming interviews' : 'Your interviews'}
        </h3>
        {upcoming.length > 0 ? (
          <ul className="space-y-3">
            {upcoming.map((int) => (
              <li key={int.id}>
                <button
                  type="button"
                  onClick={() => setSelectedInterview(int)}
                  className="w-full text-left bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{int.type}</p>
                      <p className="text-xs text-[#666] dark:text-[#aaa]">
                        {int.date} at {int.time} · {int.platform}
                      </p>
                      <p className="text-xs text-[#666] dark:text-[#aaa] mt-1">
                        Interviewer: {int.interviewer}
                        {int.scheduledBy && ` · Scheduled by ${int.scheduledBy}`}
                      </p>
                    </div>
                    {int.meetingUrl && (
                      <a
                        href={int.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#6366f1] hover:underline shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Video className="size-3.5" />
                        Join meeting
                      </a>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            When a coordinator, manager, or admin schedules an interview, it will appear here and
            you’ll get a notification.
          </p>
        )}
      </section>

      {/* Past / completed interviews – compact list */}
      {completed.length > 0 && (
        <section className="mb-6 flex-shrink-0">
          <h3 className="text-sm font-medium text-[#666] dark:text-[#aaa] mb-3">
            Past interviews
          </h3>
          <ul className="space-y-2">
            {completed.map((int) => (
              <li key={int.id}>
                <button
                  type="button"
                  onClick={() => setSelectedInterview(int)}
                  className="w-full text-left bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] px-4 py-3 flex flex-wrap items-center justify-between gap-2 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                    <span className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">
                      {int.type}
                    </span>
                    <span className="text-xs text-[#666] dark:text-[#888]">
                      {int.date} · {int.interviewer}
                    </span>
                  </div>
                  {int.score != null && (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {int.score}%
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Offer status – one compact card (click to view offer letter) */}
      <section className="flex-shrink-0">
        <h3 className="text-sm font-medium text-[#666] dark:text-[#aaa] mb-3">Offer</h3>
        <button
          type="button"
          onClick={() => setShowOfferLetter(true)}
          className="w-full text-left bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] px-4 py-3 flex items-center justify-between gap-3 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
        >
          <div>
            <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">
              Congratulations — offer accepted
            </p>
            <p className="text-xs text-[#666] dark:text-[#aaa]">
              {talentOffer.date}. You can proceed to onboarding.
            </p>
          </div>
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium px-2 py-1 rounded shrink-0">
            Accepted
          </span>
        </button>
      </section>

      {/* Interview detail modal */}
      <TalentInterviewDetailModal
        interview={selectedInterview}
        onClose={() => setSelectedInterview(null)}
        onRequestReschedule={() => {
          setInterviewForReschedule(selectedInterview)
          setSelectedInterview(null)
          setShowReschedule(true)
        }}
        onMessageCoordinator={() => {
          setMessageRecipient({
            name: selectedInterview?.coordinatorName || 'Hiring Coordinator',
            role: 'Coordinator',
          })
          setSelectedInterview(null)
        }}
        onMessageInterviewer={() => {
          if (selectedInterview) {
            setMessageRecipient({ name: selectedInterview.interviewer, role: 'Interviewer' })
            setSelectedInterview(null)
          }
        }}
      />
      {showReschedule && (
        <RescheduleRequestModal
          interview={interviewForReschedule}
          onClose={() => {
            setShowReschedule(false)
            setInterviewForReschedule(null)
          }}
        />
      )}
      {messageRecipient && (
        <TalentComposeMessageModal
          recipientName={messageRecipient.name}
          recipientRole={messageRecipient.role}
          onClose={() => setMessageRecipient(null)}
        />
      )}

      <OfferLetterModal
        isOpen={showOfferLetter}
        onClose={() => setShowOfferLetter(false)}
        offer={talentOfferLetterData}
      />
    </div>
  )
}

export default function PipelinePage() {
  const router = useRouter()
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [messagingCandidate, setMessagingCandidate] = useState<Candidate | null>(null)
  const [schedulingCandidate, setSchedulingCandidate] = useState<Candidate | null>(null)
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
      <div className="flex flex-col min-h-full bg-[#f5f5f5] dark:bg-[#2a2a2a] p-8">
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            {isTalent ? (
              <CalendarCheck className="size-5 text-[#6366f1]" />
            ) : (
              <LayoutDashboard className="size-5 text-[#6366f1]" />
            )}
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">
              {isTalent ? 'Interviews' : 'Pipeline'}
            </h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            {isTalent
              ? 'Your interview progression and offer status'
              : 'Track candidates through hiring stages'}
          </p>
        </div>

        {isTalent ? (
          <TalentInterviewsView />
        ) : (
          <div className="flex-1 overflow-x-auto">
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
        )}
      </div>

      {!isTalent && (
        <>
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
        </>
      )}
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
