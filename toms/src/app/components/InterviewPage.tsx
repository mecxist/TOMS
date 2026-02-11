import { Clock, Video, Users, Bold, Italic, Link } from 'lucide-react';
import { useState } from 'react';

interface Interview {
  id: string;
  time: string;
  title: string;
  candidate: string;
  platform: string;
  type: string;
}

const upcomingInterviews: Interview[] = [
  {
    id: '1',
    time: 'TODAY, 10:30 AM',
    title: 'Technical Screening',
    candidate: 'Alex K.',
    platform: 'Google Meet',
    type: 'Technical',
  },
  {
    id: '2',
    time: 'TODAY, 02:30 PM',
    title: 'System Design',
    candidate: 'John L.',
    platform: 'Zoom',
    type: 'System',
  },
  {
    id: '3',
    time: 'TOMORROW, 11:00 AM',
    title: 'Culture Fit',
    candidate: 'Maria R.',
    platform: 'Офісе',
    type: 'Culture',
  },
];

export function InterviewPage() {
  const [selectedInterview, setSelectedInterview] = useState(upcomingInterviews[0]);
  const [overallScore, setOverallScore] = useState(4);

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Interview List */}
      <div className="w-[420px] bg-white dark:bg-[#1e1e1e] border-r border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-1">Upcoming</h2>
          <p className="text-xs text-[#666] dark:text-[#aaa]">3 interviews scheduled for today</p>
        </div>

        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              isSelected={selectedInterview.id === interview.id}
              onClick={() => setSelectedInterview(interview)}
            />
          ))}
        </div>
      </div>

      {/* Right Panel - Interview Details */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-semibold text-[#111] dark:text-[#e5e5e5]">{selectedInterview.title}</h1>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#666] dark:text-[#aaa]">
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>10:00 AM - 10:45 AM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="size-3" />
                  <span>Alex K. (Candidate)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-xs font-medium text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                Resume
              </button>
              <button className="px-4 py-2 bg-[#eb3a14] text-white rounded text-xs font-medium hover:bg-[#d63512] transition-colors">
                Join Call
              </button>
            </div>
          </div>

          {/* Agenda */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 mb-6">
            <h2 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-4">
              Agenda
            </h2>
            <div className="space-y-3">
              <AgendaItem
                title="Introduction & Experience (5m)"
                isCompleted={true}
              />
              <AgendaItem
                title="React Component Lifecycle (10m)"
                isCompleted={false}
              />
              <AgendaItem
                title="State Management Challenge (20m)"
                isCompleted={false}
              />
              <AgendaItem title="Q&A (10m)" isCompleted={false} />
            </div>
          </div>

          {/* Interviewer Notes */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6 mb-6">
            <h2 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-4">
              Interviewer Notes
            </h2>
            <textarea
              placeholder="Type your observations here... Use markdown for formatting."
              className="w-full min-h-[120px] p-3 bg-[#f5f5f5] dark:bg-[#2a2a2a] rounded border-none outline-none text-sm text-[#111] dark:text-[#e5e5e5] placeholder-[#999] dark:placeholder-[#888] resize-none"
            />
            <div className="flex items-center gap-2 mt-3">
              <button className="p-1.5 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                <Bold className="size-4 text-[#666] dark:text-[#aaa]" />
              </button>
              <button className="p-1.5 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                <Italic className="size-4 text-[#666] dark:text-[#aaa]" />
              </button>
              <button className="p-1.5 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                <Link className="size-4 text-[#666] dark:text-[#aaa]" />
              </button>
            </div>
          </div>

          {/* Evaluation */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <h2 className="text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-4">
              Evaluation
            </h2>
            <div>
              <label className="text-sm text-[#111] dark:text-[#e5e5e5] mb-3 block">Overall Score</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => setOverallScore(score)}
                    className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
                      score === overallScore
                        ? 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
                        : 'bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InterviewCardProps {
  interview: Interview;
  isSelected: boolean;
  onClick: () => void;
}

function InterviewCard({ interview, isSelected, onClick }: InterviewCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'bg-[#f5f5f5] dark:bg-[#2a2a2a] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.15)]'
          : 'bg-white dark:bg-[#1e1e1e] border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,0,0,0.1)] dark:hover:border-[rgba(255,255,255,0.15)]'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-medium text-[#666] dark:text-[#888] uppercase tracking-wide">
          {interview.time}
        </span>
        {isSelected && (
          <Video className="size-4 text-[#eb3a14]" />
        )}
      </div>

      <h3 className="font-medium text-sm text-[#111] dark:text-[#e5e5e5] mb-1">{interview.title}</h3>
      <div className="flex items-center gap-2 text-xs text-[#666] dark:text-[#aaa]">
        <Users className="size-3" />
        <span>{interview.candidate}</span>
      </div>

      <div className="mt-3">
        <span className="bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-[#aaa] text-[10px] font-medium px-2 py-1 rounded">
          {interview.platform}
        </span>
      </div>
    </div>
  );
}

interface AgendaItemProps {
  title: string;
  isCompleted: boolean;
}

function AgendaItem({ title, isCompleted }: AgendaItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`size-4 rounded-full mt-0.5 flex items-center justify-center ${
          isCompleted ? 'bg-green-500' : 'bg-white dark:bg-[#1e1e1e] border-2 border-gray-300 dark:border-gray-600'
        }`}
      >
        {isCompleted && (
          <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-sm ${isCompleted ? 'text-[#666] dark:text-[#888] line-through' : 'text-[#111] dark:text-[#e5e5e5]'}`}>
        {title}
      </span>
    </div>
  );
}