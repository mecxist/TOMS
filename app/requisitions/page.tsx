'use client'

// Ensure fresh render - no static cache
import Link from 'next/link'
import { AppLayout } from '@/components/shared/app-layout'
import { useState } from 'react'
import { FileSearch, Filter, Plus, CheckCircle2, Clock, XCircle, ChevronRight } from 'lucide-react'
import { REQUISITIONS, getCandidateCountForRequisition } from '@/lib/mock-requisitions'

interface Requisition {
  id: string
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract'
  status: 'open' | 'filled' | 'closed' | 'on-hold'
  candidates: number
  createdDate: string
  priority: 'high' | 'medium' | 'low'
}

export default function RequisitionsPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'open' | 'filled' | 'closed' | 'on-hold'>('all')
  const [selectedRequisitions, setSelectedRequisitions] = useState<Set<string>>(new Set())

  const requisitions: Requisition[] = Object.values(REQUISITIONS).map((req) => ({
    id: req.id,
    title: req.title,
    department: req.department,
    location: req.location,
    type: req.type as 'full-time' | 'part-time' | 'contract',
    status: req.status as 'open' | 'filled' | 'closed' | 'on-hold',
    candidates: getCandidateCountForRequisition(req.id),
    createdDate: req.createdDate,
    priority: req.priority,
  }))

  const filteredRequisitions = requisitions.filter((req) => {
    if (selectedTab === 'all') return true
    return req.status === selectedTab
  })

  const toggleRequisition = (id: string) => {
    const newSelected = new Set(selectedRequisitions)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRequisitions(newSelected)
  }

  const toggleAll = () => {
    if (selectedRequisitions.size === filteredRequisitions.length) {
      setSelectedRequisitions(new Set())
    } else {
      setSelectedRequisitions(new Set(filteredRequisitions.map(req => req.id)))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#dbeafe] dark:bg-blue-900/30 text-[#2563eb] dark:text-blue-400 rounded text-xs font-medium">
            <Clock className="size-3" />
            Open
          </span>
        )
      case 'filled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#d1fae5] dark:bg-green-900/30 text-[#059669] dark:text-green-400 rounded text-xs font-medium">
            <CheckCircle2 className="size-3" />
            Filled
          </span>
        )
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded text-xs font-medium">
            <XCircle className="size-3" />
            Closed
          </span>
        )
      case 'on-hold':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#fef3c7] dark:bg-yellow-900/30 text-[#d97706] dark:text-yellow-400 rounded text-xs font-medium">
            <Clock className="size-3" />
            On Hold
          </span>
        )
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 bg-[#fee2e2] dark:bg-red-900/30 text-[#dc2626] dark:text-red-400 rounded text-[10px] font-medium">
            High
          </span>
        )
      case 'medium':
        return (
          <span className="px-2 py-0.5 bg-[#fef3c7] dark:bg-yellow-900/30 text-[#d97706] dark:text-yellow-400 rounded text-[10px] font-medium">
            Medium
          </span>
        )
      case 'low':
        return (
          <span className="px-2 py-0.5 bg-[#e0e7ff] dark:bg-blue-900/30 text-[#6366f1] dark:text-blue-400 rounded text-[10px] font-medium">
            Low
          </span>
        )
    }
  }

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FileSearch className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Job Requisitions</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Create and manage job requisitions</p>
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
                All ({requisitions.length})
              </button>
              <button
                onClick={() => setSelectedTab('open')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'open'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Open ({requisitions.filter(r => r.status === 'open').length})
              </button>
              <button
                onClick={() => setSelectedTab('filled')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'filled'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Filled ({requisitions.filter(r => r.status === 'filled').length})
              </button>
              <button
                onClick={() => setSelectedTab('closed')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'closed'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                Closed ({requisitions.filter(r => r.status === 'closed').length})
              </button>
              <button
                onClick={() => setSelectedTab('on-hold')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedTab === 'on-hold'
                    ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                    : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                }`}
              >
                On Hold ({requisitions.filter(r => r.status === 'on-hold').length})
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-md text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors flex items-center gap-2">
              <Plus className="size-3.5" />
              New Requisition
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
                    checked={selectedRequisitions.size === filteredRequisitions.length && filteredRequisitions.length > 0}
                    onChange={toggleAll}
                    className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Candidates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#666] dark:text-[#888]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequisitions.map((requisition) => (
                <tr
                  key={requisition.id}
                  className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRequisitions.has(requisition.id)}
                      onChange={() => toggleRequisition(requisition.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/requisitions/${requisition.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#111] dark:text-[#e5e5e5] hover:text-[#6366f1] transition-colors"
                    >
                      {requisition.title}
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{requisition.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{requisition.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-[#666] dark:text-[#aaa] capitalize">{requisition.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{requisition.candidates}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-[#666] dark:text-[#aaa]">{requisition.createdDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getPriorityBadge(requisition.priority)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(requisition.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/requisitions/${requisition.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#6366f1] hover:underline"
                    >
                      View candidates <ChevronRight className="size-3" />
                    </Link>
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
