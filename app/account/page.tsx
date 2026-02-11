'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { User, Mail, Shield, Bell, Moon, Sun, Monitor } from 'lucide-react'

export default function AccountPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [userRole, setUserRole] = useState('Admin')
  const [userEmail, setUserEmail] = useState('admin@demo.toms')
  const [userName, setUserName] = useState('Demo User')

  useEffect(() => {
    setMounted(true)
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const { authClient } = await import('@/lib/auth')
      const { data: session } = await authClient.getSession()
      if (session?.user) {
        setUserEmail(session.user.email || '')
        setUserName(session.user.name || session.user.email || 'User')
        
        // Fetch role from API
        const roleResponse = await fetch('/api/user/role')
        if (roleResponse.ok) {
          const { role } = await roleResponse.json()
          setUserRole(role.charAt(0).toUpperCase() + role.slice(1).toLowerCase())
        }
      }
    } catch (error) {
      console.error('Error loading user:', error)
    }
  }

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <AppLayout title="Account Settings">
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full overflow-y-auto scroller">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Account</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Profile, security, and preferences</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Section */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <h2 className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase text-[#666] dark:text-[#888] mb-4">
              Profile
            </h2>

            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="size-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800 border-2 border-white dark:border-[#1e1e1e] shadow-lg shrink-0" />

              <div className="flex-1 space-y-4">
                {/* Name */}
                <div>
                  <label className="text-[10px] font-medium text-[#666] dark:text-[#888] uppercase tracking-wide block mb-1">
                    Name
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#ececf0] dark:bg-[#27272a] rounded-lg">
                    <User size={14} className="text-[#666] dark:text-[#aaa]" />
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{userName}</span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] font-medium text-[#666] dark:text-[#888] uppercase tracking-wide block mb-1">
                    Email
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#ececf0] dark:bg-[#27272a] rounded-lg">
                    <Mail size={14} className="text-[#666] dark:text-[#aaa]" />
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{userEmail}</span>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-[10px] font-medium text-[#666] dark:text-[#888] uppercase tracking-wide block mb-1">
                    Role
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#ececf0] dark:bg-[#27272a] rounded-lg">
                    <Shield size={14} className="text-[#666] dark:text-[#aaa]" />
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{userRole}</span>
                    <span className="ml-auto text-[10px] font-medium px-2 py-0.5 bg-[#dbeafe] dark:bg-blue-900/30 text-[#3b82f6] dark:text-blue-400 rounded">
                      Demo Account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <h2 className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase text-[#666] dark:text-[#888] mb-4">
              Appearance
            </h2>

            <div>
              <label className="text-[10px] font-medium text-[#666] dark:text-[#888] uppercase tracking-wide block mb-3">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = mounted && theme === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`p-4 rounded-lg border transition-all ${
                        isActive
                          ? 'bg-[#ececf0] dark:bg-[#27272a] border-[#111] dark:border-[#e5e5e5]'
                          : 'bg-white dark:bg-[#1e1e1e] border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,0,0,0.15)] dark:hover:border-[rgba(255,255,255,0.2)]'
                      }`}
                    >
                      <Icon size={20} className={`mx-auto mb-2 ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`} />
                      <span className={`text-xs font-medium ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`}>
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>
              {mounted && (
                <p className="text-[10px] text-[#666] dark:text-[#888] mt-3">
                  Current: {resolvedTheme === 'dark' ? 'Dark' : 'Light'} mode
                  {theme === 'system' && ' (following system preference)'}
                </p>
              )}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <h2 className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase text-[#666] dark:text-[#888] mb-4">
              Notifications
            </h2>

            <div className="space-y-4">
              <NotificationToggle
                label="Email Notifications"
                description="Receive email updates about your account activity"
                defaultChecked={true}
              />
              <NotificationToggle
                label="Interview Reminders"
                description="Get notified before scheduled interviews"
                defaultChecked={true}
              />
              <NotificationToggle
                label="Pipeline Updates"
                description="Notifications when candidates move through stages"
                defaultChecked={false}
              />
              <NotificationToggle
                label="Weekly Digest"
                description="Summary of activity sent every Monday"
                defaultChecked={true}
              />
            </div>
          </div>

          {/* Demo Notice */}
          <div className="p-4 bg-[#ececf0] dark:bg-[#27272a] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
            <p className="text-[10px] text-[#666] dark:text-[#aaa] text-center">
              This is a demo account. Settings changes are not persisted between sessions.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

interface NotificationToggleProps {
  label: string
  description: string
  defaultChecked?: boolean
}

function NotificationToggle({ label, description, defaultChecked = false }: NotificationToggleProps) {
  const [enabled, setEnabled] = useState(defaultChecked)

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-start gap-3">
        <Bell size={16} className="text-[#666] dark:text-[#aaa] mt-0.5" />
        <div>
          <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{label}</div>
          <div className="text-[10px] text-[#666] dark:text-[#aaa]">{description}</div>
        </div>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-10 h-6 rounded-full transition-colors ${
          enabled ? 'bg-[#eb3a14]' : 'bg-[#ececf0] dark:bg-[#27272a]'
        }`}
      >
        <div
          className={`absolute top-1 size-4 rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
