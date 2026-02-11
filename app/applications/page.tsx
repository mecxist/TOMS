'use client'

// Ensure fresh render - no static cache
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/shared/app-layout'
import { useState } from 'react'
import { Filter, ChevronDown, MoreHorizontal, CheckCircle2, Clock, XCircle, ExternalLink, FileText } from 'lucide-react'

interface Application {
  id: string
  candidate: {
    name: string
    email: string
    avatar: string
    avatarColor: string
  }
  role: string
  applied: {
    date: string
    time: string
  }
  tags: Array<{
    label: string
    color: string
  }>
  status: string
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Reviewing':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <Clock className="size-3" />
          {status}
        </span>
      )
    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
          <XCircle className="size-3" />
          {status}
        </span>
      )
    case 'Offer Sent':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="size-3" />
          {status}
        </span>
      )
    case 'Shortlisted':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Clock className="size-3" />
          {status}
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
          {status}
        </span>
      )
  }
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread' | 'archived'>('all')
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set())

  const openApplication = (e: React.MouseEvent, applicationId: string) => {
    const target = e.target as HTMLElement
    if (target.closest('input[type="checkbox"]') || target.closest('button')) return
    router.push(`/applications/${applicationId}`)
  }

  const applications: Application[] = [
    {
      id: '1',
      candidate: {
        name: 'Alex K.',
        email: 'alex.k@mail.com',
        avatar: 'AK',
        avatarColor: '#9ca3af',
      },
      role: 'Senior Frontend Engineer',
      applied: {
        date: 'Oct 24',
        time: '10:30 AM',
      },
      tags: [
        { label: 'React', color: '#3b82f6' },
        { label: 'Senior', color: '#6b7280' },
      ],
      status: 'Reviewing',
    },
    {
      id: '2',
      candidate: {
        name: 'Maria R.',
        email: 'maria@email.co',
        avatar: 'MR',
        avatarColor: '#a78bfa',
      },
      role: 'Product Designer',
      applied: {
        date: 'Oct 23',
        time: '02:15 PM',
      },
      tags: [
        { label: 'Figma', color: '#8b5cf6' },
      ],
      status: 'Rejected',
    },
    {
      id: '3',
      candidate: {
        name: 'John L.',
        email: 'john.l@acme.co',
        avatar: 'JL',
        avatarColor: '#34d399',
      },
      role: 'Backend Engineer',
      applied: {
        date: 'Oct 22',
        time: '09:00 AM',
      },
      tags: [
        { label: 'Node', color: '#10b981' },
      ],
      status: 'Offer Sent',
    },
  ]

  const toggleApplication = (id: string) => {
    const newSelected = new Set(selectedApplications)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedApplications(newSelected)
  }

  const toggleAll = () => {
    if (selectedApplications.size === applications.length) {
      setSelectedApplications(new Set())
    } else {
      setSelectedApplications(new Set(applications.map(app => app.id)))
    }
  }

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Applications</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Review and manage candidate applications</p>
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
                All
              </button>
              <button
                onClick={() => setSelectedTab('unread')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'unread'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setSelectedTab('archived')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'archived'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Archived
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666] dark:text-[#aaa]">Sort by:</span>
            <button className="px-3 py-1.5 bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] rounded-md flex items-center gap-2 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              <span className="text-xs text-[#111] dark:text-[#e5e5e5]">Date Applied</span>
              <ChevronDown className="size-3.5 text-[#666] dark:text-[#aaa]" />
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
                    checked={selectedApplications.size === applications.length}
                    onChange={toggleAll}
                    className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#666] dark:text-[#888]">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr
                  key={application.id}
                  onClick={(e) => openApplication(e, application.id)}
                  className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedApplications.has(application.id)}
                      onChange={() => toggleApplication(application.id)}
                      className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/applications/${application.id}`}
                      className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                    >
                      <div
                        className="size-8 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                        style={{ backgroundColor: application.candidate.avatarColor }}
                      >
                        {application.candidate.avatar}
                      </div>
                      <div>
                        <div className="text-sm text-[#111] dark:text-[#e5e5e5] font-medium">
                          {application.candidate.name}
                        </div>
                        <div className="text-xs text-[#666] dark:text-[#aaa]">
                          {application.candidate.email}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{application.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-[#666] dark:text-[#aaa]">
                      {application.applied.date}, {application.applied.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {application.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded text-[10px] font-medium"
                          style={{
                            color: tag.color,
                            backgroundColor: `${tag.color}15`,
                          }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/applications/${application.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#6366f1] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View <ExternalLink className="size-3" />
                      </Link>
                      <button
                        type="button"
                        className="p-1 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors"
                        aria-label="More actions"
                      >
                        <MoreHorizontal className="size-4 text-[#666] dark:text-[#aaa]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
