'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import { Inbox, Mail, Send, Search, Filter, CheckCircle2, Clock, AlertCircle, User, ChevronRight } from 'lucide-react'

// --- Types ---

type MessageStatus = 'unread' | 'read' | 'archived'
type MessageType = 'interview' | 'assignment' | 'onboarding' | 'general' | 'system'

interface Message {
  id: string
  from: {
    name: string
    email: string
    avatar?: string
    avatarColor: string
    role: string
  }
  subject: string
  preview: string
  body: string
  status: MessageStatus
  type: MessageType
  sentAt: string
  readAt?: string
  relatedTo?: {
    type: string
    id: string
    label: string
  }
}

// --- Talent View: Personal Messages ---

function TalentMessagesView() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  // Mock data - in production, fetch from API
  const [messages] = useState<Message[]>([
    {
      id: '1',
      from: {
        name: 'Sarah Coordinator',
        email: 'sarah@example.com',
        avatarColor: '#a855f7',
        role: 'Coordinator',
      },
      subject: 'Interview Scheduled - Technical Assessment',
      preview: 'Your technical interview has been scheduled for tomorrow at 2:00 PM...',
      body: 'Hi,\n\nYour technical interview has been scheduled for tomorrow, January 20th at 2:00 PM via Google Meet.\n\nPlease join using this link: https://meet.google.com/abc-defg-hij\n\nLooking forward to speaking with you!\n\nBest regards,\nSarah',
      status: 'unread',
      type: 'interview',
      sentAt: '2024-01-19T10:30:00Z',
      relatedTo: {
        type: 'interview',
        id: 'int-1',
        label: 'View Interview',
      },
    },
    {
      id: '2',
      from: {
        name: 'John Manager',
        email: 'john@example.com',
        avatarColor: '#60a5fa',
        role: 'Manager',
      },
      subject: 'Welcome to the Team!',
      preview: 'Congratulations on joining our team. Here are some important next steps...',
      body: 'Welcome to the team!\n\nWe\'re excited to have you on board. Please complete your onboarding tasks and skill assessments.\n\nIf you have any questions, feel free to reach out.\n\nBest,\nJohn',
      status: 'read',
      type: 'onboarding',
      sentAt: '2024-01-18T14:00:00Z',
      readAt: '2024-01-18T15:30:00Z',
      relatedTo: {
        type: 'onboarding',
        id: 'onboard-1',
        label: 'View Onboarding',
      },
    },
    {
      id: '3',
      from: {
        name: 'System',
        email: 'system@toms.com',
        avatarColor: '#9ca3af',
        role: 'System',
      },
      subject: 'Skill Assessment Assigned',
      preview: 'A new skill assessment has been assigned to you...',
      body: 'A new skill assessment for React has been assigned to you. Please complete it at your earliest convenience.\n\nYou can access it from your Skill Assessments page.',
      status: 'unread',
      type: 'system',
      sentAt: '2024-01-19T09:00:00Z',
      relatedTo: {
        type: 'skill-assessment',
        id: 'sa-1',
        label: 'View Assessment',
      },
    },
    {
      id: '4',
      from: {
        name: 'Maria Coordinator',
        email: 'maria@example.com',
        avatarColor: '#34d399',
        role: 'Coordinator',
      },
      subject: 'Project Assignment - Frontend Development',
      preview: 'You\'ve been assigned to a new project. Check your assignments page for details...',
      body: 'Hi,\n\nYou\'ve been assigned to work on the Frontend Development project starting next week.\n\nPlease review the project details and confirm your availability.\n\nThanks,\nMaria',
      status: 'read',
      type: 'assignment',
      sentAt: '2024-01-17T16:00:00Z',
      readAt: '2024-01-17T17:00:00Z',
      relatedTo: {
        type: 'assignment',
        id: 'assign-1',
        label: 'View Assignment',
      },
    },
  ])

  useEffect(() => {
    setMounted(true)
    if (messages.length > 0 && !selectedMessage) {
      setSelectedMessage(messages[0])
    }
  }, [])

  if (!mounted) return null

  const filteredMessages = messages.filter(msg => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && msg.status === 'unread') ||
      (filter === 'read' && msg.status === 'read') ||
      (filter === 'archived' && msg.status === 'archived')
    const matchesSearch =
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.from.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = messages.filter(m => m.status === 'unread').length

  function getTypeBadge(type: MessageType) {
    const badges: Record<MessageType, { label: string; color: string }> = {
      interview: { label: 'Interview', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      assignment: { label: 'Assignment', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
      onboarding: { label: 'Onboarding', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      general: { label: 'General', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      system: { label: 'System', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    }
    const badge = badges[type]
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${badge.color}`}>
        {badge.label}
      </span>
    )
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Message List */}
      <div className="w-96 flex-shrink-0 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#666] dark:text-[#aaa]" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] dark:placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 text-[10px] rounded transition-colors ${
                filter === 'all'
                  ? 'bg-[#6366f1] text-white'
                  : 'text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2 py-1 text-[10px] rounded transition-colors ${
                filter === 'unread'
                  ? 'bg-[#6366f1] text-white'
                  : 'text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              Unread ({messages.filter(m => m.status === 'unread').length})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-2 py-1 text-[10px] rounded transition-colors ${
                filter === 'read'
                  ? 'bg-[#6366f1] text-white'
                  : 'text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              Read
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length > 0 ? (
            <div className="divide-y divide-[rgba(0,0,0,0.05)] dark:divide-[rgba(255,255,255,0.1)]">
              {filteredMessages.map(message => {
                const isSelected = selectedMessage?.id === message.id
                return (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full text-left p-4 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors ${
                      isSelected ? 'bg-[rgba(99,102,241,0.1)] dark:bg-[rgba(99,102,241,0.2)]' : ''
                    } ${message.status === 'unread' ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                        style={{ backgroundColor: message.from.avatarColor }}
                      >
                        {message.from.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5] truncate">
                            {message.from.name}
                          </span>
                          {message.status === 'unread' && (
                            <div className="size-2 rounded-full bg-[#6366f1] shrink-0" />
                          )}
                        </div>
                        <div className="text-xs font-medium text-[#111] dark:text-[#e5e5e5] mb-1 truncate">
                          {message.subject}
                        </div>
                        <div className="text-[10px] text-[#666] dark:text-[#aaa] line-clamp-2 mb-1">
                          {message.preview}
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(message.type)}
                          <span className="text-[10px] text-[#999] dark:text-[#666]">
                            {formatDate(message.sentAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-[#666] dark:text-[#aaa]">
              No messages found
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Message Detail */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] ml-6">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
              <div className="flex items-start gap-4">
                <div
                  className="size-12 rounded-full flex items-center justify-center text-sm font-medium text-white shrink-0"
                  style={{ backgroundColor: selectedMessage.from.avatarColor }}
                >
                  {selectedMessage.from.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">
                      {selectedMessage.from.name}
                    </span>
                    <span className="text-xs text-[#666] dark:text-[#aaa]">({selectedMessage.from.role})</span>
                    {getTypeBadge(selectedMessage.type)}
                  </div>
                  <div className="text-xs text-[#999] dark:text-[#666] mb-2">{selectedMessage.from.email}</div>
                  <h3 className="text-base font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
                    {selectedMessage.subject}
                  </h3>
                  <div className="text-xs text-[#666] dark:text-[#aaa]">
                    {formatDate(selectedMessage.sentAt)}
                    {selectedMessage.readAt && ` · Read ${formatDate(selectedMessage.readAt)}`}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-[#111] dark:text-[#e5e5e5] leading-relaxed">
                    {selectedMessage.body}
                  </div>
                </div>

                {selectedMessage.relatedTo && (
                  <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
                    <a
                      href={`/${selectedMessage.relatedTo.type === 'skill-assessment' ? 'skill-assessments' : selectedMessage.relatedTo.type}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#6366f1] text-white rounded-md hover:bg-[#5856eb] transition-colors"
                    >
                      {selectedMessage.relatedTo.label}
                      <ChevronRight className="size-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-[#666] dark:text-[#aaa]">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  )
}

// --- Admin/Manager/Coordinator View: All Messages ---

function AdminMessagesView() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  // Mock data - in production, fetch from API
  const [messages] = useState<Message[]>([
    {
      id: '1',
      from: {
        name: 'Alex K.',
        email: 'alex@example.com',
        avatarColor: '#9ca3af',
        role: 'Talent',
      },
      subject: 'Question about assignment',
      preview: 'Hi, I have a question about my current assignment...',
      body: 'Hi,\n\nI have a question about my current assignment. Could you clarify the requirements?\n\nThanks,\nAlex',
      status: 'unread',
      type: 'general',
      sentAt: '2024-01-19T11:00:00Z',
    },
    {
      id: '2',
      from: {
        name: 'Sarah K.',
        email: 'sarah@example.com',
        avatarColor: '#a855f7',
        role: 'Talent',
      },
      subject: 'Onboarding question',
      preview: 'I need help with completing my onboarding tasks...',
      body: 'Hi,\n\nI need help with completing my onboarding tasks. Can someone assist me?\n\nThanks,\nSarah',
      status: 'read',
      type: 'onboarding',
      sentAt: '2024-01-18T15:00:00Z',
      readAt: '2024-01-18T16:00:00Z',
    },
  ])

  useEffect(() => {
    setMounted(true)
    if (messages.length > 0 && !selectedMessage) {
      setSelectedMessage(messages[0])
    }
  }, [])

  const filteredMessages = messages.filter(msg => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && msg.status === 'unread') ||
      (filter === 'read' && msg.status === 'read') ||
      (filter === 'archived' && msg.status === 'archived')
    const matchesSearch =
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.from.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = messages.filter(m => m.status === 'unread').length

  function getTypeBadge(type: MessageType) {
    const badges: Record<MessageType, { label: string; color: string }> = {
      interview: { label: 'Interview', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      assignment: { label: 'Assignment', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
      onboarding: { label: 'Onboarding', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      general: { label: 'General', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
      system: { label: 'System', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    }
    const badge = badges[type]
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${badge.color}`}>
        {badge.label}
      </span>
    )
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Message List */}
      <div className="w-96 flex-shrink-0 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#666] dark:text-[#aaa]" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] dark:placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 text-[10px] rounded transition-colors ${
                filter === 'all'
                  ? 'bg-[#6366f1] text-white'
                  : 'text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2 py-1 text-[10px] rounded transition-colors ${
                filter === 'unread'
                  ? 'bg-[#6366f1] text-white'
                  : 'text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              Unread ({messages.filter(m => m.status === 'unread').length})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-2 py-1 text-[10px] rounded transition-colors ${
                filter === 'read'
                  ? 'bg-[#6366f1] text-white'
                  : 'text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              Read
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length > 0 ? (
            <div className="divide-y divide-[rgba(0,0,0,0.05)] dark:divide-[rgba(255,255,255,0.1)]">
              {filteredMessages.map(message => {
                const isSelected = selectedMessage?.id === message.id
                return (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full text-left p-4 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors ${
                      isSelected ? 'bg-[rgba(99,102,241,0.1)] dark:bg-[rgba(99,102,241,0.2)]' : ''
                    } ${message.status === 'unread' ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                        style={{ backgroundColor: message.from.avatarColor }}
                      >
                        {message.from.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5] truncate">
                            {message.from.name}
                          </span>
                          {message.status === 'unread' && (
                            <div className="size-2 rounded-full bg-[#6366f1] shrink-0" />
                          )}
                        </div>
                        <div className="text-xs font-medium text-[#111] dark:text-[#e5e5e5] mb-1 truncate">
                          {message.subject}
                        </div>
                        <div className="text-[10px] text-[#666] dark:text-[#aaa] line-clamp-2 mb-1">
                          {message.preview}
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(message.type)}
                          <span className="text-[10px] text-[#999] dark:text-[#666]">
                            {formatDate(message.sentAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-[#666] dark:text-[#aaa]">No messages found</div>
          )}
        </div>
      </div>

      {/* Right Panel - Message Detail */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] ml-6">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
              <div className="flex items-start gap-4">
                <div
                  className="size-12 rounded-full flex items-center justify-center text-sm font-medium text-white shrink-0"
                  style={{ backgroundColor: selectedMessage.from.avatarColor }}
                >
                  {selectedMessage.from.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">
                      {selectedMessage.from.name}
                    </span>
                    <span className="text-xs text-[#666] dark:text-[#aaa]">({selectedMessage.from.role})</span>
                    {getTypeBadge(selectedMessage.type)}
                  </div>
                  <div className="text-xs text-[#999] dark:text-[#666] mb-2">{selectedMessage.from.email}</div>
                  <h3 className="text-base font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
                    {selectedMessage.subject}
                  </h3>
                  <div className="text-xs text-[#666] dark:text-[#aaa]">
                    {formatDate(selectedMessage.sentAt)}
                    {selectedMessage.readAt && ` · Read ${formatDate(selectedMessage.readAt)}`}
                  </div>
                </div>
                <button className="px-4 py-2 text-xs font-medium bg-[#6366f1] text-white rounded-md hover:bg-[#5856eb] transition-colors">
                  Reply
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-[#111] dark:text-[#e5e5e5] leading-relaxed">
                    {selectedMessage.body}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-[#666] dark:text-[#aaa]">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  )
}

// --- Main Page ---

export default function MessagesPage() {
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
      <div className="flex flex-col h-full bg-[#f5f5f5] dark:bg-[#2a2a2a] p-8">
        {/* Header */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Inbox className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Messages</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            {isTalent
              ? 'View and manage your messages'
              : 'View and manage all messages'}
          </p>
        </div>

        {/* Messages Content */}
        <div className="flex-1 min-h-0">
          {isTalent ? <TalentMessagesView /> : <AdminMessagesView />}
        </div>
      </div>
    </AppLayout>
  )
}
