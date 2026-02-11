'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import { Mail, CheckCircle2, XCircle, Clock, RefreshCw, Filter, Download } from 'lucide-react'
import { InvitationStatus, UserRole } from '@prisma/client'

interface Invitation {
  id: string
  email: string
  role: UserRole
  status: InvitationStatus
  expiresAt: string
  acceptedAt: string | null
  createdAt: string
  inviter: {
    name: string | null
    email: string
  }
  invitee: {
    name: string | null
    email: string
  } | null
}

const statusLabels: Record<InvitationStatus, string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled',
}

const statusColors: Record<InvitationStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  ACCEPTED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  EXPIRED: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<InvitationStatus | 'ALL'>('ALL')
  const [orgId, setOrgId] = useState<string | null>(null)

  useEffect(() => {
    // TODO: Get organizationId from user context
    loadInvitations()
  }, [filter])

  const loadInvitations = async () => {
    try {
      // TODO: Get orgId from user context
      const response = await fetch(`/api/invitations?organizationId=${orgId || 'temp'}&pending=${filter === 'PENDING'}`)
      if (response.ok) {
        const data = await response.json()
        setInvitations(data)
      }
    } catch (error) {
      console.error('Error loading invitations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async (invitationId: string) => {
    try {
      const response = await fetch(`/api/invitations/${invitationId}/resend`, {
        method: 'POST',
      })

      if (response.ok) {
        alert('Invitation resent successfully')
        loadInvitations()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to resend invitation')
      }
    } catch (error) {
      alert('Failed to resend invitation')
    }
  }

  const filteredInvitations = filter === 'ALL' 
    ? invitations 
    : invitations.filter(inv => inv.status === filter)

  const pendingCount = invitations.filter(inv => inv.status === 'PENDING').length
  const acceptedCount = invitations.filter(inv => inv.status === 'ACCEPTED').length
  const expiredCount = invitations.filter(inv => inv.status === 'EXPIRED').length

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Invitations</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            Manage and track invitations sent to talent
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
            <div className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">
              {pendingCount}
            </div>
            <div className="text-xs text-[#666] dark:text-[#aaa] uppercase tracking-wide">
              Pending
            </div>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-1">
              {acceptedCount}
            </div>
            <div className="text-xs text-[#666] dark:text-[#aaa] uppercase tracking-wide">
              Accepted
            </div>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
            <div className="text-2xl font-semibold text-[#666] dark:text-[#aaa] mb-1">
              {expiredCount}
            </div>
            <div className="text-xs text-[#666] dark:text-[#aaa] uppercase tracking-wide">
              Expired
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filter === 'ALL'
                ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
            }`}
          >
            All ({invitations.length})
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filter === 'PENDING'
                ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('ACCEPTED')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filter === 'ACCEPTED'
                ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
            }`}
          >
            Accepted ({acceptedCount})
          </button>
          <button
            onClick={() => setFilter('EXPIRED')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filter === 'EXPIRED'
                ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
            }`}
          >
            Expired ({expiredCount})
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366f1]"></div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">
                    Invited By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvitations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#666] dark:text-[#aaa]">
                      No invitations found
                    </td>
                  </tr>
                ) : (
                  filteredInvitations.map((invitation) => (
                    <tr
                      key={invitation.id}
                      className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#111] dark:text-[#e5e5e5]">
                          {invitation.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded">
                          {invitation.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-[#666] dark:text-[#aaa]">
                          {invitation.inviter.name || invitation.inviter.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusColors[invitation.status]}`}
                        >
                          {invitation.status === 'PENDING' && <Clock className="size-3" />}
                          {invitation.status === 'ACCEPTED' && <CheckCircle2 className="size-3" />}
                          {invitation.status === 'EXPIRED' && <XCircle className="size-3" />}
                          {statusLabels[invitation.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-[#666] dark:text-[#aaa]">
                          {new Date(invitation.expiresAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {invitation.status === 'PENDING' && (
                          <button
                            onClick={() => handleResend(invitation.id)}
                            className="text-xs text-[#6366f1] hover:underline flex items-center gap-1"
                          >
                            <RefreshCw className="size-3" />
                            Resend
                          </button>
                        )}
                        {invitation.status === 'ACCEPTED' && invitation.invitee && (
                          <div className="text-xs text-[#666] dark:text-[#aaa]">
                            Accepted by {invitation.invitee.name || invitation.invitee.email}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
