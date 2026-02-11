'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState } from 'react'
import { Calendar, Clock, Plus, X } from 'lucide-react'

interface AvailabilitySlot {
  id: string
  day: string
  startTime: string
  endTime: string
  timezone: string
}

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([
    { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
    { id: '2', day: 'Tuesday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
    { id: '3', day: 'Wednesday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
    { id: '4', day: 'Thursday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
    { id: '5', day: 'Friday', startTime: '09:00', endTime: '17:00', timezone: 'EST' },
  ])

  const [showAddSlot, setShowAddSlot] = useState(false)
  const [newSlot, setNewSlot] = useState({
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
    timezone: 'EST',
  })

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const addSlot = () => {
    const slot: AvailabilitySlot = {
      id: Date.now().toString(),
      ...newSlot,
    }
    setSlots([...slots, slot])
    setShowAddSlot(false)
    setNewSlot({ day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'EST' })
  }

  const removeSlot = (id: string) => {
    setSlots(slots.filter(slot => slot.id !== id))
  }

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="size-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Availability Management</h2>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa]">Set your weekly availability schedule</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Current Availability */}
          <div className="col-span-2">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5]">Weekly Schedule</h3>
                <button
                  onClick={() => setShowAddSlot(true)}
                  className="px-3 py-1.5 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-md text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors flex items-center gap-2"
                >
                  <Plus className="size-3.5" />
                  Add Slot
                </button>
              </div>

              <div className="space-y-3">
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24">
                        <span className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{slot.day}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-[#666] dark:text-[#aaa]" />
                        <span className="text-sm text-[#111] dark:text-[#e5e5e5]">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <span className="text-xs text-[#666] dark:text-[#aaa]">({slot.timezone})</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSlot(slot.id)}
                      className="p-1.5 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors"
                    >
                      <X className="size-4 text-[#666] dark:text-[#aaa]" />
                    </button>
                  </div>
                ))}

                {slots.length === 0 && (
                  <div className="text-center py-12 text-[#666] dark:text-[#aaa] text-sm">
                    No availability slots set. Click "Add Slot" to get started.
                  </div>
                )}
              </div>

              {/* Add Slot Form */}
              {showAddSlot && (
                <div className="mt-6 p-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-[#fafafa] dark:bg-[#2a2a2a]">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-[#666] dark:text-[#888] mb-1 block">Day</label>
                      <select
                        value={newSlot.day}
                        onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                        className="w-full px-3 py-2 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded-md text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]"
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#666] dark:text-[#888] mb-1 block">Timezone</label>
                      <select
                        value={newSlot.timezone}
                        onChange={(e) => setNewSlot({ ...newSlot, timezone: e.target.value })}
                        className="w-full px-3 py-2 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded-md text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]"
                      >
                        <option value="EST">EST</option>
                        <option value="PST">PST</option>
                        <option value="CST">CST</option>
                        <option value="MST">MST</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#666] dark:text-[#888] mb-1 block">Start Time</label>
                      <input
                        type="time"
                        value={newSlot.startTime}
                        onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                        className="w-full px-3 py-2 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded-md text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#666] dark:text-[#888] mb-1 block">End Time</label>
                      <input
                        type="time"
                        value={newSlot.endTime}
                        onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                        className="w-full px-3 py-2 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded-md text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:border-[#6366f1]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={addSlot}
                      className="px-4 py-2 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-md text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors"
                    >
                      Add Slot
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSlot(false)
                        setNewSlot({ day: 'Monday', startTime: '09:00', endTime: '17:00', timezone: 'EST' })
                      }}
                      className="px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md text-xs font-medium text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="col-span-1">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
              <h3 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-4">Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-[#666] dark:text-[#888] mb-1">Total Hours/Week</div>
                  <div className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5]">
                    {slots.length * 8}h
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#666] dark:text-[#888] mb-1">Available Days</div>
                  <div className="text-lg font-medium text-[#111] dark:text-[#e5e5e5]">{slots.length}</div>
                </div>
                <div>
                  <div className="text-xs text-[#666] dark:text-[#888] mb-1">Status</div>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#d1fae5] dark:bg-green-900/30 text-[#059669] dark:text-green-400 rounded text-xs font-medium">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
