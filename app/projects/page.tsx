'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState } from 'react'
import { Plus, Users, Link2, FolderKanban } from 'lucide-react'

type ViewType = 'timeline' | 'gantt' | 'calendar' | 'kanban' | 'roadmap'

export default function ProjectsPage() {
  const [activeView, setActiveView] = useState<ViewType>('kanban')

  // Team members for kanban view
  const teamMembers = [
    { initials: 'SK', color: '#a855f7' },
    { initials: 'JD', color: '#60a5fa' },
    { initials: 'MR', color: '#9ca3af' },
  ]

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-[#f5f5f5] dark:bg-[#2a2a2a] p-8">
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <FolderKanban className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Projects</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Projects and team capacity</p>
        </div>
        {/* View Tabs Bar */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 mb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ViewTab
                label="Timeline"
                isActive={activeView === 'timeline'}
                onClick={() => setActiveView('timeline')}
              />
              <ViewTab
                label="Gantt Chart"
                isActive={activeView === 'gantt'}
                onClick={() => setActiveView('gantt')}
              />
              <ViewTab
                label="Calendar"
                isActive={activeView === 'calendar'}
                onClick={() => setActiveView('calendar')}
              />
              <ViewTab
                label="Kanban Board"
                isActive={activeView === 'kanban'}
                onClick={() => setActiveView('kanban')}
              />
              <ViewTab
                label="Roadmap"
                isActive={activeView === 'roadmap'}
                onClick={() => setActiveView('roadmap')}
              />
            </div>
            <div className="flex items-center gap-3">
              {/* Team avatars - only show on kanban view */}
              {activeView === 'kanban' && (
                <div className="flex items-center -space-x-2">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="size-8 rounded-full flex items-center justify-center text-[10px] font-medium text-white border-2 border-white dark:border-[#1e1e1e] shadow-sm"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.initials}
                    </div>
                  ))}
                </div>
              )}
              <button className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-4 py-2 rounded text-xs font-medium flex items-center gap-2 hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors">
                <Plus className="size-3.5" />
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 overflow-auto scroller min-h-0 ${activeView === 'roadmap' ? 'p-0' : 'pt-0'}`}>
          {activeView === 'timeline' && <TimelineView />}
          {activeView === 'gantt' && <GanttView />}
          {activeView === 'calendar' && <CalendarView />}
          {activeView === 'kanban' && <KanbanView />}
          {activeView === 'roadmap' && <RoadmapView />}
        </div>
      </div>
    </AppLayout>
  )
}

interface ViewTabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function ViewTab({ label, isActive, onClick }: ViewTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-medium rounded transition-colors ${
        isActive
          ? 'bg-[#ececf0] dark:bg-[#27272a] text-[#111] dark:text-[#e5e5e5] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]'
          : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.05)]'
      }`}
    >
      {label}
    </button>
  )
}

// Timeline View
function TimelineView() {
  const events = [
    {
      id: 1,
      date: 'OCT 15, 2023',
      title: 'Project Kickoff',
      description: 'Initial stakeholder meeting and requirement gathering for the Fintech migration.',
      status: 'completed',
      color: '#eb3a14',
    },
    {
      id: 2,
      date: 'NOV 03, 2023',
      title: 'Core Architecture Design',
      description: 'System design and database schema finalization.',
      status: 'in-progress',
      color: '#999',
      assignees: 3,
    },
  ]

  return (
    <div className="max-w-4xl">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)]" />

        {/* Events */}
        <div className="space-y-8">
          {events.map((event) => (
            <div key={event.id} className="relative flex gap-6">
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0 mt-1">
                <div
                  className="size-4 rounded-full border-4 border-white dark:border-[#1e1e1e] shadow-sm"
                  style={{ backgroundColor: event.color }}
                />
              </div>

              {/* Event Card */}
              <div className="flex-1 mb-6">
                <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] text-[#eb3a14] font-medium tracking-wide mb-2">
                        {event.date}
                      </div>
                      <h3 className="font-medium text-[#111] dark:text-[#e5e5e5] mb-2">{event.title}</h3>
                      <p className="text-xs text-[#666] dark:text-[#aaa] leading-relaxed">{event.description}</p>
                    </div>
                    {event.status === 'completed' && (
                      <span className="px-3 py-1 bg-[#d4f4dd] dark:bg-green-900/30 text-[#0d7c2e] dark:text-green-400 text-[10px] font-medium rounded">
                        Completed
                      </span>
                    )}
                    {event.status === 'in-progress' && (
                      <span className="px-3 py-1 bg-[#d4e7ff] dark:bg-blue-900/30 text-[#0066cc] dark:text-blue-400 text-[10px] font-medium rounded">
                        In Progress
                      </span>
                    )}
                  </div>
                  {event.assignees && (
                    <div className="flex items-center gap-2 mt-4">
                      <Users className="size-3.5 text-[#666] dark:text-[#888]" />
                      <span className="text-[10px] text-[#666] dark:text-[#888]">{event.assignees}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Gantt View
function GanttView() {
  const tasks = [
    { id: 1, name: 'Research Phase', assignee: 'Sarah P.', barLabel: 'Research', start: 0, duration: 1.5, color: '#3b82f6' },
    { id: 2, name: 'Design System', assignee: 'Sarah K.', barLabel: 'Prototyping', start: 1.2, duration: 2.3, color: '#a855f7' },
    { id: 3, name: 'Frontend Dev', assignee: 'Alex K.', barLabel: 'Implementation', start: 2.2, duration: 1.8, color: '#10b981' },
  ]

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[280px_1fr] border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)]">
        <div className="px-6 py-3 bg-[#fafafa] dark:bg-[#2a2a2a] border-r border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)]">
          <span className="text-[10px] font-medium text-[#666] dark:text-[#888] uppercase tracking-wider">TASK</span>
        </div>
        <div className="grid grid-cols-4 bg-[#fafafa] dark:bg-[#2a2a2a]">
          {weeks.map((week) => (
            <div key={week} className="px-4 py-3 text-center border-l border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] first:border-l-0">
              <span className="text-[10px] font-medium text-[#666] dark:text-[#888]">{week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="grid grid-cols-[280px_1fr] border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] last:border-b-0 hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a]/50 transition-colors">
            <div className="px-6 py-6 border-r border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e]">
              <div className="font-medium text-sm text-[#111] dark:text-[#e5e5e5] mb-0.5">{task.name}</div>
              <div className="text-xs text-[#666] dark:text-[#888]">{task.assignee}</div>
            </div>
            <div className="grid grid-cols-4 relative bg-white dark:bg-[#1e1e1e] py-6">
              {weeks.map((_, index) => (
                <div key={index} className="border-l border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] first:border-l-0" />
              ))}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-7 rounded flex items-center px-3 shadow-sm"
                style={{
                  backgroundColor: task.color,
                  left: `${(task.start / 4) * 100}%`,
                  width: `${(task.duration / 4) * 100}%`,
                }}
              >
                <span className="text-white text-[11px] font-medium truncate">{task.barLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Calendar View
function CalendarView() {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const calendarDays = [
    { day: 29, events: [] },
    { day: 30, events: [] },
    { day: 1, events: [{ name: 'Kickoff', color: '#4a90e2' }] },
    { day: 2, events: [] },
    { day: 3, events: [{ name: 'Design Review', color: '#2ecc71' }] },
    { day: 4, events: [] },
    { day: 5, events: [] },
    { day: 6, events: [] },
    { day: 7, events: [] },
    { day: 8, events: [{ name: 'Sprint Start', color: '#e8a0bf' }, { name: 'Client Call', color: '#f5a623' }] },
    { day: 9, events: [] },
    { day: 10, events: [] },
    { day: 11, events: [] },
    { day: 12, events: [] },
  ]

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        {daysOfWeek.map((day) => (
          <div key={day} className="px-4 py-3 bg-[#fafafa] dark:bg-[#2a2a2a] text-center border-r border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] last:border-r-0">
            <span className="text-xs font-medium text-[#666] dark:text-[#aaa]">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((dayData, index) => (
          <div
            key={index}
            className="min-h-[120px] border-r border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-3 hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <div className="text-xs text-[#666] dark:text-[#888] mb-2">{dayData.day}</div>
            <div className="space-y-1">
              {dayData.events.map((event, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded text-[10px] font-medium"
                  style={{ backgroundColor: event.color, color: 'white' }}
                >
                  {event.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Kanban View
interface KanbanTask {
  id: number
  title: string
  hasLink?: boolean
  dueDate?: string
  dueDateColor?: string
  assignee?: string
  avatarColor?: string
  statusDot?: boolean
  dotColor?: string
}

interface KanbanColumn {
  id: string
  title: string
  count: number
  tasks: KanbanTask[]
}

function KanbanView() {
  const columns: KanbanColumn[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      count: 4,
      tasks: [
        { id: 1, title: 'Update API Documentation for Q4 release', hasLink: true, assignee: 'MR', avatarColor: '#9ca3af' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      count: 2,
      tasks: [
        { id: 2, title: 'Implement Auth0 Integration', dueDate: 'Due Oct 24', dueDateColor: '#60a5fa', assignee: 'JD', avatarColor: '#60a5fa' },
        { id: 3, title: 'Redesign Landing Page Hero', dueDate: 'Due Nov 02', dueDateColor: '#a855f7', assignee: 'SK', avatarColor: '#a855f7' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      count: 10,
      tasks: [
        { id: 4, title: 'AB Supporting Modules', statusDot: true, dotColor: '#10b981' },
      ],
    },
  ]

  return (
    <div className="flex gap-6">
      {columns.map((column) => (
        <div key={column.id} className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{column.title}</h3>
            <span className="text-sm text-[#666] dark:text-[#888]">{column.count}</span>
          </div>
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] hover:shadow-sm transition-all cursor-pointer p-4"
              >
                <h4 className="text-sm text-[#111] dark:text-[#e5e5e5] leading-relaxed mb-4">{task.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {task.hasLink && <Link2 className="size-3.5 text-[#666] dark:text-[#888]" />}
                    {task.dueDate && (
                      <span className="text-xs font-medium" style={{ color: task.dueDateColor }}>
                        {task.dueDate}
                      </span>
                    )}
                    {task.statusDot && (
                      <div className="size-2 rounded-full" style={{ backgroundColor: task.dotColor }} />
                    )}
                  </div>
                  {task.assignee && (
                    <div
                      className="size-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white"
                      style={{ backgroundColor: task.avatarColor }}
                    >
                      {task.assignee}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Roadmap View
function RoadmapView() {
  const quarters = [
    {
      id: 'q4-2023',
      title: 'Q4 2023',
      projects: [
        { id: 1, title: 'MVP Launch', description: 'Core features release', status: 'on-track', color: '#22c55e' },
        { id: 2, title: 'Legacy Migration', description: 'Data transfer', status: 'at-risk', color: '#f59e0b' },
      ],
    },
    {
      id: 'q1-2024',
      title: 'Q1 2024',
      projects: [
        { id: 3, title: 'Mobile App Beta', description: 'iOS & Android', status: 'planned', color: '#8b5cf6' },
      ],
    },
    { id: 'q2-2024', title: 'Q2 2024', projects: [] },
    { id: 'q3-2024', title: 'Q3 2024', projects: [] },
  ]

  return (
    <div className="flex gap-4 h-full p-8">
      {quarters.map((quarter) => (
        <div key={quarter.id} className="flex-1 bg-[#d9d9d9] dark:bg-[#2a2a2a] rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-xs font-medium text-[#666] dark:text-[#aaa] uppercase tracking-wide">{quarter.title}</h3>
          </div>
          <div className="space-y-4">
            {quarter.projects.length > 0 ? (
              quarter.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-[#1e1e1e] rounded p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h4 className="font-medium text-sm text-[#111] dark:text-[#e5e5e5] mb-1">{project.title}</h4>
                  {project.description && (
                    <p className="text-xs text-[#666] dark:text-[#888] mb-3">{project.description}</p>
                  )}
                  {project.status && (
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ backgroundColor: project.color }} />
                      <span className="text-xs text-[#666] dark:text-[#aaa]">
                        {project.status === 'on-track' ? 'On Track' : project.status === 'at-risk' ? 'At Risk' : 'Planned'}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-[#666] dark:text-[#888]">Planning in progress...</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
