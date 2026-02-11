import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down'
  icon?: LucideIcon
  iconColor?: string
  className?: string
}

export function MetricCard({ title, value, change, trend, icon: Icon, iconColor = '#eb3a14', className }: MetricCardProps) {
  return (
    <div className={`bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-5 ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] text-[#999] dark:text-[#888] font-medium tracking-wide uppercase">
          {title}
        </span>
        {Icon && <Icon className="size-4" style={{ color: iconColor }} />}
      </div>
      <div className="text-2xl font-semibold text-[#030213] dark:text-[#fafafa] mb-1">{value}</div>
      {change && (
        <div className={`text-[10px] font-medium ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`}>
          {change}
        </div>
      )}
    </div>
  )
}
