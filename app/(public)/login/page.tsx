'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, ArrowLeft } from 'lucide-react'

const demoRoles = [
  { role: 'Admin', desc: 'Full access', email: 'admin@demo.toms', color: '#7c3aed', initials: 'AD' },
  { role: 'Manager', desc: 'Manage team', email: 'manager@demo.toms', color: '#3b82f6', initials: 'MG' },
  { role: 'Coordinator', desc: 'Coordinate tasks', email: 'coordinator@demo.toms', color: '#14b8a6', initials: 'CO' },
  { role: 'Talent', desc: 'Talent portal', email: 'talent@demo.toms', color: '#10b981', initials: 'TL' },
]

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // If already authenticated in demo mode, redirect
    const role = document.cookie.match(/demo_role=(\w+)/)?.[1]
    if (role) {
      const redirect = searchParams?.get('redirect') || (role === 'talent' ? '/assignments' : '/')
      router.push(redirect)
    }
  }, [router, searchParams])

  const handleRoleLogin = (role: string, email: string) => {
    setLoading(true)

    // Set demo cookies (session-scoped, no expires = cleared when browser closes)
    document.cookie = `demo_authenticated=true; path=/`
    document.cookie = `demo_role=${role.toLowerCase()}; path=/`
    document.cookie = `demo_email=${email}; path=/`

    // Also store in sessionStorage for client-side access
    sessionStorage.setItem('demo_authenticated', 'true')
    sessionStorage.setItem('demo_role', role.toLowerCase())
    sessionStorage.setItem('demo_email', email)

    const redirect = searchParams?.get('redirect') || (role.toLowerCase() === 'talent' ? '/assignments' : '/')
    router.push(redirect)
  }

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

      <div className="w-full max-w-md my-auto">
        {/* Back Link */}
        <Link
          href="/welcome"
          className="inline-flex items-center gap-2 text-xs text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors mb-4"
        >
          <ArrowLeft className="size-3.5" />
          Back to Welcome
        </Link>

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

            <h1 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">
              Select a Role
            </h1>
            <p className="text-xs text-[#666] dark:text-[#aaa]">
              Choose a role to explore the demo
            </p>
          </div>

          {/* Role Cards */}
          <div className="space-y-3">
            <h2 className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase text-[#666] dark:text-[#888] mb-2">
              Demo Roles
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {demoRoles.map((user) => (
                <button
                  key={user.role}
                  onClick={() => handleRoleLogin(user.role, user.email)}
                  disabled={loading}
                  className="p-4 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,0,0,0.15)] dark:hover:border-[rgba(255,255,255,0.2)] hover:shadow-md transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="size-8 rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-0.5">
                        {user.role}
                      </div>
                      <div className="text-[10px] text-[#666] dark:text-[#aaa]">
                        {user.desc}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 p-3 bg-[#ececf0] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
            <p className="text-[10px] text-[#666] dark:text-[#aaa] text-center">
              All data is fictional and for portfolio demonstration purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center">
        <p className="text-xs text-[#666] dark:text-[#aaa]">Loading...</p>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}
