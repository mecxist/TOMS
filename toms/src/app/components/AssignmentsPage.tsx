import { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  project: string;
  projectColor: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
}

export function AssignmentsPage() {
  const [availability, setAvailability] = useState<'full-time' | 'part-time' | 'unavailable'>('full-time');
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement user authentication flow',
      project: 'TalentOS Platform',
      projectColor: '#6366f1',
      dueDate: 'Nov 28',
      priority: 'high',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Design system documentation',
      project: 'Internal Tools',
      projectColor: '#8b5cf6',
      dueDate: 'Nov 30',
      priority: 'medium',
      status: 'todo',
    },
    {
      id: '3',
      title: 'Fix responsive layout issues',
      project: 'TalentOS Platform',
      projectColor: '#6366f1',
      dueDate: 'Nov 25',
      priority: 'high',
      status: 'in-progress',
    },
    {
      id: '4',
      title: 'Update landing page copy',
      project: 'Marketing Site',
      projectColor: '#f59e0b',
      dueDate: 'Dec 2',
      priority: 'low',
      status: 'todo',
    },
  ]);

  const myProjects = [
    { id: '1', name: 'TalentOS Platform', role: 'Frontend Engineer', color: '#6366f1', hours: 25 },
    { id: '2', name: 'Internal Tools', role: 'Developer', color: '#8b5cf6', hours: 10 },
    { id: '3', name: 'Marketing Site', role: 'Consultant', color: '#f59e0b', hours: 5 },
  ];

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'completed' ? 'todo' : 'completed'
        };
      }
      return task;
    }));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-0.5 bg-[#fee2e2] text-[#dc2626] rounded text-[10px] font-medium">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 bg-[#fef3c7] text-[#d97706] rounded text-[10px] font-medium">Medium</span>;
      case 'low':
        return <span className="px-2 py-0.5 bg-[#e0e7ff] text-[#6366f1] rounded text-[10px] font-medium">Low</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#d1fae5] text-[#059669] rounded text-[10px] font-medium">
            <CheckCircle2 className="size-3" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#dbeafe] text-[#2563eb] rounded text-[10px] font-medium">
            <Clock className="size-3" />
            In Progress
          </span>
        );
      case 'todo':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f5f5f5] text-[#666] rounded text-[10px] font-medium">
            <AlertCircle className="size-3" />
            To Do
          </span>
        );
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-1">My Work</h2>
        <p className="text-sm text-[#666] dark:text-[#aaa]">Manage your availability, projects, and tasks</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Availability */}
        <div className="col-span-1 space-y-6">
          {/* Availability Card */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="size-5 text-[#6366f1]" />
              <h3 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">My Availability</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#666] dark:text-[#888] mb-2 block">Status</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === 'full-time'}
                      onChange={() => setAvailability('full-time')}
                      className="size-4"
                    />
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Available Full-Time</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === 'part-time'}
                      onChange={() => setAvailability('part-time')}
                      className="size-4"
                    />
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Available Part-Time</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === 'unavailable'}
                      onChange={() => setAvailability('unavailable')}
                      className="size-4"
                    />
                    <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Unavailable</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#666] dark:text-[#888] mb-2 block">Hours Per Week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded-lg text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]"
                />
              </div>

              <button className="w-full bg-[#111] dark:bg-white text-white dark:text-[#111] px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors">
                Update Availability
              </button>
            </div>
          </div>

          {/* My Projects Card */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="size-5 text-[#8b5cf6]" />
              <h3 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">My Projects</h3>
            </div>

            <div className="space-y-3">
              {myProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className="size-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-1">{project.name}</div>
                      <div className="text-xs text-[#666] dark:text-[#aaa]">{project.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#999] dark:text-[#888] mt-2">{project.hours}h/week</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tasks */}
        <div className="col-span-2">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
            <div className="p-6 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
              <h3 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">My Tasks</h3>
            </div>

            <div className="divide-y divide-[rgba(0,0,0,0.05)] dark:divide-[rgba(255,255,255,0.1)]">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="mt-1 size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{task.title}</h4>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="size-2 rounded-full"
                            style={{ backgroundColor: task.projectColor }}
                          />
                          <span className="text-xs text-[#666] dark:text-[#aaa]">{task.project}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#666] dark:text-[#aaa]">
                          <Calendar className="size-3" />
                          {task.dueDate}
                        </div>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}