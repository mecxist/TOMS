'use client'

import { useEffect, useState } from 'react'
import { getPusherClient } from '@/lib/realtime'
import { useRouter } from 'next/navigation'

export function useRealtimeUpdates(channel: string, event?: string) {
  const [data, setData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const pusher = getPusherClient()
    const ch = pusher.subscribe(channel)

    const handleUpdate = (eventData: any) => {
      setData(eventData)
      // Trigger a router refresh to update server components
      router.refresh()
    }

    if (event) {
      ch.bind(event, handleUpdate)
    } else {
      // Bind to all events if no specific event provided
      ch.bind_global(handleUpdate)
    }

    return () => {
      if (event) {
        ch.unbind(event, handleUpdate)
      } else {
        ch.unbind_global(handleUpdate)
      }
      pusher.unsubscribe(channel)
      pusher.disconnect()
    }
  }, [channel, event, router])

  return data
}

// Specific hook for pipeline updates
export function usePipelineUpdates() {
  return useRealtimeUpdates('pipeline', 'candidate.status_changed')
}

// Specific hook for timesheet updates (managers)
export function useTimesheetUpdates(managerId: string) {
  return useRealtimeUpdates(`manager.${managerId}`, 'timesheet.submitted')
}

// Specific hook for assignment updates (talent)
export function useAssignmentUpdates(talentId: string) {
  return useRealtimeUpdates(`talent.${talentId}`, 'assignment.created')
}
