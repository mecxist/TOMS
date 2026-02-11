import svgPaths from "@/imports/svg-v2nxww7shu";
import { useTheme } from '@/app/contexts/ThemeContext';

type Page = 'pipeline' | 'applications' | 'interviews' | 'onboarding' | 'projects' | 'ai-matching' | 'assignments' | 'timesheets' | 'analytics' | 'payroll' | 'resources';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { toggleTheme } = useTheme();

  return (
    <aside className="bg-white dark:bg-[#1e1e1e] flex flex-col h-full w-64 border-r border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] shrink-0 z-10">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-2">
          <div className="bg-[#eb3a14] rounded-full size-5" />
          <span className="font-['JetBrains_Mono',monospace] font-medium text-xs tracking-widest uppercase text-[#111] dark:text-[#e5e5e5]">
            TalentOS
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-8">
          {/* Acquisition */}
          <div>
            <div className="px-2 mb-2">
              <h3 className="font-['JetBrains_Mono',monospace] text-[10.4px] tracking-widest uppercase text-[#666] dark:text-[#888]">
                Acquisition
              </h3>
            </div>
            <div className="space-y-1">
              <NavItem
                icon={<PipelineIcon />}
                label="Pipeline"
                isActive={currentPage === 'pipeline'}
                onClick={() => onNavigate('pipeline')}
                badge={12}
              />
              <NavItem
                icon={<ApplicationsIcon />}
                label="Applications"
                isActive={currentPage === 'applications'}
                onClick={() => onNavigate('applications')}
              />
              <NavItem
                icon={<InterviewsIcon />}
                label="Interviews"
                isActive={currentPage === 'interviews'}
                onClick={() => onNavigate('interviews')}
              />
              <NavItem
                icon={<OnboardingIcon />}
                label="Onboarding"
                isActive={currentPage === 'onboarding'}
                onClick={() => onNavigate('onboarding')}
              />
            </div>
          </div>

          {/* Management */}
          <div>
            <div className="px-2 mb-2">
              <h3 className="font-['JetBrains_Mono',monospace] text-[10.4px] tracking-widest uppercase text-[#666] dark:text-[#888]">
                Management
              </h3>
            </div>
            <div className="space-y-1">
              <NavItem
                icon={<ProjectsIcon />}
                label="Projects"
                isActive={currentPage === 'projects'}
                onClick={() => onNavigate('projects')}
              />
              <NavItem
                icon={<AIMatchingIcon />}
                label="AI Matching"
                isActive={currentPage === 'ai-matching'}
                onClick={() => onNavigate('ai-matching')}
              />
              <NavItem
                icon={<AssignmentsIcon />}
                label="Assignments"
                isActive={currentPage === 'assignments'}
                onClick={() => onNavigate('assignments')}
              />
              <NavItem
                icon={<TimesheetsIcon />}
                label="Timesheets"
                isActive={currentPage === 'timesheets'}
                onClick={() => onNavigate('timesheets')}
              />
            </div>
          </div>

          {/* Data & Finance */}
          <div>
            <div className="px-2 mb-2">
              <h3 className="font-['JetBrains_Mono',monospace] text-[10.4px] tracking-widest uppercase text-[#666] dark:text-[#888]">
                Data & Finance
              </h3>
            </div>
            <div className="space-y-1">
              <NavItem
                icon={<AnalyticsIcon />}
                label="Analytics"
                isActive={currentPage === 'analytics'}
                onClick={() => onNavigate('analytics')}
              />
              <NavItem
                icon={<PayrollIcon />}
                label="Payroll"
                isActive={currentPage === 'payroll'}
                onClick={() => onNavigate('payroll')}
                badge={<span className="text-red-500">•</span>}
              />
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="px-2 mb-2">
              <h3 className="font-['JetBrains_Mono',monospace] text-[10.4px] tracking-widest uppercase text-[#666] dark:text-[#888]">
                Resources
              </h3>
            </div>
            <div className="space-y-1">
              <NavItem
                icon={<ResourcesIcon />}
                label="Resources"
                isActive={currentPage === 'resources'}
                onClick={() => onNavigate('resources')}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] px-4 py-4">
        <button className="w-full px-3 py-2 flex items-center gap-3 rounded hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors" onClick={toggleTheme}>
          <ThemeIcon />
          <span className="font-medium text-xs text-[#666] dark:text-[#aaa]">Theme</span>
        </button>
        <div className="mt-4 flex items-center gap-3 px-3">
          <div className="size-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border border-white/20" />
          <div>
            <div className="font-medium text-xs text-[#111] dark:text-[#e5e5e5]">Kyriakos M.</div>
            <div className="font-['JetBrains_Mono',monospace] text-[10.4px] text-[#666] dark:text-[#888]">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number | React.ReactNode;
}

function NavItem({ icon, label, isActive, onClick, badge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 flex items-center gap-3 rounded transition-colors ${
        isActive 
          ? 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.1)]' 
          : 'hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.05)]'
      }`}
    >
      <div className="size-[18px] flex items-center justify-center">{icon}</div>
      <span className={`font-medium text-xs ${isActive ? 'text-[#111] dark:text-[#e5e5e5]' : 'text-[#666] dark:text-[#aaa]'}`}>
        {label}
      </span>
      {badge && (
        <div className="ml-auto">
          {typeof badge === 'number' ? (
            <span className="bg-[#eb3a14] text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
              {badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )}
    </button>
  );
}

// Icons
function PipelineIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p30e11a80} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p2c88fd00} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
      <path d={svgPaths.p2d77ae00} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p17f94080} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
    </svg>
  );
}

function ApplicationsIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p8816100} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p26236c00} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
    </svg>
  );
}

function InterviewsIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p1187f200} fill="currentColor" />
      <path d={svgPaths.p3f0e5fa0} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
    </svg>
  );
}

function OnboardingIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p2932d1c0} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p362b7d80} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p31185400} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p3ab47c80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d="M12.5625 6.56251H8.81251" stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
      <path d={svgPaths.p7df8c00} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.pccbd900} stroke="currentColor" strokeWidth="1.125" />
    </svg>
  );
}

function AIMatchingIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p2e93e00} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p18454280} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
      <path d={svgPaths.p3a5337c0} stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function AssignmentsIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p1d225b96} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p1f6bb9f0} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p19f815a0} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
    </svg>
  );
}

function TimesheetsIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p39ac2520} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p17609c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p96506e0} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p2a783480} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
    </svg>
  );
}

function PayrollIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d="M3.5625 5.81246H6.5625" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
      <path d={svgPaths.p1e932200} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.p3e20f400} stroke="currentColor" strokeWidth="1.125" />
      <path d={svgPaths.ped45c80} stroke="currentColor" strokeLinecap="round" strokeWidth="1.125" />
      <path d="M12.5558 8.81246H12.5633" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function ResourcesIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p3f6cde60} fill="currentColor" />
    </svg>
  );
}

function ThemeIcon() {
  return (
    <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p3f6cde60} fill="currentColor" />
    </svg>
  );
}