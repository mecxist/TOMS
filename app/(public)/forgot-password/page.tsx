'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/lib/auth'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await authClient.requestPasswordReset({
        email,
      })

      if (result.error) {
        setError(result.error.message || 'Failed to send password reset email')
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setLoading(false)
    }
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
          href="/sign-in"
          className="inline-flex items-center gap-2 text-xs text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors mb-4"
        >
          <ArrowLeft className="size-3.5" />
          Back to Sign In
        </Link>

        {/* Main Card */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-8">
          {success ? (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Mail className="size-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
                  Check Your Email
                </h1>
                <p className="text-sm text-[#666] dark:text-[#aaa]">
                  We've sent a password reset link to {email}
                </p>
              </div>
              <Link
                href="/sign-in"
                className="block w-full px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors text-center"
              >
                Back to Sign In
              </Link>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
                  Forgot Password?
                </h1>
                <p className="text-sm text-[#666] dark:text-[#aaa]">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
