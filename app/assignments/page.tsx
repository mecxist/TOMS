'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle2, AlertCircle, Briefcase, Plus, X, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'

// --- Shared types ---

interface Task {
  id: string
  title: string
  project: string
  projectColor: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'completed'
}

interface AvailabilitySlot {
  id: string
  day: string
  startTime: string
  endTime: string
  timezone: string
}

// --- Shared data ---

const initialTasks: Task[] = [
  { id: '1', title: 'Implement user authentication flow', project: 'TOMS Platform', projectColor: '#6366f1', dueDate: 'Nov 28', priority: 'high', status: 'in-progress' },
  { id: '2', title: 'Design system documentation', project: 'Internal Tools', projectColor: '#8b5cf6', dueDate: 'Nov 30', priority: 'medium', status: 'todo' },
  { id: '3', title: 'Fix responsive layout issues', project: 'TOMS Platform', projectColor: '#6366f1', dueDate: 'Nov 25', priority: 'high', status: 'in-progress' },
  { id: '4', title: 'Update landing page copy', project: 'Marketing Site', projectColor: '#f59e0b', dueDate: 'Dec 2', priority: 'low', status: 'todo' },
]

const myProjects = [
  { id: '1', name: 'TOMS Platform', role: 'Frontend Engineer', color: '#6366f1', hours: 25 },
  { id: '2', name: 'Internal Tools', role: 'Developer', color: '#8b5cf6', hours: 10 },
  { id: '3', name: 'Marketing Site', role: 'Consultant', color: '#f59e0b', hours: 5 },
]

const initialSlots: AvailabilitySlot[] = [
  { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
  { id: '2', day: 'Tuesday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
  { id: '3', day: 'Wednesday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
  { id: '4', day: 'Thursday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
  { id: '5', day: 'Friday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
]

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// --- Badge helpers ---

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'high':
      return <span className="px-2 py-0.5 bg-[#fee2e2] dark:bg-red-900/30 text-[#dc2626] dark:text-red-400 rounded text-[10px] font-medium">High</span>
    case 'medium':
      return <span className="px-2 py-0.5 bg-[#fef3c7] dark:bg-yellow-900/30 text-[#d97706] dark:text-yellow-400 rounded text-[10px] font-medium">Medium</span>
    case 'low':
      return <span className="px-2 py-0.5 bg-[#e0e7ff] dark:bg-blue-900/30 text-[#6366f1] dark:text-blue-400 rounded text-[10px] font-medium">Low</span>
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#d1fae5] dark:bg-green-900/30 text-[#059669] dark:text-green-400 rounded text-[10px] font-medium">
          <CheckCircle2 className="size-3" />
          Completed
        </span>
      )
    case 'in-progress':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#dbeafe] dark:bg-blue-900/30 text-[#2563eb] dark:text-blue-400 rounded text-[10px] font-medium">
          <Clock className="size-3" />
          In Progress
        </span>
      )
    case 'todo':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded text-[10px] font-medium">
          <AlertCircle className="size-3" />
          To Do
        </span>
      )
  }
}

// --- Weekly Schedule Panel (folded availability) ---

function WeeklySchedulePanel() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(initialSlots)
  const [expanded, setExpanded] = useState(false)
  const [showAddSlot, setShowAddSlot] = useState(false)
  const [newSlot, setNewSlot] = useState({ day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'EST' })

  const addSlot = () => {
    setSlots([...slots, { id: Date.now().toString(), ...newSlot }])
    setShowAddSlot(false)
    setNewSlot({ day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'EST' })
  }

  const removeSlot = (id: string) => {
    setSlots(slots.filter(s => s.id !== id))
  }

  const totalHours = slots.length * 8

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-[rgba(0,0,0,0.01)] dark:hover:bg-[rgba(255,255,255,0.02)] transition-colors rounded-lg"
      >
        <div className="flex items-center gap-3">
          <Calendar className="size-4 text-[#6366f1]" />
          <span className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5]">Weekly Schedule</span>
          <span className="text-[10px] text-[#666] dark:text-[#aaa]">{slots.length} days · {totalHours}h</span>
        </div>
        {expanded ? <ChevronUp className="size-4 text-[#666] dark:text-[#aaa]" /> : <ChevronDown className="size-4 text-[#666] dark:text-[#aaa]" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] pt-3">
          {slots.map(slot => (
            <div key={slot.id} className="flex items-center justify-between p-3 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#111] dark:text-[#e5e5e5] w-20">{slot.day}</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3 text-[#666] dark:text-[#aaa]" />
                  <span className="text-xs text-[#111] dark:text-[#e5e5e5]">{slot.startTime} – {slot.endTime}</span>
                  <span className="text-[10px] text-[#666] dark:text-[#aaa]">({slot.timezone})</span>
                </div>
              </div>
              <button onClick={() => removeSlot(slot.id)} className="p-1 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
                <X className="size-3.5 text-[#666] dark:text-[#aaa]" />
              </button>
            </div>
          ))}

          {slots.length === 0 && (
            <div className="text-center py-6 text-[#666] dark:text-[#aaa] text-xs">No slots set.</div>
          )}

          {showAddSlot ? (
            <div className="p-3 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-[#fafafa] dark:bg-[#2a2a2a]">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[10px] text-[#666] dark:text-[#888] mb-1 block">Day</label>
                  <select value={newSlot.day} onChange={e => setNewSlot({ ...newSlot, day: e.target.value })} className="w-full px-2 py-1.5 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded text-xs text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]">
                    {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#666] dark:text-[#888] mb-1 block">Timezone</label>
                  <select value={newSlot.timezone} onChange={e => setNewSlot({ ...newSlot, timezone: e.target.value })} className="w-full px-2 py-1.5 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded text-xs text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]">
                    {['EST', 'PST', 'CST', 'MST', 'UTC'].map(tz => <option key={tz} value={tz}>{tz}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#666] dark:text-[#888] mb-1 block">Start</label>
                  <input type="time" value={newSlot.startTime} onChange={e => setNewSlot({ ...newSlot, startTime: e.target.value })} className="w-full px-2 py-1.5 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded text-xs text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]" />
                </div>
                <div>
                  <label className="text-[10px] text-[#666] dark:text-[#888] mb-1 block">End</label>
                  <input type="time" value={newSlot.endTime} onChange={e => setNewSlot({ ...newSlot, endTime: e.target.value })} className="w-full px-2 py-1.5 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded text-xs text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={addSlot} className="px-3 py-1.5 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors">Add</button>
                <button onClick={() => { setShowAddSlot(false); setNewSlot({ day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'EST' }) }} className="px-3 py-1.5 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-xs font-medium text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAddSlot(true)} className="w-full py-2 border border-dashed border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg text-xs text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] hover:border-[rgba(0,0,0,0.2)] dark:hover:border-[rgba(255,255,255,0.2)] transition-colors flex items-center justify-center gap-1.5">
              <Plus className="size-3" />
              Add Slot
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// --- Talent View ---

function TalentAssignmentsView() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [taskFilter, setTaskFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all')

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t))
  }

  const assignedHours = myProjects.reduce((sum, p) => sum + p.hours, 0)
  const availableHours = 40
  const utilization = Math.round((assignedHours / availableHours) * 100)

  const highPriorityPending = tasks.filter(t => t.priority === 'high' && t.status !== 'completed')
  const filteredTasks = taskFilter === 'all' ? tasks : tasks.filter(t => t.status === taskFilter)

  return (
    <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="size-5 text-[#6366f1]" />
          <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Assignments</h2>
        </div>
        <p className="text-sm text-[#666] dark:text-[#aaa]">Manage your schedule, projects, and tasks</p>
      </div>

      {/* Urgent tasks callout */}
      {highPriorityPending.length > 0 && (
        <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-lg flex items-center gap-3">
          <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="text-xs text-amber-800 dark:text-amber-300">
            {highPriorityPending.length} high-priority {highPriorityPending.length === 1 ? 'task needs' : 'tasks need'} attention
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-4">
          {/* Utilization Summary */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
            <div className="text-xs text-[#666] dark:text-[#888] mb-2">Utilization</div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5]">{assignedHours}h</span>
              <span className="text-xs text-[#666] dark:text-[#aaa] mb-1">/ {availableHours}h</span>
            </div>
            <div className="h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${utilization > 90 ? 'bg-red-500' : utilization > 70 ? 'bg-amber-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(utilization, 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-[#999] dark:text-[#666] mt-1">{utilization}% utilized</div>
          </div>

          {/* Weekly Schedule (collapsed by default) */}
          <WeeklySchedulePanel />

          {/* My Projects */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="size-4 text-[#8b5cf6]" />
              <h3 className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5]">My Projects</h3>
            </div>
            <div className="space-y-2">
              {myProjects.map(project => (
                <div key={project.id} className="p-2.5 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg">
                  <div className="flex items-start gap-2 mb-1">
                    <div className="size-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: project.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[#111] dark:text-[#e5e5e5]">{project.name}</div>
                      <div className="text-[10px] text-[#666] dark:text-[#aaa]">{project.role}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#666] dark:text-[#888] ml-4">{project.hours}h/week</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tasks */}
        <div className="col-span-2">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] overflow-hidden">
            <div className="p-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#111] dark:text-[#e5e5e5]">My Tasks</h3>
              <div className="flex items-center gap-1">
                {(['all', 'todo', 'in-progress', 'completed'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setTaskFilter(f)}
                    className={`px-2 py-1 text-[10px] rounded transition-colors ${
                      taskFilter === f
                        ? 'bg-[#111] dark:bg-white text-white dark:text-[#111] font-medium'
                        : 'text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'todo' ? 'To Do' : f === 'in-progress' ? 'In Progress' : 'Done'}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-[rgba(0,0,0,0.05)] dark:divide-[rgba(255,255,255,0.1)]">
              {filteredTasks.map(task => (
                <div key={task.id} className="p-4 hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="mt-0.5 size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'text-[#999] dark:text-[#666] line-through' : 'text-[#111] dark:text-[#e5e5e5]'}`}>{task.title}</h4>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="size-2 rounded-full" style={{ backgroundColor: task.projectColor }} />
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
              {filteredTasks.length === 0 && (
                <div className="p-8 text-center text-xs text-[#666] dark:text-[#aaa]">No tasks match this filter.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Admin/Manager/Coordinator View (original) ---

function AdminAssignmentsView() {
  const [availability, setAvailability] = useState<'full-time' | 'part-time' | 'unavailable'>('full-time')
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t))
  }

  return (
    <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="size-5 text-[#6366f1]" />
          <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Assignments</h2>
        </div>
        <p className="text-sm text-[#666] dark:text-[#aaa]">Manage your availability, projects, and tasks</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
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
                  {(['full-time', 'part-time', 'unavailable'] as const).map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="availability" checked={availability === opt} onChange={() => setAvailability(opt)} className="size-4" />
                      <span className="text-sm text-[#111] dark:text-[#e5e5e5]">
                        {opt === 'full-time' ? 'Available Full-Time' : opt === 'part-time' ? 'Available Part-Time' : 'Unavailable'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-[#666] dark:text-[#888] mb-2 block">Hours Per Week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={e => setHoursPerWeek(Number(e.target.value))}
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
              {myProjects.map(project => (
                <div key={project.id} className="p-3 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="size-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: project.color }} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-1">{project.name}</div>
                      <div className="text-xs text-[#666] dark:text-[#aaa]">{project.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#666] dark:text-[#888] mt-2">{project.hours}h/week</div>
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
              {tasks.map(task => (
                <div key={task.id} className="p-6 hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer">
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
                          <div className="size-2 rounded-full" style={{ backgroundColor: task.projectColor }} />
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
  )
}

// --- Main Page ---

export default function AssignmentsPage() {
  const [isTalent, setIsTalent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const role = sessionStorage.getItem('demo_user_role')
    setIsTalent(role === 'talent')
  }, [])

  if (!mounted) return null

  return (
    <AppLayout>
      {isTalent ? <TalentAssignmentsView /> : <AdminAssignmentsView />}
    </AppLayout>
  )
}
