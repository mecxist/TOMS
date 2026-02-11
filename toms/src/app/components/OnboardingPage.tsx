import { Filter } from 'lucide-react';

interface OnboardingCandidate {
  id: string;
  name: string;
  initials: string;
  role: string;
  day: string;
  dayColor: string;
  progress: number;
  color: string;
  completedTasks: string[];
  pendingTasks: string[];
}

const candidates: OnboardingCandidate[] = [
  {
    id: '1',
    name: 'Sarah K.',
    initials: 'SK',
    role: 'Product Designer',
    day: 'Day 3',
    dayColor: 'green',
    progress: 65,
    color: 'purple',
    completedTasks: ['Contract Signed', 'Employment Setup'],
    pendingTasks: ['Team Introduction'],
  },
  {
    id: '2',
    name: 'Michael J.',
    initials: 'MJ',
    role: 'Backend Lead',
    day: 'Day 1',
    dayColor: 'orange',
    progress: 95,
    color: 'blue',
    completedTasks: ['Contract Signed'],
    pendingTasks: ['Equipment Setup'],
  },
];

export function OnboardingPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-3xl font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">12</div>
            <div className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">Onboarding</div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-green-500 mb-1">4</div>
            <div className="text-xs text-[#666] dark:text-[#888] uppercase tracking-wide">Completed</div>
          </div>
        </div>

        <button className="px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-xs font-medium text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <OnboardingCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}

interface OnboardingCardProps {
  candidate: OnboardingCandidate;
}

function OnboardingCard({ candidate }: OnboardingCardProps) {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: 'bg-purple-100 text-purple-700',
      blue: 'bg-blue-100 text-blue-700',
    };
    return colorMap[color] || colorMap.blue;
  };

  const getDayColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      green: 'bg-green-100 text-green-700',
      orange: 'bg-orange-100 text-orange-700',
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`size-12 rounded-full flex items-center justify-center text-base font-medium shrink-0 ${getColorClass(
            candidate.color
          )}`}
        >
          {candidate.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.name}</h3>
            <span
              className={`text-[10px] font-medium px-2 py-1 rounded ${getDayColorClass(
                candidate.dayColor
              )}`}
            >
              {candidate.day}
            </span>
          </div>
          <p className="text-xs text-[#666] dark:text-[#aaa]">{candidate.role}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#666] dark:text-[#aaa]">Progress</span>
          <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.progress}%</span>
        </div>
        <div className="h-2 bg-[#f5f5f5] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${candidate.progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {candidate.completedTasks.map((task, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs text-green-700 dark:text-green-500">{task}</span>
          </div>
        ))}
        {candidate.pendingTasks.map((task, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-4 rounded-full border-2 border-gray-300 dark:border-gray-600 shrink-0" />
            <span className="text-xs text-[#666] dark:text-[#aaa]">{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}