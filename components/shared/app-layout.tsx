'use client'

import { Sidebar } from './sidebar'
import { Header } from './header'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface AppLayoutProps {
  children: ReactNode
  title?: string
}

const pageTitles: Record<string, string> = {
  '/': 'Pipeline',
  '/requisitions': 'Job Requisitions',
  '/applications': 'Applications',
  '/interviews': 'Interviews',
  '/offers': 'Job Offers',
  '/onboarding': 'Onboarding',
  '/skill-assessments': 'Skill Assessments',
  '/availability': 'Availability',
  '/projects': 'Projects',
  '/matching': 'AI Matching',
  '/assignments': 'Assignments',
  '/timesheets': 'Timesheets',
  '/analytics': 'Analytics',
  '/payroll': 'Payroll',
  '/resource-planning': 'Resource Planning',
  '/messages': 'Messages',
  '/account': 'Account Settings',
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const pathname = usePathname()
  let pageTitle = title || pageTitles[pathname] ||
    (pathname.startsWith('/applications/') ? 'Application Details' :
     pathname.startsWith('/requisitions/') ? 'Requisition Candidates' :
     pathname.startsWith('/skill-assessments/') ? 'Skill Assessment' : 'TOMS')
  
  // For talent role on pipeline page, show "Interviews" instead
  if (pathname === '/' && typeof window !== 'undefined') {
    const role = sessionStorage.getItem('demo_user_role') || document.cookie.match(/demo_role=(\w+)/)?.[1]
    if (role?.toUpperCase() === 'TALENT') {
      pageTitle = 'Interviews'
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f5f5f5] dark:bg-[#2a2a2a]">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <Header title={pageTitle} />
        <div className="flex-1 min-h-0 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
