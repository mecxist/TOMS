import { useState } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { Sidebar } from '@/app/components/Sidebar';
import { Header } from '@/app/components/Header';
import { PipelinePage } from '@/app/components/PipelinePage';
import { InterviewPage } from '@/app/components/InterviewPage';
import { PayrollPage } from '@/app/components/PayrollPage';
import { OnboardingPage } from '@/app/components/OnboardingPage';
import { ApplicationsPage } from '@/app/components/ApplicationsPage';
import { AssignmentsPage } from '@/app/components/AssignmentsPage';
import { ProjectsPage } from '@/app/components/ProjectsPage';
import { AIMatchingPage } from '@/app/components/AIMatchingPage';
import { TimesheetsPage } from '@/app/components/TimesheetsPage';
import { AnalyticsPage } from '@/app/components/AnalyticsPage';
import { ResourcePlanningPage } from '@/app/components/ResourcePlanningPage';

type Page = 'pipeline' | 'applications' | 'interviews' | 'onboarding' | 'projects' | 'ai-matching' | 'assignments' | 'timesheets' | 'analytics' | 'payroll' | 'resources';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('pipeline');

  const renderPage = () => {
    switch (currentPage) {
      case 'pipeline':
        return <PipelinePage />;
      case 'interviews':
        return <InterviewPage />;
      case 'payroll':
        return <PayrollPage />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'ai-matching':
        return <AIMatchingPage />;
      case 'timesheets':
        return <TimesheetsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'resources':
        return <ResourcePlanningPage />;
      default:
        return <PipelinePage />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'pipeline':
        return 'Recruitment Pipeline';
      case 'interviews':
        return 'Interviews';
      case 'payroll':
        return 'Payroll & Finance';
      case 'onboarding':
        return 'Onboarding Checklist';
      case 'applications':
        return 'Applications';
      case 'assignments':
        return 'My Work';
      case 'projects':
        return 'Project Management';
      case 'ai-matching':
        return 'AI Smart Matching';
      case 'timesheets':
        return 'Timesheets';
      case 'analytics':
        return 'Analytics';
      case 'resources':
        return 'Resource Planning';
      default:
        return 'Recruitment Pipeline';
    }
  };

  return (
    <ThemeProvider>
      <div className="bg-[#f5f5f5] dark:bg-[#1a1a1a] flex h-screen w-full overflow-hidden">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <div className="flex flex-col flex-1 min-w-0">
          <Header title={getPageTitle()} />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}