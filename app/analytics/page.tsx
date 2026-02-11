'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { TrendingUp, TrendingDown, Users, Briefcase, Clock, DollarSign } from 'lucide-react'

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'TOTAL CANDIDATES',
      value: '1,247',
      change: '+12.5% this month',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'ACTIVE POSITIONS',
      value: '23',
      change: '+3 new',
      trend: 'up',
      icon: Briefcase,
    },
    {
      title: 'AVG. TIME TO HIRE',
      value: '18 days',
      change: '-2 days',
      trend: 'down',
      icon: Clock,
    },
    {
      title: 'COST PER HIRE',
      value: '$3,240',
      change: '-8.3%',
      trend: 'down',
      icon: DollarSign,
    },
  ]

  const pipelineStats = [
    { stage: 'Applied', count: 456, percentage: 100, color: '#3b82f6' },
    { stage: 'Screening', count: 234, percentage: 51, color: '#8b5cf6' },
    { stage: 'Interview', count: 89, percentage: 19, color: '#a855f7' },
    { stage: 'Offer', count: 23, percentage: 5, color: '#10b981' },
    { stage: 'Hired', count: 12, percentage: 3, color: '#6ee7b7' },
  ]

  const recentActivity = [
    { name: 'Sarah Chen', action: 'Moved to Interview', time: '2h ago', initials: 'SC' },
    { name: 'James Wilson', action: 'Offer Accepted', time: '4h ago', initials: 'JW' },
    { name: 'Emma Davis', action: 'Screening Completed', time: '5h ago', initials: 'ED' },
    { name: 'Michael Brown', action: 'Application Received', time: '6h ago', initials: 'MB' },
  ]

  const topSources = [
    { source: 'LinkedIn', count: 342, percentage: 45 },
    { source: 'Indeed', count: 234, percentage: 31 },
    { source: 'Referrals', count: 112, percentage: 15 },
    { source: 'Career Site', count: 68, percentage: 9 },
  ]

  return (
    <AppLayout>
      <div className="p-8 space-y-6 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Analytics</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Hiring metrics and pipeline insights</p>
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] text-[#666] dark:text-[#888] font-medium tracking-wide uppercase">
                    {metric.title}
                  </span>
                  <Icon className="size-4 text-[#eb3a14]" />
                </div>
                <div className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">{metric.value}</div>
                <div
                  className={`text-[10px] font-medium ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  {metric.change}
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Pipeline Funnel */}
          <div className="col-span-2 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <h3 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-5">Pipeline Funnel</h3>
            <div className="space-y-5">
              {pipelineStats.map((stage, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5] font-medium">{stage.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#666] dark:text-[#888]">{stage.percentage}%</span>
                      <span className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">{stage.count}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${stage.percentage}%`,
                        background:
                          index === 0
                            ? 'linear-gradient(90deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)'
                            : index === 1
                            ? 'linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #8b5cf6 100%)'
                            : index === 2
                            ? 'linear-gradient(90deg, #d8b4fe 0%, #c084fc 50%, #a855f7 100%)'
                            : index === 3
                            ? 'linear-gradient(90deg, #6ee7b7 0%, #34d399 50%, #10b981 100%)'
                            : 'linear-gradient(90deg, #a7f3d0 0%, #6ee7b7 50%, #34d399 100%)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sources */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <h3 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-5">Top Sources</h3>
            <div className="space-y-5">
              {topSources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{source.source}</span>
                    <span className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">{source.count}</span>
                  </div>
                  <div className="h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${source.percentage}%`,
                        background: 'linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #8b5cf6 100%)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
          <h3 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-5">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] rounded-lg transition-colors cursor-pointer"
              >
                <div className="size-9 rounded-full bg-[#ececf0] dark:bg-[#27272a] flex items-center justify-center text-[10px] font-medium text-[#666] dark:text-[#aaa]">
                  {activity.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#111] dark:text-[#e5e5e5] font-medium">{activity.name}</div>
                  <div className="text-xs text-[#666] dark:text-[#888]">{activity.action}</div>
                </div>
                <div className="text-[10px] text-[#666] dark:text-[#888]">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
