import { useState } from 'react';
import { Users, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  initials: string;
  role: string;
  avatarColor: string;
  capacity: number;
  allocated: number;
  availability: 'available' | 'partial' | 'unavailable';
  projects: Array<{
    name: string;
    hours: number;
    color: string;
  }>;
}

export function ResourcePlanningPage() {
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');

  const resources: Resource[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      initials: 'SC',
      role: 'Senior Frontend Engineer',
      avatarColor: '#6366f1',
      capacity: 40,
      allocated: 35,
      availability: 'available',
      projects: [
        { name: 'TalentOS Platform', hours: 25, color: '#6366f1' },
        { name: 'Internal Tools', hours: 10, color: '#8b5cf6' },
      ],
    },
    {
      id: '2',
      name: 'James Wilson',
      initials: 'JW',
      role: 'Product Designer',
      avatarColor: '#10b981',
      capacity: 40,
      allocated: 40,
      availability: 'unavailable',
      projects: [
        { name: 'TalentOS Platform', hours: 30, color: '#6366f1' },
        { name: 'Marketing Site', hours: 10, color: '#f59e0b' },
      ],
    },
    {
      id: '3',
      name: 'Emma Davis',
      initials: 'ED',
      role: 'Backend Engineer',
      avatarColor: '#3b82f6',
      capacity: 40,
      allocated: 20,
      availability: 'available',
      projects: [
        { name: 'API Development', hours: 20, color: '#10b981' },
      ],
    },
    {
      id: '4',
      name: 'Michael Brown',
      initials: 'MB',
      role: 'Full Stack Engineer',
      avatarColor: '#f59e0b',
      capacity: 40,
      allocated: 28,
      availability: 'partial',
      projects: [
        { name: 'TalentOS Platform', hours: 15, color: '#6366f1' },
        { name: 'Client Project', hours: 13, color: '#ef4444' },
      ],
    },
  ];

  const totalCapacity = resources.reduce((sum, r) => sum + r.capacity, 0);
  const totalAllocated = resources.reduce((sum, r) => sum + r.allocated, 0);
  const utilizationRate = Math.round((totalAllocated / totalCapacity) * 100);

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#d1fae5] text-[#059669] rounded text-[10px] font-medium">
            <CheckCircle2 className="size-3" />
            Available
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fef3c7] text-[#d97706] rounded text-[10px] font-medium">
            <AlertCircle className="size-3" />
            Partial
          </span>
        );
      case 'unavailable':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fee2e2] text-[#dc2626] rounded text-[10px] font-medium">
            <AlertCircle className="size-3" />
            Full
          </span>
        );
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">Resource Planning</h2>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Team capacity and project allocation overview</p>
        </div>
        <div className="flex items-center gap-1 bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] rounded-lg p-1">
          <button
            onClick={() => setSelectedView('week')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              selectedView === 'week'
                ? 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
                : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedView('month')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              selectedView === 'month'
                ? 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
                : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] text-[#999] dark:text-[#888] font-medium tracking-wide uppercase">Total Resources</span>
            <Users className="size-4 text-[#eb3a14]" />
          </div>
          <div className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5]">{resources.length}</div>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] text-[#999] dark:text-[#888] font-medium tracking-wide uppercase">Total Capacity</span>
            <Calendar className="size-4 text-[#6366f1]" />
          </div>
          <div className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5]">{totalCapacity}h</div>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] text-[#999] dark:text-[#888] font-medium tracking-wide uppercase">Allocated</span>
            <CheckCircle2 className="size-4 text-[#10b981]" />
          </div>
          <div className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5]">{totalAllocated}h</div>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] text-[#999] dark:text-[#888] font-medium tracking-wide uppercase">Utilization</span>
            <AlertCircle className="size-4 text-[#f59e0b]" />
          </div>
          <div className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5]">{utilizationRate}%</div>
        </div>
      </div>

      {/* Resource Table */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide">Resource</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide">Projects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide">Allocation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide">Availability</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => {
              const utilizationPercent = (resource.allocated / resource.capacity) * 100;
              return (
                <tr
                  key={resource.id}
                  className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-9 rounded-full flex items-center justify-center text-[10px] font-medium text-white"
                        style={{ backgroundColor: resource.avatarColor }}
                      >
                        {resource.initials}
                      </div>
                      <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{resource.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#666] dark:text-[#aaa]">{resource.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      {resource.projects.map((project, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="size-2 rounded-full"
                            style={{ backgroundColor: project.color }}
                          />
                          <span className="text-xs text-[#666] dark:text-[#aaa]">
                            {project.name} ({project.hours}h)
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#666] dark:text-[#aaa]">
                          {resource.allocated}h / {resource.capacity}h
                        </span>
                        <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5]">
                          {Math.round(utilizationPercent)}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#f5f5f5] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${utilizationPercent}%`,
                            background:
                              utilizationPercent >= 100
                                ? 'linear-gradient(90deg, #fca5a5 0%, #f87171 50%, #dc2626 100%)'
                                : utilizationPercent >= 80
                                ? 'linear-gradient(90deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%)'
                                : 'linear-gradient(90deg, #6ee7b7 0%, #34d399 50%, #10b981 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getAvailabilityBadge(resource.availability)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}