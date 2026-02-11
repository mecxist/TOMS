'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export interface TerminologyMap {
  application: string
  candidate: string
  applied: string
  applicationStatus: string
  offer: string
  offerSent: string
  hired: string
  accepted: string
  rejected: string
  withdrawn: string
  employee: string
  candidates: string
  hire: string
  hiringManager: string
  recruiter: string
  salary: string
  payroll: string
  payrollRun: string
  hourlyRate: string
  paid: string
  wage: string
  timesheet: string
  timeEntry: string
  hoursWorked: string
  billableHours: string
  overtime: string
  project: string
  assignment: string
  assigned: string
  projectManager: string
  requisition: string
  openPosition: string
  onboarding: string
  onboardingTask: string
  contract: string
  w9OrW4: string
  backgroundCheck: string
  training: string
  status: string
  pipeline: string
  stage: string
  active: string
  completed: string
  cancelled: string
  onHold: string
  interview: string
  interviewer: string
  assessment: string
  skillAssessment: string
  feedback: string
  availability: string
  availabilitySlot: string
  schedule: string
  shift: string
  match: string
  matchScore: string
  shortlisted: string
  screening: string
  admin: string
  settings: string
  dashboard: string
  profile: string
}

const DEFAULT_TERMS: TerminologyMap = {
  application: 'Application',
  candidate: 'Candidate',
  applied: 'Applied',
  applicationStatus: 'Application Status',
  offer: 'Offer',
  offerSent: 'Offer Sent',
  hired: 'Hired',
  accepted: 'Accepted',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
  employee: 'Employee',
  candidates: 'Candidates',
  hire: 'Hire',
  hiringManager: 'Hiring Manager',
  recruiter: 'Recruiter',
  salary: 'Salary',
  payroll: 'Payroll',
  payrollRun: 'Payroll Run',
  hourlyRate: 'Hourly Rate',
  paid: 'Paid',
  wage: 'Wage',
  timesheet: 'Timesheet',
  timeEntry: 'Time Entry',
  hoursWorked: 'Hours Worked',
  billableHours: 'Billable Hours',
  overtime: 'Overtime',
  project: 'Project',
  assignment: 'Assignment',
  assigned: 'Assigned',
  projectManager: 'Project Manager',
  requisition: 'Requisition',
  openPosition: 'Open Position',
  onboarding: 'Onboarding',
  onboardingTask: 'Onboarding Task',
  contract: 'Contract',
  w9OrW4: 'W9/W4',
  backgroundCheck: 'Background Check',
  training: 'Training',
  status: 'Status',
  pipeline: 'Pipeline',
  stage: 'Stage',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
  onHold: 'On Hold',
  interview: 'Interview',
  interviewer: 'Interviewer',
  assessment: 'Assessment',
  skillAssessment: 'Skill Assessment',
  feedback: 'Feedback',
  availability: 'Availability',
  availabilitySlot: 'Availability Slot',
  schedule: 'Schedule',
  shift: 'Shift',
  match: 'Match',
  matchScore: 'Match Score',
  shortlisted: 'Shortlisted',
  screening: 'Screening',
  admin: 'Admin',
  settings: 'Settings',
  dashboard: 'Dashboard',
  profile: 'Profile',
}

export function useTerminology(organizationId?: string) {
  const { data, error, isLoading, mutate } = useSWR<TerminologyMap>(
    organizationId ? `/api/terminology/${organizationId}` : null,
    fetcher,
    {
      fallbackData: DEFAULT_TERMS,
      revalidateOnFocus: false,
    }
  )

  const t = (key: keyof TerminologyMap): string => {
    if (!data) return DEFAULT_TERMS[key] || key
    return data[key] || DEFAULT_TERMS[key] || key
  }

  return {
    t,
    terms: data || DEFAULT_TERMS,
    isLoading,
    error,
    mutate,
  }
}
