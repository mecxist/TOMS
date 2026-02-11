'use client'

import { useState } from 'react'
import { Modal } from '@/components/shared/modal'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar, MessageSquare as MessageIcon, Send, Paperclip, Video, CheckCircle2, XCircle, Clock } from 'lucide-react'

/** Candidate shape used by pipeline and offers for the detail/message/schedule modals */
export interface PipelineCandidate {
  id: string
  code: string
  name: string
  role: string
  initials: string
  avatarColor: string
  tags: string[]
  time?: string
  badge?: { text: string; color: 'red' | 'green' | 'blue' | 'gray' }
}

interface Message {
  id: string
  text: string
  sender: 'me' | 'them'
  time: string
}

export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'expired'

export function CandidateDetailModal({
  candidate,
  stageName,
  offerStatus = null,
  onClose,
  onMessage,
  onSchedule,
  onViewApplication,
}: {
  candidate: PipelineCandidate | null
  stageName: string | null
  /** When set (e.g. from offers page), show color-coded offer status badge */
  offerStatus?: OfferStatus | null
  onClose: () => void
  onMessage: (candidate: PipelineCandidate) => void
  onSchedule: (candidate: PipelineCandidate) => void
  onViewApplication: (candidate: PipelineCandidate) => void
}) {
  if (!candidate) return null

  const getOfferStatusBadge = () => {
    if (!offerStatus) return null
    switch (offerStatus) {
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
      default:
        return null
    }
  }

  const getBadgeStyles = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-[#ef4444] bg-[#fef2f2] dark:bg-red-900/20'
      case 'green':
        return 'text-[#10b981] bg-[#d1fae5] dark:bg-green-900/30'
      case 'blue':
        return 'text-[#3b82f6] bg-[#dbeafe] dark:bg-blue-900/30'
      default:
        return 'text-[#666] bg-[#ececf0] dark:bg-[#27272a]'
    }
  }

  return (
    <Modal
      isOpen={!!candidate}
      onClose={onClose}
      title={candidate.name}
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onMessage(candidate)}>
              <MessageIcon className="size-3.5" />
              Message
            </Button>
            <Button variant="outline" size="sm" onClick={() => onSchedule(candidate)}>
              <Calendar className="size-3.5" />
              Schedule
            </Button>
            <Button variant="default" size="sm" onClick={() => onViewApplication(candidate)}>
              <ExternalLink className="size-3.5" />
              View application
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <div
            className="size-14 rounded-full flex items-center justify-center text-lg font-medium text-white shrink-0"
            style={{ backgroundColor: candidate.avatarColor }}
          >
            {candidate.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">{candidate.name}</h3>
              <span className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase bg-[#ececf0] dark:bg-[#27272a] px-2 py-0.5 rounded">
                {candidate.code}
              </span>
            </div>
            <p className="text-sm text-[#666] dark:text-[#aaa] mt-0.5">{candidate.role}</p>
            {stageName && (
              <p className="text-xs text-[#666] dark:text-[#888] mt-1">
                Stage: <span className="font-medium text-[#111] dark:text-[#e5e5e5]">{stageName}</span>
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {getOfferStatusBadge()}
              {candidate.badge && (
                <span
                  className={`text-[10px] font-medium flex items-center gap-1 px-2 py-1 rounded ${getBadgeStyles(candidate.badge.color)}`}
                >
                  {candidate.badge.color === 'red' && <span className="text-[#ef4444]">★</span>}
                  {candidate.badge.color === 'green' && <span>📅</span>}
                  {candidate.badge.text}
                </span>
              )}
              {candidate.time && (
                <span className="text-xs text-[#666] dark:text-[#888]">Last activity: {candidate.time}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs font-medium px-2 py-1 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-2">
            Recent activity
          </h4>
          <div className="rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] bg-[#fafafa] dark:bg-[#27272a] p-3 text-sm text-[#666] dark:text-[#888]">
            Moved to {stageName ?? 'this stage'} · {candidate.time ?? 'Recently'}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export function MessageModal({
  candidate,
  onClose,
}: {
  candidate: PipelineCandidate | null
  onClose: () => void
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! Thanks for applying. We were really impressed with your background.',
      sender: 'me',
      time: '10:30 AM',
    },
    {
      id: '2',
      text: "Thank you! I'm very excited about the opportunity. Looking forward to learning more about the role.",
      sender: 'them',
      time: '10:45 AM',
    },
    {
      id: '3',
      text: "Great to hear! We'd love to schedule a quick intro call. Are you available this week?",
      sender: 'me',
      time: '11:02 AM',
    },
  ])
  const [messageText, setMessageText] = useState('')

  if (!candidate) return null

  const handleSend = () => {
    if (!messageText.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        text: messageText.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setMessageText('')
  }

  return (
    <Modal isOpen={!!candidate} onClose={onClose} title={`Message ${candidate.name}`} size="lg">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <div
          className="size-9 rounded-full flex items-center justify-center text-xs font-medium text-white"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.name}</p>
          <p className="text-xs text-[#666] dark:text-[#aaa]">{candidate.role}</p>
        </div>
      </div>

      <div className="h-72 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] rounded-xl px-3.5 py-2.5 ${
                msg.sender === 'me'
                  ? 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
                  : 'bg-[#ececf0] dark:bg-[#27272a] text-[#111] dark:text-[#e5e5e5]'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p
                className={`text-[10px] mt-1 ${
                  msg.sender === 'me' ? 'text-white/60 dark:text-[#111]/60' : 'text-[#666] dark:text-[#888]'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2 border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] pt-4">
        <button type="button" className="p-2 text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors">
          <Paperclip className="size-4" />
        </button>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#eb3a14] focus:border-transparent"
        />
        <Button variant="accent" size="sm" onClick={handleSend} disabled={!messageText.trim()}>
          <Send className="size-3.5" />
          Send
        </Button>
      </div>
    </Modal>
  )
}

export function ScheduleModal({
  candidate,
  onClose,
  onViewInterviews,
}: {
  candidate: PipelineCandidate | null
  onClose: () => void
  onViewInterviews?: () => void
}) {
  if (!candidate) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  const labelClass = 'block text-xs font-medium text-[#666] dark:text-[#888] mb-1.5'
  const inputClass =
    'w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#eb3a14] focus:border-transparent'

  return (
    <Modal
      isOpen={!!candidate}
      onClose={onClose}
      title="Schedule Interview"
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full flex-wrap gap-2">
          {onViewInterviews && (
            <button
              type="button"
              onClick={onViewInterviews}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6366f1] hover:underline"
            >
              <Video className="size-3.5" />
              View all interviews
            </button>
          )}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" size="sm" type="submit" form="schedule-form-shared">
              Schedule Interview
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <div
          className="size-9 rounded-full flex items-center justify-center text-xs font-medium text-white"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.name}</p>
          <span className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase">{candidate.code}</span>
        </div>
      </div>

      {onViewInterviews && (
        <div className="mb-5">
          <button
            type="button"
            onClick={onViewInterviews}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f5f5] dark:bg-[#27272a] text-sm font-medium text-[#6366f1] hover:bg-[#ececf0] dark:hover:bg-[#333] transition-colors"
          >
            <Video className="size-4" />
            View all scheduled interviews
          </button>
        </div>
      )}

      <form id="schedule-form-shared" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Interview Type</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select type</option>
              <option>Technical Screen</option>
              <option>System Design</option>
              <option>Culture Fit</option>
              <option>Final Round</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Platform</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select platform</option>
              <option>Google Meet</option>
              <option>Zoom</option>
              <option>Microsoft Teams</option>
              <option>In-Office</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Start Time</label>
            <input type="time" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Duration</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select duration</option>
              <option>30 min</option>
              <option>45 min</option>
              <option>1 hour</option>
              <option>1.5 hours</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Interviewer</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select interviewer</option>
              <option>Rachel Adams</option>
              <option>Marcus Johnson</option>
              <option>Priya Patel</option>
              <option>Jordan Kim</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Notes (optional)</label>
          <textarea
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Add any notes for the interview..."
          />
        </div>
      </form>
    </Modal>
  )
}
