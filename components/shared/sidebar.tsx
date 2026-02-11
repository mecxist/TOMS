'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Users,
  FileText,
  MessageSquare,
  UserPlus,
  FolderOpen,
  Sparkles,
  Briefcase,
  Clock,
  BarChart3,
  Wallet,
  Moon,
  Sun,
  LayoutGrid,
  LogOut,
  ChevronRight,
  Handshake,
  Calendar,
  Award,
  FileSearch,
  Settings
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  badge?: number | React.ReactNode
  roles?: ('ADMIN' | 'MANAGER' | 'COORDINATOR' | 'TALENT')[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

type UserRole = 'ADMIN' | 'MANAGER' | 'COORDINATOR' | 'TALENT'

// All navigation items organized by lifecycle stage
const allNavSections: NavSection[] = [
  {
    title: 'Acquisition',
    items: [
      { id: 'requisitions', label: 'Requisitions', href: '/requisitions', icon: <FileSearch size={18} />, roles: ['ADMIN', 'MANAGER'] },
      { id: 'pipeline', label: 'Pipeline', href: '/', icon: <Users size={18} />, badge: 12, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
      { id: 'applications', label: 'Applications', href: '/applications', icon: <FileText size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
      { id: 'interviews', label: 'Interviews', href: '/interviews', icon: <MessageSquare size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
      { id: 'offers', label: 'Offers', href: '/offers', icon: <Handshake size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
    ],
  },
  {
    title: 'Onboarding',
    items: [
      { id: 'onboarding', label: 'Onboarding', href: '/onboarding', icon: <UserPlus size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR', 'TALENT'] },
      { id: 'skill-assessments', label: 'Skill Assessments', href: '/skill-assessments', icon: <Award size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
    ],
  },
  {
    title: 'Engagement',
    items: [
      { id: 'availability', label: 'Availability', href: '/availability', icon: <Calendar size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
      { id: 'projects', label: 'Projects', href: '/projects', icon: <FolderOpen size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR', 'TALENT'] },
      { id: 'matching', label: 'AI Matching', href: '/matching', icon: <Sparkles size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
      { id: 'assignments', label: 'Assignments', href: '/assignments', icon: <Briefcase size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR', 'TALENT'] },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'timesheets', label: 'Timesheets', href: '/timesheets', icon: <Clock size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR', 'TALENT'] },
      { id: 'resource-planning', label: 'Resource Planning', href: '/resource-planning', icon: <LayoutGrid size={18} />, roles: ['ADMIN', 'MANAGER', 'COORDINATOR'] },
    ],
  },
  {
    title: 'Analytics & Finance',
    items: [
      { id: 'analytics', label: 'Analytics', href: '/analytics', icon: <BarChart3 size={18} />, roles: ['ADMIN', 'MANAGER'] },
      { id: 'payroll', label: 'Payroll', href: '/payroll', icon: <Wallet size={18} />, badge: <span className="text-red-500">•</span>, roles: ['ADMIN', 'MANAGER'] },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>('ADMIN')
  const [userName, setUserName] = useState('Demo User')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    setMounted(true)
    loadUser()
  }, [])

  const loadUser = async () => {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

    // Demo mode: read from cookies/sessionStorage
    if (isDemoMode) {
      const demoRole = (document.cookie.match(/demo_role=(\w+)/)?.[1] || sessionStorage.getItem('demo_role') || 'admin').toUpperCase() as UserRole
      const demoEmail = document.cookie.match(/demo_email=([^;]+)/)?.[1] || sessionStorage.getItem('demo_email') || ''
      const roleName = demoRole.charAt(0) + demoRole.slice(1).toLowerCase()
      setUserRole(demoRole)
      setUserEmail(demoEmail)
      setUserName(`${roleName} User`)
      return
    }

    // Production mode: use better-auth
    try {
      const { authClient } = await import('@/lib/auth')
      const { data: session } = await authClient.getSession()
      if (session?.user) {
        setUserEmail(session.user.email || '')
        setUserName(session.user.name || session.user.email || 'User')

        const roleResponse = await fetch('/api/user/role')
        if (roleResponse.ok) {
          const { role } = await roleResponse.json()
          setUserRole(role || 'TALENT')
        }
      }
    } catch (error) {
      console.error('Error loading user:', error)
    }
  }

  const handleSignOut = async () => {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

    if (isDemoMode) {
      document.cookie = 'demo_authenticated=; path=/; max-age=0'
      document.cookie = 'demo_role=; path=/; max-age=0'
      document.cookie = 'demo_email=; path=/; max-age=0'
      sessionStorage.removeItem('demo_authenticated')
      sessionStorage.removeItem('demo_role')
      sessionStorage.removeItem('demo_email')
      router.push('/login')
      return
    }

    try {
      const { authClient } = await import('@/lib/auth')
      await authClient.signOut()
      router.push('/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Filter navigation sections based on user role
  const getFilteredNavSections = (): NavSection[] => {
    return allNavSections
      .map(section => ({
        ...section,
        items: section.items.filter(item => {
          // If no roles specified, show to all (shouldn't happen, but safety check)
          if (!item.roles || item.roles.length === 0) return true
          return item.roles.includes(userRole)
        })
      }))
      .filter(section => section.items.length > 0) // Remove empty sections
  }

  const filteredSections = getFilteredNavSections()

  return (
    <aside className="w-64 border-r border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] flex flex-col h-full bg-white dark:bg-[#1e1e1e] shrink-0 z-10">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#eb3a14] rounded-full size-5" />
          <span className="font-['JetBrains_Mono',monospace] font-medium text-xs tracking-widest uppercase text-[#111] dark:text-[#e5e5e5]">
            TOMS
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 scroller">
        <div className="space-y-8">
          {filteredSections.map((section) => (
            <div key={section.title}>
              <div className="px-2 mb-2">
                <h3 className="font-['JetBrains_Mono',monospace] text-[10.4px] tracking-widest uppercase text-[#666] dark:text-[#888]">
                  {section.title}
                </h3>
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem key={item.id} item={item} isActive={isActive(item.href)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] px-4 py-4 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full px-3 py-2 flex items-center gap-3 rounded hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          suppressHydrationWarning
        >
          {!mounted ? (
            <Moon size={18} className="text-[#666] dark:text-[#aaa]" />
          ) : resolvedTheme === 'dark' ? (
            <Sun size={18} className="text-[#666] dark:text-[#aaa]" />
          ) : (
            <Moon size={18} className="text-[#666] dark:text-[#aaa]" />
          )}
          <span className="font-medium text-xs text-[#666] dark:text-[#aaa]">
            {!mounted ? 'Theme' : resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className="w-full px-3 py-2 flex items-center gap-3 rounded hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors"
        >
          <LogOut size={18} className="text-[#666] dark:text-[#aaa]" />
          <span className="font-medium text-xs text-[#666] dark:text-[#aaa]">Logout</span>
        </button>

        {/* User Profile Link */}
        <Link
          href="/account"
          className="mt-2 flex items-center gap-3 px-3 py-2 rounded hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors group"
        >
          <div className="size-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800 border border-white/20 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs text-[#111] dark:text-[#e5e5e5] truncate">{userName}</div>
            <div className="font-['JetBrains_Mono',monospace] text-[10.4px] text-[#666] dark:text-[#888]">
              {userRole.charAt(0) + userRole.slice(1).toLowerCase()}
            </div>
          </div>
          <ChevronRight size={14} className="text-[#999] dark:text-[#888] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </aside>
  )
}

function NavItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={`w-full px-3 py-2 flex items-center gap-3 rounded transition-colors ${
        isActive
          ? 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.1)]'
          : 'hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.05)]'
      }`}
    >
      <div className={`size-[18px] flex items-center justify-center ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`}>
        {item.icon}
      </div>
      <span className={`font-medium text-xs ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`}>
        {item.label}
      </span>
      {item.badge && (
        <div className="ml-auto">
          {typeof item.badge === 'number' ? (
            <span className="bg-[#eb3a14] text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
              {item.badge}
            </span>
          ) : (
            item.badge
          )}
        </div>
      )}
    </Link>
  )
}
