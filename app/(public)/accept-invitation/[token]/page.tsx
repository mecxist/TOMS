'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, ArrowLeft, Mail, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/lib/auth'

interface InvitationData {
  id: string
  email: string
  organization: {
    name: string
  }
  role: string
  inviter: {
    name: string | null
    email: string
  }
}

function AcceptInvitationContent() {
  const router = useRouter()
  const params = useParams()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    setMounted(true)
    loadInvitation()
    checkAuth()
  }, [])

  const loadInvitation = async () => {
    try {
      const token = params?.token as string
      const response = await fetch(`/api/invitations/accept`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      // Actually, we need to fetch by token
      // Let's create a separate endpoint for this
      const inviteResponse = await fetch(`/api/invitations/token/${token}`)
      if (inviteResponse.ok) {
        const data = await inviteResponse.json()
        setInvitation(data)
      } else {
        setError('Invitation not found or expired')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load invitation')
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async () => {
    try {
      const { data: session } = await authClient.getSession()
      setIsSignedIn(!!session?.user)
      if (session?.user) {
        setSignUpData({
          name: session.user.name || '',
          email: session.user.email || '',
          password: '',
        })
      }
    } catch {
      setIsSignedIn(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setAccepting(true)
    setError(null)

    try {
      const result = await authClient.signIn.email({
        email: signInEmail,
        password: signInPassword,
      })

      if (result.error) {
        setError(result.error.message || 'Failed to sign in')
        setAccepting(false)
        return
      }

      await acceptInvitation()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setAccepting(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setAccepting(true)
    setError(null)

    try {
      const result = await authClient.signUp.email({
        email: signUpData.email,
        password: signUpData.password,
        name: signUpData.name,
      })

      if (result.error) {
        setError(result.error.message || 'Failed to create account')
        setAccepting(false)
        return
      }

      // Wait a moment for user to be created, then accept invitation
      setTimeout(async () => {
        await acceptInvitation()
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setAccepting(false)
    }
  }

  const acceptInvitation = async () => {
    try {
      const token = params?.token as string
      const response = await fetch('/api/invitations/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to accept invitation')
      }

      // Redirect to dashboard
      router.push('/')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to accept invitation')
      setAccepting(false)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="h-screen w-screen bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#6366f1]" />
      </div>
    )
  }

  if (error && !invitation) {
    return (
      <div className="h-screen w-screen overflow-auto bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <XCircle className="size-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
              Invalid Invitation
            </h1>
            <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">{error}</p>
            <Link
              href="/sign-in"
              className="inline-block px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
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
        {invitation && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-8">
            {/* Invitation Info */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Mail className="size-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5] mb-2">
                You've been invited!
              </h1>
              <p className="text-sm text-[#666] dark:text-[#aaa]">
                {invitation.inviter.name || invitation.inviter.email} has invited you to join{' '}
                <strong>{invitation.organization.name}</strong> as a{' '}
                <strong>{invitation.role}</strong>.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {isSignedIn ? (
              /* Already signed in - just accept */
              <div>
                <p className="text-sm text-[#666] dark:text-[#aaa] mb-4 text-center">
                  You're signed in. Click below to accept the invitation.
                </p>
                <button
                  onClick={acceptInvitation}
                  disabled={accepting}
                  className="w-full px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {accepting ? 'Accepting...' : 'Accept Invitation'}
                </button>
              </div>
            ) : (
              /* Not signed in - show sign in or sign up */
              <div className="space-y-4">
                <div className="flex gap-2 border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]">
                  <button
                    onClick={() => {
                      setSignUpData({ ...signUpData, email: invitation.email })
                    }}
                    className="flex-1 py-2 text-sm font-medium text-[#111] dark:text-[#e5e5e5] border-b-2 border-[#6366f1]"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => setSignInEmail(invitation.email)}
                    className="flex-1 py-2 text-sm font-medium text-[#666] dark:text-[#aaa]"
                  >
                    Sign In
                  </button>
                </div>

                {/* Sign Up Form */}
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={signUpData.email || invitation.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                      disabled
                      className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-[#f5f5f5] dark:bg-[#2a2a2a] text-[#666] dark:text-[#aaa]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                      minLength={8}
                      className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={accepting}
                    className="w-full px-4 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {accepting ? 'Creating Account...' : 'Create Account & Accept'}
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-sm text-[#666] dark:text-[#aaa]">
                    Already have an account?{' '}
                    <button
                      onClick={() => {
                        setSignInEmail(invitation.email)
                        // Switch to sign in form (simplified - could use tabs)
                      }}
                      className="text-[#6366f1] hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AcceptInvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#f5f5f5] dark:bg-[#2a2a2a] flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-[#6366f1]" />
        </div>
      }
    >
      <AcceptInvitationContent />
    </Suspense>
  )
}
