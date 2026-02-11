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
  '/account': 'Account Settings',
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const pathname = usePathname()
  const pageTitle = title || pageTitles[pathname] || (pathname.startsWith('/applications/') ? 'Application Details' : pathname.startsWith('/requisitions/') ? 'Requisition Candidates' : 'TOMS')

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f5f5f5] dark:bg-[#2a2a2a]">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <Header title={pageTitle} />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
