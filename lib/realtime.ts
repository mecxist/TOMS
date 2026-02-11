import Pusher from 'pusher'
import PusherClient from 'pusher-js'

// Server-side Pusher instance (only initialize if keys are present)
export const pusherServer = process.env.PUSHER_APP_ID && process.env.PUSHER_SECRET
  ? new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || '',
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
      useTLS: true,
    })
  : null

// Client-side Pusher instance (use in components)
export function getPusherClient() {
  const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY
  if (!key) {
    console.warn('Pusher key not configured')
    // Return a mock client that does nothing
    return {
      subscribe: () => ({
        bind: () => {},
        unbind: () => {},
        bind_global: () => {},
        unbind_global: () => {},
      }),
      unsubscribe: () => {},
      disconnect: () => {},
    } as any
  }
  return new PusherClient(key, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  })
}

// Real-time event types
export const REALTIME_EVENTS = {
  CANDIDATE_STATUS_CHANGED: 'candidate.status_changed',
  INTERVIEW_SCHEDULED: 'interview.scheduled',
  TIMESHEET_SUBMITTED: 'timesheet.submitted',
  ASSIGNMENT_CREATED: 'assignment.created',
  COMMENT_ADDED: 'comment.added',
} as const

// Channel names
export const CHANNELS = {
  PIPELINE: 'pipeline',
  INTERVIEWS: 'interviews',
  TIMESHEETS: 'timesheets',
  ASSIGNMENTS: 'assignments',
  manager: (managerId: string) => `manager.${managerId}`,
  talent: (talentId: string) => `talent.${talentId}`,
} as const

// Helper to trigger real-time events
export async function triggerRealtimeEvent(
  channel: string,
  event: string,
  data: any
) {
  try {
    if (!pusherServer) {
      console.warn('Pusher not configured, skipping real-time event')
      return { success: false, error: 'Pusher not configured' }
    }
    await pusherServer.trigger(channel, event, data)
    return { success: true }
  } catch (error) {
    console.error('Pusher trigger error:', error)
    return { success: false, error }
  }
}

// Batch trigger for multiple channels
export async function triggerBatchEvents(
  events: Array<{ channel: string; name: string; data: any }>
) {
  try {
    if (!pusherServer) {
      console.warn('Pusher not configured, skipping batch events')
      return { success: false, error: 'Pusher not configured' }
    }
    await pusherServer.triggerBatch(events)
    return { success: true }
  } catch (error) {
    console.error('Pusher batch trigger error:', error)
    return { success: false, error }
  }
}
