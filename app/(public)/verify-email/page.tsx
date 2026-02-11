'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, ArrowLeft, Mail, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/lib/auth'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [message, setMessage] = useState('')
  const email = searchParams?.get('email') || ''

  useEffect(() => {
    setMounted(true)
    // Check if there's a token in the URL
    const token = searchParams?.get('token')
    if (token) {
      verifyEmail(token)
    }
  }, [searchParams])

  const verifyEmail = async (token: string) => {
    setLoading(true)
    try {
      const result = await authClient.verifyEmail({
        query: { token },
      })

      if (result.error) {
        setStatus('error')
        setMessage(result.error.message || 'Failed to verify email')
      } else {
        setStatus('success')
        setMessage('Email verified successfully! You can now sign in.')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resendVerification = async () => {
    if (!email) return
    setLoading(true)
    try {
      await authClient.sendVerificationEmail({
        email,
      })
      setMessage('Verification email sent! Check your inbox.')
    } catch (err: any) {
      setMessage(err.message || 'Failed to send verification email')
    } finally {
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
          {status === 'pending' && (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <Mail className="size-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
                  Verify Your Email
                </h1>
                <p className="text-sm text-[#666] dark:text-[#aaa]">
                  We've sent a verification link to {email || 'your email'}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-[#666] dark:text-[#aaa] text-center">
                  Click the link in the email to verify your account. The link will expire in 24 hours.
                </p>

                {email && (
                  <button
                    onClick={resendVerification}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                )}
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
                  Email Verified!
                </h1>
                <p className="text-sm text-[#666] dark:text-[#aaa]">{message}</p>
              </div>

              <Link
                href="/sign-in"
                className="block w-full px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors text-center"
              >
                Sign In
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="size-8 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
                  Verification Failed
                </h1>
                <p className="text-sm text-[#666] dark:text-[#aaa]">{message}</p>
              </div>

              <div className="space-y-3">
                {email && (
                  <button
                    onClick={resendVerification}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                )}
                <Link
                  href="/sign-in"
                  className="block w-full px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors text-center"
                >
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center">
          <p className="text-xs text-[#666] dark:text-[#aaa]">Loading...</p>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
