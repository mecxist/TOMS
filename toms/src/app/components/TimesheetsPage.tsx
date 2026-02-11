import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface TimeEntry {
  id: string;
  project: string;
  task: string;
  hours: number;
  status: 'approved' | 'pending' | 'rejected';
}

interface DayEntry {
  date: string;
  day: string;
  entries: TimeEntry[];
  totalHours: number;
}

export function TimesheetsPage() {
  const [currentWeek, setCurrentWeek] = useState('Nov 20 - Nov 26, 2023');

  const weekData: DayEntry[] = [
    {
      date: '20',
      day: 'Mon',
      entries: [
        { id: '1', project: 'TalentOS Platform', task: 'Frontend Development', hours: 8, status: 'approved' },
      ],
      totalHours: 8,
    },
    {
      date: '21',
      day: 'Tue',
      entries: [
        { id: '2', project: 'TalentOS Platform', task: 'Frontend Development', hours: 6, status: 'approved' },
        { id: '3', project: 'Internal Tools', task: 'Bug Fixes', hours: 2, status: 'approved' },
      ],
      totalHours: 8,
    },
    {
      date: '22',
      day: 'Wed',
      entries: [
        { id: '4', project: 'TalentOS Platform', task: 'API Integration', hours: 7, status: 'pending' },
      ],
      totalHours: 7,
    },
    {
      date: '23',
      day: 'Thu',
      entries: [],
      totalHours: 0,
    },
    {
      date: '24',
      day: 'Fri',
      entries: [],
      totalHours: 0,
    },
    {
      date: '25',
      day: 'Sat',
      entries: [],
      totalHours: 0,
    },
    {
      date: '26',
      day: 'Sun',
      entries: [],
      totalHours: 0,
    },
  ];

  const weekTotal = weekData.reduce((sum, day) => sum + day.totalHours, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#d1fae5] text-[#059669] rounded text-[10px] font-medium">
            <CheckCircle2 className="size-3" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fef3c7] text-[#d97706] rounded text-[10px] font-medium">
            <Clock className="size-3" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fee2e2] text-[#dc2626] rounded text-[10px] font-medium">
            <AlertCircle className="size-3" />
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">Weekly Timesheet</h2>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Track your hours and submit for approval</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white dark:hover:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] transition-colors">
            <ChevronLeft className="size-4 text-[#666] dark:text-[#aaa]" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)]">
            <Calendar className="size-4 text-[#666] dark:text-[#aaa]" />
            <span className="text-sm text-[#111] dark:text-[#e5e5e5] font-medium">{currentWeek}</span>
          </div>
          <button className="p-2 hover:bg-white dark:hover:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] transition-colors">
            <ChevronRight className="size-4 text-[#666] dark:text-[#aaa]" />
          </button>
        </div>
      </div>

      {/* Weekly Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
          <div className="text-xs text-[#666] dark:text-[#888] mb-1">Total Hours</div>
          <div className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5]">{weekTotal}h</div>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
          <div className="text-xs text-[#666] dark:text-[#888] mb-1">Approved</div>
          <div className="text-2xl font-bold text-[#059669]">16h</div>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
          <div className="text-xs text-[#666] dark:text-[#888] mb-1">Pending</div>
          <div className="text-2xl font-bold text-[#d97706]">7h</div>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
          <div className="text-xs text-[#666] dark:text-[#888] mb-1">Target</div>
          <div className="text-2xl font-bold text-[#111] dark:text-[#e5e5e5]">40h</div>
        </div>
      </div>

      {/* Timesheet Grid */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
          {weekData.map((day, index) => (
            <div
              key={index}
              className={`p-4 text-center border-r border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] last:border-r-0 ${
                day.totalHours > 0 ? 'bg-[#fafafa] dark:bg-[#2a2a2a]' : ''
              }`}
            >
              <div className="text-xs text-[#666] dark:text-[#888] mb-1">{day.day}</div>
              <div className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">{day.date}</div>
              <div className="text-xs font-medium text-[#666] dark:text-[#aaa]">{day.totalHours}h</div>
            </div>
          ))}
        </div>

        {/* Time Entries */}
        <div className="grid grid-cols-7">
          {weekData.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="border-r border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] last:border-r-0 min-h-[300px]"
            >
              {day.entries.length > 0 ? (
                <div className="p-3 space-y-2">
                  {day.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-[#fafafa] dark:bg-[#2a2a2a] rounded-lg p-3 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <div className="text-xs font-medium text-[#111] dark:text-[#e5e5e5] mb-1 line-clamp-1">
                        {entry.project}
                      </div>
                      <div className="text-[10px] text-[#666] dark:text-[#aaa] mb-2 line-clamp-1">
                        {entry.task}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5]">{entry.hours}h</span>
                        {getStatusBadge(entry.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-4">
                  <button className="text-xs text-[#999] dark:text-[#888] hover:text-[#666] dark:hover:text-[#aaa] transition-colors">
                    + Add Entry
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors">
          Submit Timesheet for Approval
        </button>
      </div>
    </div>
  );
}