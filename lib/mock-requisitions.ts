/**
 * Single source of truth for requisition and candidate dummy data.
 * Requisition list page uses candidate counts from CANDIDATES_BY_REQUISITION.
 * Requisition detail page uses the same data so counts match when clicking into a role.
 */

export interface RequisitionMeta {
  id: string
  title: string
  department: string
  location: string
  type: string
  status: string
  createdDate: string
  priority: 'high' | 'medium' | 'low'
}

export interface RequisitionCandidateRow {
  applicationId: string
  name: string
  email: string
  initials: string
  avatarColor: string
  appliedDate: string
  appliedTime: string
  status: string
  tags: string[]
}

/** Requisition id -> application ids (candidates who applied to this role). Counts must match list page. */
export const CANDIDATES_BY_REQUISITION: Record<string, string[]> = {
  '1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], // Senior Frontend Engineer -> 12
  '2': ['13', '14', '15', '16', '17', '18', '19', '20'],                   // Product Designer -> 8
  '3': ['21', '22', '23', '24', '25'],                                     // Backend Engineer -> 5
  '4': ['26', '27', '28'],                                                  // UX Researcher -> 3
  '5': [],                                                                  // DevOps Engineer -> 0
}

export const REQUISITIONS: Record<string, RequisitionMeta> = {
  '1': {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    status: 'open',
    createdDate: 'Oct 15',
    priority: 'high',
  },
  '2': {
    id: '2',
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'full-time',
    status: 'filled',
    createdDate: 'Sep 20',
    priority: 'medium',
  },
  '3': {
    id: '3',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'full-time',
    status: 'open',
    createdDate: 'Oct 22',
    priority: 'high',
  },
  '4': {
    id: '4',
    title: 'UX Researcher',
    department: 'Design',
    location: 'Remote',
    type: 'part-time',
    status: 'on-hold',
    createdDate: 'Oct 10',
    priority: 'low',
  },
  '5': {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'full-time',
    status: 'closed',
    createdDate: 'Aug 5',
    priority: 'medium',
  },
}

const avatarColors = ['#9ca3af', '#a78bfa', '#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#34d399', '#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6']

function makeCandidate(
  applicationId: string,
  name: string,
  email: string,
  appliedDate: string,
  appliedTime: string,
  status: string,
  tags: string[]
): RequisitionCandidateRow {
  const initials = name
    .split(/[\s.]+/)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  const colorIndex = parseInt(applicationId, 10) % avatarColors.length
  return {
    applicationId,
    name,
    email,
    initials,
    avatarColor: avatarColors[colorIndex],
    appliedDate,
    appliedTime,
    status,
    tags,
  }
}

/** All candidate rows keyed by application id. Used by requisition detail page. */
export const REQUISITION_CANDIDATES: Record<string, RequisitionCandidateRow> = {
  // Req 1 - Senior Frontend Engineer (12)
  '1': makeCandidate('1', 'Alex K.', 'alex.k@mail.com', 'Oct 24', '10:30 AM', 'Reviewing', ['React', 'Senior']),
  '2': makeCandidate('2', 'Jordan M.', 'jordan.m@mail.com', 'Oct 24', '09:15 AM', 'Reviewing', ['Vue', 'TypeScript']),
  '3': makeCandidate('3', 'Sam P.', 'sam.p@email.co', 'Oct 23', '02:00 PM', 'Shortlisted', ['React', 'Node']),
  '4': makeCandidate('4', 'Casey L.', 'casey.l@dev.io', 'Oct 23', '11:45 AM', 'Reviewing', ['Next.js']),
  '5': makeCandidate('5', 'Riley T.', 'riley.t@mail.com', 'Oct 22', '04:30 PM', 'Reviewing', ['React', 'Testing']),
  '6': makeCandidate('6', 'Morgan F.', 'morgan.f@email.co', 'Oct 22', '01:20 PM', 'Shortlisted', ['Vue', 'CSS']),
  '7': makeCandidate('7', 'Quinn W.', 'quinn.w@tech.co', 'Oct 21', '10:00 AM', 'Reviewing', ['React', 'GraphQL']),
  '8': makeCandidate('8', 'Avery S.', 'avery.s@mail.com', 'Oct 21', '03:45 PM', 'Reviewing', ['TypeScript']),
  '9': makeCandidate('9', 'Reese H.', 'reese.h@email.co', 'Oct 20', '09:30 AM', 'Rejected', ['Angular']),
  '10': makeCandidate('10', 'Drew N.', 'drew.n@dev.io', 'Oct 20', '02:15 PM', 'Reviewing', ['React', 'Svelte']),
  '11': makeCandidate('11', 'Jamie B.', 'jamie.b@mail.com', 'Oct 19', '11:00 AM', 'Shortlisted', ['React', 'Node']),
  '12': makeCandidate('12', 'Skyler V.', 'skyler.v@email.co', 'Oct 19', '04:00 PM', 'Reviewing', ['Vue', 'Senior']),
  // Req 2 - Product Designer (8)
  '13': makeCandidate('13', 'Maria R.', 'maria@email.co', 'Oct 23', '02:15 PM', 'Rejected', ['Figma']),
  '14': makeCandidate('14', 'Taylor G.', 'taylor.g@design.co', 'Oct 22', '10:30 AM', 'Offer Sent', ['Figma', 'Prototyping']),
  '15': makeCandidate('15', 'Jordan K.', 'jordan.k@mail.com', 'Oct 22', '09:00 AM', 'Shortlisted', ['Sketch', 'UI']),
  '16': makeCandidate('16', 'Alex C.', 'alex.c@email.co', 'Oct 21', '01:45 PM', 'Reviewing', ['Figma', 'Design Systems']),
  '17': makeCandidate('17', 'Sam D.', 'sam.d@design.io', 'Oct 21', '11:20 AM', 'Reviewing', ['Adobe XD']),
  '18': makeCandidate('18', 'Riley J.', 'riley.j@mail.com', 'Oct 20', '03:00 PM', 'Shortlisted', ['Figma', 'Research']),
  '19': makeCandidate('19', 'Quinn A.', 'quinn.a@email.co', 'Oct 20', '09:30 AM', 'Reviewing', ['Prototyping']),
  '20': makeCandidate('20', 'Morgan E.', 'morgan.e@design.co', 'Oct 19', '02:00 PM', 'Rejected', ['Figma', 'Motion']),
  // Req 3 - Backend Engineer (5)
  '21': makeCandidate('21', 'John L.', 'john.l@acme.co', 'Oct 22', '09:00 AM', 'Offer Sent', ['Node']),
  '22': makeCandidate('22', 'Elena P.', 'elena.p@mail.com', 'Oct 21', '02:30 PM', 'Shortlisted', ['Go', 'Postgres']),
  '23': makeCandidate('23', 'Marcus T.', 'marcus.t@dev.io', 'Oct 21', '10:15 AM', 'Reviewing', ['Python', 'AWS']),
  '24': makeCandidate('24', 'Priya N.', 'priya.n@email.co', 'Oct 20', '04:00 PM', 'Reviewing', ['Java', 'Kafka']),
  '25': makeCandidate('25', 'David Y.', 'david.y@tech.co', 'Oct 20', '11:00 AM', 'Rejected', ['Node', 'Redis']),
  // Req 4 - UX Researcher (3)
  '26': makeCandidate('26', 'Jordan L.', 'jordan.l@research.co', 'Oct 19', '01:00 PM', 'Reviewing', ['User Research']),
  '27': makeCandidate('27', 'Casey R.', 'casey.r@mail.com', 'Oct 18', '10:30 AM', 'Shortlisted', ['Usability', 'Interviews']),
  '28': makeCandidate('28', 'Avery M.', 'avery.m@email.co', 'Oct 18', '03:45 PM', 'Reviewing', ['Surveys', 'Analytics']),
}

/** Get candidate count for a requisition (for list page). */
export function getCandidateCountForRequisition(requisitionId: string): number {
  return CANDIDATES_BY_REQUISITION[requisitionId]?.length ?? 0
}
