'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { CheckCircle, XCircle, Download } from 'lucide-react'

interface TimeLog {
  id: string
  name: string
  initials: string
  hours: string
  amount: string
  stage: string
  color: string
}

const timeLogs: TimeLog[] = [
  {
    id: '1',
    name: 'Jessica L.',
    initials: 'JL',
    hours: 'Week #2 - 36.5 hours',
    amount: '$2,887.50',
    stage: 'Billable',
    color: 'orange',
  },
  {
    id: '2',
    name: 'Alex K.',
    initials: 'AK',
    hours: 'Week #2 - 40.0 hours',
    amount: '$5,200.00',
    stage: 'Billable',
    color: 'blue',
  },
]

export default function PayrollPage() {
  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Payroll</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Approve time logs and run payroll</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Panel - Pending Time Logs */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-medium text-[#111] dark:text-[#e5e5e5] mb-1">
                  Pending Time Logs (Stage 8-9)
                </h2>
              </div>
              <button className="text-xs text-[#eb3a14] font-medium hover:underline">Approve All</button>
            </div>

            <div className="space-y-4">
              {timeLogs.map((log) => (
                <TimeLogCard key={log.id} log={log} />
              ))}
            </div>
          </div>

          {/* Right Panel - Payroll Run */}
          <div>
            <h2 className="text-base font-medium text-[#111] dark:text-[#e5e5e5] mb-6">Payroll Run (Stage 10)</h2>

            <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">Total Payout</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-[#111] dark:text-[#e5e5e5]">$142,500.00</span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium px-2 py-1 rounded">
                    Ready
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666] dark:text-[#aaa]">Contractors</span>
                  <span className="text-[#111] dark:text-[#e5e5e5] font-medium">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666] dark:text-[#aaa]">Tax Withholding</span>
                  <span className="text-[#111] dark:text-[#e5e5e5] font-medium">$0.09</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666] dark:text-[#aaa]">Platform Fees</span>
                  <span className="text-[#111] dark:text-[#e5e5e5] font-medium">$1,425.00</span>
                </div>
              </div>

              <button className="w-full bg-[#111] dark:bg-white text-white dark:text-[#111] py-3 rounded font-medium text-sm hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-2">
                <Download className="size-4" />
                Export to 3rd Party
              </button>

              <p className="text-xs text-[#666] dark:text-[#888] text-center mt-3">Next run scheduled: Nov 15</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

interface TimeLogCardProps {
  log: TimeLog
}

function TimeLogCard({ log }: TimeLogCardProps) {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`size-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${getColorClass(log.color)}`}>
          {log.initials}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-[#111] dark:text-[#e5e5e5] mb-1">{log.name}</h3>
          <p className="text-xs text-[#666] dark:text-[#aaa] mb-3">{log.hours}</p>

          <div className="flex items-center gap-2">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-medium px-2 py-1 rounded">
              Contract Signed
            </span>
            <span className="text-[#666] dark:text-[#aaa] text-xs line-through">Employment Setup</span>
          </div>
          <p className="text-xs text-[#666] dark:text-[#aaa] mt-2">Team Introduction</p>
        </div>

        <div className="text-right">
          <div className="text-base font-semibold text-[#111] dark:text-[#e5e5e5] mb-3">{log.amount}</div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors">
              <CheckCircle className="size-5 text-green-500" />
            </button>
            <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
              <XCircle className="size-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
