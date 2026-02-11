'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun, Users, Calendar, ClipboardCheck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function WelcomePage() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      title: 'Pipeline Management',
      description: 'Track candidates through 11 stages',
      icon: Users,
    },
    {
      title: 'Interview Scheduling',
      description: 'Schedule and manage interviews',
      icon: Calendar,
    },
    {
      title: 'Onboarding Workflows',
      description: 'Templates and task tracking',
      icon: ClipboardCheck,
    },
    {
      title: 'Analytics & Reporting',
      description: 'Pipeline metrics and insights',
      icon: BarChart3,
    },
  ]

  const talentLifecycle = [
    'Application',
    'Review',
    'Interview',
    'Decision',
    'Onboarding',
    'Assignment',
    'Time Tracking',
    'Payroll',
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="h-screen w-screen overflow-auto bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center p-6">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-6 right-6 p-2 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors z-10"
      >
        {theme === 'dark' ? (
          <Sun className="size-[18px] text-[#666] dark:text-[#aaa]" />
        ) : (
          <Moon className="size-[18px] text-[#666] dark:text-[#aaa]" />
        )}
      </button>

      <div className="w-full max-w-2xl my-auto">
        {/* Main Card */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-[#eb3a14] rounded-full size-5" />
              <span className="font-['JetBrains_Mono',monospace] font-medium text-xs tracking-widest uppercase text-[#111] dark:text-[#e5e5e5]">
                TOMS
              </span>
            </div>

            {isDemoMode && (
              <span className="inline-block text-[10px] font-medium px-2 py-1 bg-[#dbeafe] dark:bg-blue-900/30 text-[#3b82f6] dark:text-blue-400 rounded mb-4">
                DEMO MODE
              </span>
            )}

            <h1 className="text-xl font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
              Talent Operations Management System
            </h1>
            <p className="text-xs text-[#666] dark:text-[#aaa] max-w-md mx-auto">
              A comprehensive platform for managing the complete talent lifecycle—from application through payroll.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mb-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-[#111] dark:bg-white text-white dark:text-[#111] px-6 py-2.5 rounded-lg text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors"
            >
              Explore Demo
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Talent Lifecycle */}
          <div className="mb-8">
            <h2 className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase text-[#666] dark:text-[#888] mb-3">
              Talent Lifecycle
            </h2>
            <div className="flex flex-wrap gap-2">
              {talentLifecycle.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-[10px] font-medium px-2 py-1 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
                    {step}
                  </span>
                  {index < talentLifecycle.length - 1 && (
                    <span className="text-[#999] dark:text-[#888] text-[10px]">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h2 className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase text-[#666] dark:text-[#888] mb-3">
              Key Features
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="p-4 bg-[#fafafa] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]"
                  >
                    <Icon className="size-4 text-[#666] dark:text-[#aaa] mb-2" />
                    <h3 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[10px] text-[#666] dark:text-[#aaa]">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Demo Notice */}
          {isDemoMode && (
            <div className="mt-6 p-3 bg-[#ececf0] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
              <p className="text-[10px] text-[#666] dark:text-[#aaa]">
                <span className="font-medium">Demo Mode:</span> This is a portfolio demonstration with sample data. All information is fictional.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
