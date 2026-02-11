import { useState } from 'react';
import { Filter, ChevronDown, MoreHorizontal } from 'lucide-react';

interface Application {
  id: string;
  candidate: {
    name: string;
    email: string;
    avatar: string;
    avatarColor: string;
  };
  role: string;
  applied: {
    date: string;
    time: string;
  };
  tags: Array<{
    label: string;
    color: string;
  }>;
  status: {
    label: string;
    color: string;
    bgColor: string;
  };
}

export function ApplicationsPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread' | 'archived'>('all');
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());

  const applications: Application[] = [
    {
      id: '1',
      candidate: {
        name: 'Alex K.',
        email: 'alex.k@mail.com',
        avatar: 'AK',
        avatarColor: '#9ca3af',
      },
      role: 'Senior Frontend Engineer',
      applied: {
        date: 'Oct 24',
        time: '10:30 AM',
      },
      tags: [
        { label: 'React', color: '#3b82f6' },
        { label: 'Senior', color: '#6b7280' },
      ],
      status: {
        label: 'Reviewing',
        color: '#d97706',
        bgColor: '#fef3c7',
      },
    },
    {
      id: '2',
      candidate: {
        name: 'Maria R.',
        email: 'maria@email.co',
        avatar: 'MR',
        avatarColor: '#a78bfa',
      },
      role: 'Product Designer',
      applied: {
        date: 'Oct 23',
        time: '02:15 PM',
      },
      tags: [
        { label: 'Figma', color: '#8b5cf6' },
      ],
      status: {
        label: 'Rejected',
        color: '#dc2626',
        bgColor: '#fee2e2',
      },
    },
    {
      id: '3',
      candidate: {
        name: 'John L.',
        email: 'john.l@acme.co',
        avatar: 'JL',
        avatarColor: '#34d399',
      },
      role: 'Backend Engineer',
      applied: {
        date: 'Oct 22',
        time: '09:00 AM',
      },
      tags: [
        { label: 'Node', color: '#10b981' },
      ],
      status: {
        label: 'Offer Sent',
        color: '#059669',
        bgColor: '#d1fae5',
      },
    },
  ];

  const toggleApplication = (id: string) => {
    const newSelected = new Set(selectedApplications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedApplications(newSelected);
  };

  const toggleAll = () => {
    if (selectedApplications.size === applications.length) {
      setSelectedApplications(new Set());
    } else {
      setSelectedApplications(new Set(applications.map(app => app.id)));
    }
  };

  return (
    <div className="p-8">
      {/* Toolbar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <button className="px-3 py-1.5 bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] rounded-md flex items-center gap-2 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            <Filter className="size-3.5 text-[#666] dark:text-[#aaa]" />
            <span className="text-xs text-[#666] dark:text-[#aaa]">Filter</span>
          </button>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedTab === 'all'
                  ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                  : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedTab('unread')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedTab === 'unread'
                  ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                  : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setSelectedTab('archived')}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedTab === 'archived'
                  ? 'bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] font-medium shadow-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
                  : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
              }`}
            >
              Archived
            </button>
          </div>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#666] dark:text-[#aaa]">Sort by:</span>
          <button className="px-3 py-1.5 bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] rounded-md flex items-center gap-2 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            <span className="text-xs text-[#111] dark:text-[#e5e5e5]">Date Applied</span>
            <ChevronDown className="size-3.5 text-[#666] dark:text-[#aaa]" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedApplications.size === applications.length}
                  onChange={toggleAll}
                  className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Applied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#666] dark:text-[#888]">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application.id}
                className="border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedApplications.has(application.id)}
                    onChange={() => toggleApplication(application.id)}
                    className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                      style={{ backgroundColor: application.candidate.avatarColor }}
                    >
                      {application.candidate.avatar}
                    </div>
                    <div>
                      <div className="text-sm text-[#111] dark:text-[#e5e5e5] font-medium">
                        {application.candidate.name}
                      </div>
                      <div className="text-xs text-[#666] dark:text-[#aaa]">
                        {application.candidate.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{application.role}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-[#666] dark:text-[#aaa]">
                    {application.applied.date}, {application.applied.time}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {application.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded text-[10px] font-medium"
                        style={{
                          color: tag.color,
                          backgroundColor: `${tag.color}15`,
                        }}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      color: application.status.color,
                      backgroundColor: application.status.bgColor,
                    }}
                  >
                    {application.status.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-1 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                    <MoreHorizontal className="size-4 text-[#666] dark:text-[#aaa]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}