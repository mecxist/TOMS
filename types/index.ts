import { 
  User, 
  Profile, 
  Candidate, 
  Application, 
  Interview,
  OnboardingTask,
  Project,
  Requisition,
  Assignment,
  AvailabilitySlot,
  TimeEntry,
  Timesheet,
  PayrollRun,
  MatchScore,
  SkillAssessment,
  Comment,
  UserRole,
  ApplicationStatus,
  TimeEntryStatus,
  TimesheetStatus,
  AssignmentStatus
} from '@prisma/client'

// Extended types with relations
export type UserWithProfile = User & {
  profile: Profile | null
}

export type ApplicationWithCandidate = Application & {
  candidate: Candidate
}

export type ApplicationWithDetails = Application & {
  candidate: Candidate
  interviews: Interview[]
  comments: (Comment & { user: UserWithProfile })[]
}

export type InterviewWithDetails = Interview & {
  application: ApplicationWithCandidate
  interviewer: UserWithProfile
}

export type AssignmentWithDetails = Assignment & {
  talent: UserWithProfile
  project: Project & { manager: UserWithProfile }
}

export type TimesheetWithDetails = Timesheet & {
  talent: UserWithProfile
  timeEntries: TimeEntry[]
  approver: UserWithProfile | null
}

export type MatchScoreWithDetails = MatchScore & {
  talent: UserWithProfile
  requisition: Requisition & { project: Project }
}

// Form types
export interface ApplicationFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  skills: string[]
  resumeUrl?: string
  source?: string
}

export interface InterviewFormData {
  scheduledAt: Date
  type: string
  meetingUrl?: string
  notes?: string
}

export interface TimeEntryFormData {
  assignmentId: string
  date: Date
  hours: number
  description?: string
}

export interface AvailabilityFormData {
  dayOfWeek: number
  startTime: string
  endTime: string
  hoursPerWeek: number
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Permission helpers
export interface PermissionCheck {
  role: UserRole
  userId: string
  resourceId?: string
  resourceOwnerId?: string
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 4,
  MANAGER: 3,
  COORDINATOR: 2,
  TALENT: 1,
}

export function hasHigherOrEqualRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

// Real-time event types
export interface RealtimeEvent {
  type: string
  data: any
  timestamp: Date
  userId: string
}

export interface CandidateStatusChangeEvent extends RealtimeEvent {
  type: 'candidate.status_changed'
  data: {
    candidateId: string
    oldStatus: ApplicationStatus
    newStatus: ApplicationStatus
    applicationId: string
  }
}

export interface TimesheetSubmittedEvent extends RealtimeEvent {
  type: 'timesheet.submitted'
  data: {
    timesheetId: string
    talentId: string
    managerId: string
    weekStartDate: Date
    totalHours: number
  }
}

export interface AssignmentCreatedEvent extends RealtimeEvent {
  type: 'assignment.created'
  data: {
    assignmentId: string
    talentId: string
    projectId: string
    projectName: string
  }
}
