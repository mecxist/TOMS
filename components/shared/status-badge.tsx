import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected' | 'completed' | 'in-progress' | 'todo' | 'available' | 'partial' | 'unavailable'
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    approved: {
      bg: 'bg-[#d1fae5] dark:bg-green-900/30',
      text: 'text-[#059669] dark:text-green-400',
      icon: CheckCircle2,
      label: 'Approved',
    },
    pending: {
      bg: 'bg-[#fef3c7] dark:bg-yellow-900/30',
      text: 'text-[#d97706] dark:text-yellow-400',
      icon: Clock,
      label: 'Pending',
    },
    rejected: {
      bg: 'bg-[#fee2e2] dark:bg-red-900/30',
      text: 'text-[#dc2626] dark:text-red-400',
      icon: AlertCircle,
      label: 'Rejected',
    },
    completed: {
      bg: 'bg-[#d1fae5] dark:bg-green-900/30',
      text: 'text-[#059669] dark:text-green-400',
      icon: CheckCircle2,
      label: 'Completed',
    },
    'in-progress': {
      bg: 'bg-[#dbeafe] dark:bg-blue-900/30',
      text: 'text-[#2563eb] dark:text-blue-400',
      icon: Clock,
      label: 'In Progress',
    },
    todo: {
      bg: 'bg-[#ececf0] dark:bg-[#27272a]',
      text: 'text-[#717182] dark:text-[#a1a1aa]',
      icon: AlertCircle,
      label: 'To Do',
    },
    available: {
      bg: 'bg-[#d1fae5] dark:bg-green-900/30',
      text: 'text-[#059669] dark:text-green-400',
      icon: CheckCircle2,
      label: 'Available',
    },
    partial: {
      bg: 'bg-[#fef3c7] dark:bg-yellow-900/30',
      text: 'text-[#d97706] dark:text-yellow-400',
      icon: AlertCircle,
      label: 'Partial',
    },
    unavailable: {
      bg: 'bg-[#fee2e2] dark:bg-red-900/30',
      text: 'text-[#dc2626] dark:text-red-400',
      icon: AlertCircle,
      label: 'Full',
    },
  }

  const variant = variants[status]
  const Icon = variant.icon

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium', variant.bg, variant.text, className)}>
      <Icon className="size-3" />
      {variant.label}
    </span>
  )
}
