'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppLayout } from '@/components/shared/app-layout'
import { Modal } from '@/components/shared/modal'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  ChevronRight,
  XCircle,
  Mail,
  Phone,
  MapPin,
  FileText,
  Download,
  Briefcase,
  GraduationCap,
  Send,
  Paperclip,
  AlertTriangle,
  CheckCircle2,
  Video,
} from 'lucide-react'

interface CandidateDetail {
  id: string
  code: string
  name: string
  role: string
  initials: string
  avatarColor: string
  tags: string[]
  status: string
  stage: string
  email: string
  phone: string
  location: string
  appliedDate: string
  experience: {
    title: string
    company: string
    period: string
  }[]
  education: string
  coverLetter: string
  timeline: { event: string; date: string; detail?: string }[]
  documents: { name: string; size: string }[]
}

const STAGES = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'] as const

const candidatesMap: Record<string, CandidateDetail> = {
  '1': {
    id: '1',
    code: 'DEV-01',
    name: 'Alex Konstantopoulos',
    role: 'Senior Frontend Engineer',
    initials: 'AK',
    avatarColor: '#60a5fa',
    tags: ['React', 'Vue', 'TypeScript', 'GraphQL', 'CSS'],
    status: 'In Review',
    stage: 'Applied',
    email: 'alex.k@mail.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    appliedDate: 'Oct 24, 2024',
    experience: [
      { title: 'Frontend Engineer', company: 'Stripe', period: '2021 – Present' },
      { title: 'UI Developer', company: 'Vercel', period: '2019 – 2021' },
    ],
    education: 'B.S. Computer Science, UC Berkeley',
    coverLetter: 'I am excited to apply for the Senior Frontend Engineer position. With over 5 years of experience building performant, accessible web applications using React and TypeScript, I believe I can make a meaningful impact on your team. At Stripe, I led the redesign of the dashboard components library, improving load times by 40% and developer productivity across 12 teams.',
    timeline: [
      { event: 'Application received', date: 'Oct 24, 2024', detail: 'Via careers page' },
      { event: 'Resume screened', date: 'Oct 25, 2024', detail: 'Passed initial review' },
      { event: 'Moved to Applied', date: 'Oct 25, 2024' },
    ],
    documents: [
      { name: 'Resume_Alex_K.pdf', size: '245 KB' },
      { name: 'Portfolio_Link.txt', size: '1 KB' },
    ],
  },
  '2': {
    id: '2',
    code: 'DES-04',
    name: 'Sarah Miller',
    role: 'Product Designer',
    initials: 'SM',
    avatarColor: '#f472b6',
    tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    status: 'In Review',
    stage: 'Applied',
    email: 'sarah.m@design.co',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    appliedDate: 'Oct 23, 2024',
    experience: [
      { title: 'Product Designer', company: 'Airbnb', period: '2020 – Present' },
      { title: 'UX Designer', company: 'Spotify', period: '2018 – 2020' },
    ],
    education: 'M.F.A. Interaction Design, SVA',
    coverLetter: 'As a product designer with deep expertise in design systems and user research, I am thrilled about this opportunity. At Airbnb, I led the redesign of the host onboarding flow, increasing completion rates by 28%. I am passionate about creating inclusive, delightful experiences at scale.',
    timeline: [
      { event: 'Application received', date: 'Oct 23, 2024', detail: 'Via LinkedIn' },
      { event: 'Resume screened', date: 'Oct 24, 2024', detail: 'Strong portfolio' },
    ],
    documents: [
      { name: 'Resume_Sarah_M.pdf', size: '310 KB' },
      { name: 'Portfolio.pdf', size: '4.2 MB' },
    ],
  },
  '3': {
    id: '3',
    code: 'ENG-09',
    name: 'James Lee',
    role: 'Backend Developer',
    initials: 'JL',
    avatarColor: '#34d399',
    tags: ['Node', 'AWS', 'PostgreSQL', 'Docker', 'REST APIs'],
    status: 'In Review',
    stage: 'Applied',
    email: 'james.lee@dev.io',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    appliedDate: 'Oct 22, 2024',
    experience: [
      { title: 'Backend Engineer', company: 'Datadog', period: '2020 – Present' },
      { title: 'Software Engineer', company: 'DigitalOcean', period: '2018 – 2020' },
    ],
    education: 'B.S. Computer Science, UT Austin',
    coverLetter: 'I bring 6+ years of backend development experience with a focus on scalable microservices. At Datadog, I architected the event processing pipeline handling 2M+ events per second. I am excited to bring this expertise to your engineering team.',
    timeline: [
      { event: 'Application received', date: 'Oct 22, 2024', detail: 'Referral from Tom C.' },
      { event: 'Resume screened', date: 'Oct 23, 2024' },
    ],
    documents: [
      { name: 'Resume_James_L.pdf', size: '198 KB' },
    ],
  },
  '4': {
    id: '4',
    code: 'OPS-02',
    name: 'Mike Ross',
    role: 'DevOps Engineer',
    initials: 'MR',
    avatarColor: '#9ca3af',
    tags: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    status: 'Action Required',
    stage: 'Screening',
    email: 'mike.ross@ops.net',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    appliedDate: 'Oct 18, 2024',
    experience: [
      { title: 'DevOps Engineer', company: 'Cloudflare', period: '2019 – Present' },
      { title: 'SRE', company: 'HashiCorp', period: '2017 – 2019' },
    ],
    education: 'B.S. Information Systems, UW',
    coverLetter: 'With extensive experience in cloud infrastructure and CI/CD automation, I am eager to help your team scale reliably. At Cloudflare, I reduced deployment times by 65% and achieved 99.99% uptime across all production services.',
    timeline: [
      { event: 'Application received', date: 'Oct 18, 2024' },
      { event: 'Moved to Screening', date: 'Oct 20, 2024' },
      { event: 'Screening review pending', date: 'Oct 22, 2024', detail: 'Awaiting reviewer' },
    ],
    documents: [
      { name: 'Resume_Mike_R.pdf', size: '220 KB' },
      { name: 'Certifications.pdf', size: '156 KB' },
    ],
  },
  '5': {
    id: '5',
    code: 'MKT-01',
    name: 'Elena Fisher',
    role: 'Growth Marketer',
    initials: 'EF',
    avatarColor: '#fbbf24',
    tags: ['SEO', 'Content Strategy', 'Analytics', 'A/B Testing'],
    status: 'In Review',
    stage: 'Screening',
    email: 'elena.f@growth.io',
    phone: '+1 (555) 567-8901',
    location: 'Los Angeles, CA',
    appliedDate: 'Oct 20, 2024',
    experience: [
      { title: 'Growth Lead', company: 'HubSpot', period: '2021 – Present' },
      { title: 'SEO Specialist', company: 'Moz', period: '2019 – 2021' },
    ],
    education: 'B.A. Marketing, UCLA',
    coverLetter: 'I have driven 3x organic traffic growth at HubSpot through data-driven SEO and content strategy. I am excited to apply my growth marketing expertise to help your company reach its next milestone.',
    timeline: [
      { event: 'Application received', date: 'Oct 20, 2024' },
      { event: 'Moved to Screening', date: 'Oct 21, 2024' },
    ],
    documents: [
      { name: 'Resume_Elena_F.pdf', size: '275 KB' },
    ],
  },
  '6': {
    id: '6',
    code: 'PM-05',
    name: 'Emily Wong',
    role: 'Product Manager',
    initials: 'EW',
    avatarColor: '#a78bfa',
    tags: ['SaaS', 'Agile', 'Roadmapping', 'Stakeholder Mgmt'],
    status: 'Interview Scheduled',
    stage: 'Interview',
    email: 'emily.w@product.co',
    phone: '+1 (555) 678-9012',
    location: 'Chicago, IL',
    appliedDate: 'Oct 15, 2024',
    experience: [
      { title: 'Senior PM', company: 'Atlassian', period: '2020 – Present' },
      { title: 'Product Manager', company: 'Slack', period: '2018 – 2020' },
    ],
    education: 'MBA, Northwestern Kellogg',
    coverLetter: 'I bring 7 years of product management experience in B2B SaaS. At Atlassian, I led Jira\'s workflow automation feature from ideation to launch, growing adoption to 500K+ teams. I am passionate about building products that empower teams to do their best work.',
    timeline: [
      { event: 'Application received', date: 'Oct 15, 2024' },
      { event: 'Phone screen completed', date: 'Oct 17, 2024', detail: 'Strong communication' },
      { event: 'Moved to Interview', date: 'Oct 19, 2024' },
      { event: 'Interview scheduled', date: 'Oct 22, 2024', detail: 'Tomorrow at 2:00 PM' },
    ],
    documents: [
      { name: 'Resume_Emily_W.pdf', size: '290 KB' },
      { name: 'Case_Study.pdf', size: '1.8 MB' },
    ],
  },
  '7': {
    id: '7',
    code: 'ENG-12',
    name: 'Tom Chen',
    role: 'Full Stack Engineer',
    initials: 'TC',
    avatarColor: '#34d399',
    tags: ['Python', 'React', 'Django', 'PostgreSQL'],
    status: 'In Review',
    stage: 'Interview',
    email: 'tom.c@fullstack.dev',
    phone: '+1 (555) 789-0123',
    location: 'Denver, CO',
    appliedDate: 'Oct 16, 2024',
    experience: [
      { title: 'Full Stack Engineer', company: 'Notion', period: '2021 – Present' },
      { title: 'Software Engineer', company: 'Dropbox', period: '2019 – 2021' },
    ],
    education: 'B.S. Computer Science, Colorado School of Mines',
    coverLetter: 'As a full stack engineer with expertise in Python and React, I thrive at the intersection of frontend and backend development. At Notion, I built the real-time collaboration engine used by millions of users daily.',
    timeline: [
      { event: 'Application received', date: 'Oct 16, 2024' },
      { event: 'Phone screen completed', date: 'Oct 18, 2024' },
      { event: 'Moved to Interview', date: 'Oct 20, 2024' },
    ],
    documents: [
      { name: 'Resume_Tom_C.pdf', size: '210 KB' },
    ],
  },
  '8': {
    id: '8',
    code: 'DEV-05',
    name: 'David Cole',
    role: 'Senior Backend Engineer',
    initials: 'DC',
    avatarColor: '#60a5fa',
    tags: ['Go', 'K8s', 'gRPC', 'Microservices', 'Redis'],
    status: 'Offer Pending',
    stage: 'Offer',
    email: 'david.c@eng.io',
    phone: '+1 (555) 890-1234',
    location: 'Portland, OR',
    appliedDate: 'Oct 10, 2024',
    experience: [
      { title: 'Senior Backend Engineer', company: 'Uber', period: '2019 – Present' },
      { title: 'Backend Engineer', company: 'Twitch', period: '2017 – 2019' },
    ],
    education: 'M.S. Computer Science, Oregon State',
    coverLetter: 'With 8 years of experience building high-throughput distributed systems, I am excited about this opportunity. At Uber, I led the redesign of the payment processing service, reducing latency by 50% while handling 100K+ transactions per minute.',
    timeline: [
      { event: 'Application received', date: 'Oct 10, 2024' },
      { event: 'Phone screen completed', date: 'Oct 12, 2024' },
      { event: 'Technical interview passed', date: 'Oct 16, 2024', detail: 'Excellent system design' },
      { event: 'Final round completed', date: 'Oct 20, 2024', detail: 'Team unanimously approved' },
      { event: 'Offer prepared', date: 'Oct 22, 2024' },
    ],
    documents: [
      { name: 'Resume_David_C.pdf', size: '265 KB' },
      { name: 'References.pdf', size: '120 KB' },
    ],
  },
}

function getStatusBadge(status: string) {
  const baseClass = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium'
  switch (status) {
    case 'In Review':
      return <span className={`${baseClass} bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`}>{status}</span>
    case 'Action Required':
      return <span className={`${baseClass} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`}>{status}</span>
    case 'Interview Scheduled':
      return <span className={`${baseClass} bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`}>{status}</span>
    case 'Offer Pending':
      return <span className={`${baseClass} bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`}>{status}</span>
    case 'Rejected':
      return <span className={`${baseClass} bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400`}>{status}</span>
    default:
      return <span className={`${baseClass} bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400`}>{status}</span>
  }
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [candidate, setCandidate] = useState<CandidateDetail | null>(candidatesMap[id] ?? null)
  const [showMessage, setShowMessage] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [showAdvance, setShowAdvance] = useState(false)
  const [showReject, setShowReject] = useState(false)

  if (!candidate) {
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center bg-[#f5f5f5] dark:bg-[#2a2a2a]">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
              Application not found
            </h2>
            <p className="text-sm text-[#666] dark:text-[#aaa] mb-4">
              The application you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="size-3.5" />
                Back to Pipeline
              </Button>
            </Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  const cardClass = 'bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-5'
  const sectionTitle = 'text-xs font-medium text-[#666] dark:text-[#888] uppercase tracking-wide mb-3'

  const isRejected = candidate.status === 'Rejected'
  const currentStageIndex = STAGES.indexOf(candidate.stage as typeof STAGES[number])
  const isLastStage = currentStageIndex >= STAGES.length - 1

  return (
    <AppLayout>
      <div className="h-full overflow-y-auto bg-[#f5f5f5] dark:bg-[#2a2a2a] p-6">
        {/* Back links */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Link
            href="/applications"
            className="inline-flex items-center gap-1.5 text-sm text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Applications
          </Link>
          <span className="text-[#999] dark:text-[#666]">·</span>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors"
          >
            Pipeline
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <div
              className="size-16 rounded-full flex items-center justify-center text-xl font-medium text-white shrink-0"
              style={{ backgroundColor: candidate.avatarColor }}
            >
              {candidate.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-semibold text-[#111] dark:text-[#e5e5e5]">
                  {candidate.name}
                </h1>
                <span className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase bg-[#ececf0] dark:bg-[#27272a] px-2 py-0.5 rounded">
                  {candidate.code}
                </span>
                {getStatusBadge(candidate.status)}
              </div>
              <p className="text-sm text-[#666] dark:text-[#aaa] mt-1">{candidate.role}</p>
              <p className="text-xs text-[#666] dark:text-[#888] mt-1">
                Stage: <span className="font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.stage}</span>
                <span className="mx-2">·</span>
                Applied {candidate.appliedDate}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setShowMessage(true)}>
              <MessageSquare className="size-3.5" />
              Message
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSchedule(true)}>
              <Calendar className="size-3.5" />
              Schedule Interview
            </Button>
            {!isRejected && !isLastStage && (
              <Button variant="default" size="sm" onClick={() => setShowAdvance(true)}>
                <ChevronRight className="size-3.5" />
                Advance Stage
              </Button>
            )}
            {!isRejected && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => setShowReject(true)}
              >
                <XCircle className="size-3.5" />
                Reject
              </Button>
            )}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left column */}
          <div className="col-span-2 space-y-6">
            {/* Application Details */}
            <div className={cardClass}>
              <h3 className={sectionTitle}>Application Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#666] dark:text-[#888] mb-0.5">Position</p>
                  <p className="text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.role}</p>
                </div>
                <div>
                  <p className="text-xs text-[#666] dark:text-[#888] mb-0.5">Applied Date</p>
                  <p className="text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.appliedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-[#666] dark:text-[#888] mb-0.5">Current Stage</p>
                  <p className="text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.stage}</p>
                </div>
                <div>
                  <p className="text-xs text-[#666] dark:text-[#888] mb-0.5">Education</p>
                  <p className="text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.education}</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className={cardClass}>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="space-y-4">
                {candidate.experience.map((exp, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded bg-[#ececf0] dark:bg-[#27272a]">
                      <Briefcase className="size-3.5 text-[#666] dark:text-[#aaa]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{exp.title}</p>
                      <p className="text-xs text-[#666] dark:text-[#aaa]">{exp.company} · {exp.period}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded bg-[#ececf0] dark:bg-[#27272a]">
                    <GraduationCap className="size-3.5 text-[#666] dark:text-[#aaa]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.education}</p>
                    <p className="text-xs text-[#666] dark:text-[#aaa]">Education</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className={cardClass}>
              <h3 className={sectionTitle}>Cover Letter</h3>
              <p className="text-sm text-[#444] dark:text-[#bbb] leading-relaxed">
                {candidate.coverLetter}
              </p>
            </div>

            {/* Timeline */}
            <div className={cardClass}>
              <h3 className={sectionTitle}>Timeline</h3>
              <div className="space-y-4">
                {candidate.timeline.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="relative flex flex-col items-center">
                      <div className="size-2 rounded-full bg-[#111] dark:bg-[#e5e5e5] mt-1.5" />
                      {i < candidate.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)] mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{entry.event}</p>
                      <p className="text-xs text-[#666] dark:text-[#888]">{entry.date}</p>
                      {entry.detail && (
                        <p className="text-xs text-[#999] dark:text-[#666] mt-0.5">{entry.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Skills */}
            <div className={cardClass}>
              <h3 className={sectionTitle}>Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {candidate.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2 py-1 bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa] rounded border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className={cardClass}>
              <h3 className={sectionTitle}>Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <Mail className="size-3.5 text-[#666] dark:text-[#888]" />
                  <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-3.5 text-[#666] dark:text-[#888]" />
                  <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="size-3.5 text-[#666] dark:text-[#888]" />
                  <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{candidate.location}</span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className={cardClass}>
              <h3 className={sectionTitle}>Documents</h3>
              <div className="space-y-2">
                {candidate.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] bg-[#fafafa] dark:bg-[#27272a]"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="size-3.5 text-[#666] dark:text-[#888]" />
                      <div>
                        <p className="text-sm text-[#111] dark:text-[#e5e5e5]">{doc.name}</p>
                        <p className="text-[10px] text-[#999] dark:text-[#666]">{doc.size}</p>
                      </div>
                    </div>
                    <button className="p-1 text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors">
                      <Download className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}

      <MessageModal
        candidate={showMessage ? candidate : null}
        onClose={() => setShowMessage(false)}
      />

      <ScheduleModal
        candidate={showSchedule ? candidate : null}
        onClose={() => setShowSchedule(false)}
        onViewInterviews={() => {
          setShowSchedule(false)
          router.push('/interviews')
        }}
      />

      <AdvanceStageModal
        candidate={showAdvance ? candidate : null}
        onClose={() => setShowAdvance(false)}
        onAdvance={(newStage) => {
          setCandidate((prev) => {
            if (!prev) return prev
            return {
              ...prev,
              stage: newStage,
              status: newStage === 'Offer' ? 'Offer Pending' : newStage === 'Interview' ? 'Interview Scheduled' : 'In Review',
              timeline: [
                ...prev.timeline,
                { event: `Advanced to ${newStage}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
              ],
            }
          })
        }}
      />

      <RejectModal
        candidate={showReject ? candidate : null}
        onClose={() => setShowReject(false)}
        onReject={(reason) => {
          setCandidate((prev) => {
            if (!prev) return prev
            return {
              ...prev,
              status: 'Rejected',
              timeline: [
                ...prev.timeline,
                { event: 'Application rejected', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), detail: reason },
              ],
            }
          })
        }}
      />
    </AppLayout>
  )
}

// ─── Message Modal ───────────────────────────────────────────────────────────

interface ChatMessage {
  id: string
  text: string
  sender: 'me' | 'them'
  time: string
}

function MessageModal({
  candidate,
  onClose,
}: {
  candidate: CandidateDetail | null
  onClose: () => void
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: 'Hi! Thanks for applying. We were really impressed with your background.', sender: 'me', time: '10:30 AM' },
    { id: '2', text: "Thank you! I'm very excited about the opportunity. Looking forward to learning more about the role.", sender: 'them', time: '10:45 AM' },
    { id: '3', text: "Great to hear! We'd love to schedule a quick intro call. Are you available this week?", sender: 'me', time: '11:02 AM' },
  ])
  const [messageText, setMessageText] = useState('')

  if (!candidate) return null

  const handleSend = () => {
    if (!messageText.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        text: messageText.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setMessageText('')
  }

  return (
    <Modal isOpen onClose={onClose} title={`Message ${candidate.name}`} size="lg">
      {/* Candidate header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <div
          className="size-9 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.name}</p>
          <p className="text-xs text-[#666] dark:text-[#aaa]">{candidate.role}</p>
        </div>
      </div>

      {/* Message thread */}
      <div className="h-72 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-xl px-3.5 py-2.5 ${
              msg.sender === 'me'
                ? 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
                : 'bg-[#ececf0] dark:bg-[#27272a] text-[#111] dark:text-[#e5e5e5]'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${
                msg.sender === 'me'
                  ? 'text-white/60 dark:text-[#111]/60'
                  : 'text-[#666] dark:text-[#888]'
              }`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Compose area */}
      <div className="flex items-end gap-2 border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] pt-4">
        <button
          type="button"
          className="p-2 text-[#666] dark:text-[#888] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors"
        >
          <Paperclip className="size-4" />
        </button>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#eb3a14] focus:border-transparent"
        />
        <Button variant="accent" size="sm" onClick={handleSend} disabled={!messageText.trim()}>
          <Send className="size-3.5" />
          Send
        </Button>
      </div>
    </Modal>
  )
}

// ─── Schedule Modal ──────────────────────────────────────────────────────────

function ScheduleModal({
  candidate,
  onClose,
  onViewInterviews,
}: {
  candidate: CandidateDetail | null
  onClose: () => void
  onViewInterviews?: () => void
}) {
  if (!candidate) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  const labelClass = 'block text-xs font-medium text-[#666] dark:text-[#888] mb-1.5'
  const inputClass = 'w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#eb3a14] focus:border-transparent'

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Schedule Interview"
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full flex-wrap gap-2">
          {onViewInterviews && (
            <button
              type="button"
              onClick={onViewInterviews}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6366f1] hover:underline"
            >
              <Video className="size-3.5" />
              View all interviews
            </button>
          )}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" size="sm" type="submit" form="schedule-form-detail">
              Schedule Interview
            </Button>
          </div>
        </div>
      }
    >
      {/* Candidate header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <div
          className="size-9 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.name}</p>
          <span className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase">{candidate.code}</span>
        </div>
      </div>

      {/* Link to interviews page */}
      {onViewInterviews && (
        <div className="mb-5">
          <button
            type="button"
            onClick={onViewInterviews}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f5f5] dark:bg-[#27272a] text-sm font-medium text-[#6366f1] hover:bg-[#ececf0] dark:hover:bg-[#333] transition-colors"
          >
            <Video className="size-4" />
            View all scheduled interviews
          </button>
        </div>
      )}

      <form id="schedule-form-detail" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Interview Type</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select type</option>
              <option>Technical Screen</option>
              <option>System Design</option>
              <option>Culture Fit</option>
              <option>Final Round</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Platform</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select platform</option>
              <option>Google Meet</option>
              <option>Zoom</option>
              <option>Microsoft Teams</option>
              <option>In-Office</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Start Time</label>
            <input type="time" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Duration</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select duration</option>
              <option>30 min</option>
              <option>45 min</option>
              <option>1 hour</option>
              <option>1.5 hours</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Interviewer</label>
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select interviewer</option>
              <option>Rachel Adams</option>
              <option>Marcus Johnson</option>
              <option>Priya Patel</option>
              <option>Jordan Kim</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Notes (optional)</label>
          <textarea
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Add any notes for the interview..."
          />
        </div>
      </form>
    </Modal>
  )
}

// ─── Advance Stage Modal ─────────────────────────────────────────────────────

function AdvanceStageModal({
  candidate,
  onClose,
  onAdvance,
}: {
  candidate: CandidateDetail | null
  onClose: () => void
  onAdvance: (newStage: string) => void
}) {
  const currentIdx = candidate ? STAGES.indexOf(candidate.stage as typeof STAGES[number]) : -1
  const availableStages = STAGES.slice(currentIdx + 1)
  const [targetStage, setTargetStage] = useState(availableStages[0] ?? '')
  const [notes, setNotes] = useState('')

  if (!candidate) return null

  const effectiveTarget = targetStage || availableStages[0] || ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (effectiveTarget) {
      onAdvance(effectiveTarget)
    }
    onClose()
  }

  const labelClass = 'block text-xs font-medium text-[#666] dark:text-[#888] mb-1.5'
  const inputClass = 'w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#eb3a14] focus:border-transparent'

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Advance Stage"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" size="sm" type="submit" form="advance-form">
            <CheckCircle2 className="size-3.5" />
            Advance to {effectiveTarget}
          </Button>
        </div>
      }
    >
      {/* Candidate header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <div
          className="size-9 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.name}</p>
          <span className="text-[10px] font-mono text-[#666] dark:text-[#888] uppercase">{candidate.code}</span>
        </div>
      </div>

      {/* Stage progression visual */}
      <div className="flex items-center gap-1.5 mb-5">
        {STAGES.map((stage, i) => {
          const isCurrent = i === currentIdx
          const isPast = i < currentIdx
          const isTarget = stage === effectiveTarget
          return (
            <div key={stage} className="flex items-center gap-1.5">
              {i > 0 && <div className={`w-4 h-px ${isPast || isCurrent ? 'bg-[#111] dark:bg-[#e5e5e5]' : 'bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)]'}`} />}
              <span className={`text-[10px] font-medium px-2 py-1 rounded ${
                isTarget
                  ? 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
                  : isCurrent
                    ? 'bg-[#ececf0] dark:bg-[#27272a] text-[#111] dark:text-[#e5e5e5] ring-1 ring-[#111] dark:ring-[#e5e5e5]'
                    : isPast
                      ? 'bg-[#ececf0] dark:bg-[#27272a] text-[#666] dark:text-[#aaa]'
                      : 'bg-[#f5f5f5] dark:bg-[#333] text-[#999] dark:text-[#666]'
              }`}>
                {stage}
              </span>
            </div>
          )
        })}
      </div>

      <form id="advance-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Move to Stage</label>
          <select
            className={inputClass}
            value={effectiveTarget}
            onChange={(e) => setTargetStage(e.target.value as typeof STAGES[number])}
          >
            {availableStages.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Notes (optional)</label>
          <textarea
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Add notes about this stage change..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  )
}

// ─── Reject Modal ────────────────────────────────────────────────────────────

function RejectModal({
  candidate,
  onClose,
  onReject,
}: {
  candidate: CandidateDetail | null
  onClose: () => void
  onReject: (reason: string) => void
}) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  if (!candidate) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onReject(reason || 'No reason specified')
    onClose()
  }

  const labelClass = 'block text-xs font-medium text-[#666] dark:text-[#888] mb-1.5'
  const inputClass = 'w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#eb3a14] focus:border-transparent'

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Reject Application"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" size="sm" type="submit" form="reject-form">
            <XCircle className="size-3.5" />
            Reject Application
          </Button>
        </div>
      }
    >
      {/* Warning */}
      <div className="flex items-start gap-3 mb-5 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30">
        <AlertTriangle className="size-4 text-red-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            This action cannot be undone
          </p>
          <p className="text-xs text-red-600/80 dark:text-red-400/70 mt-0.5">
            {candidate.name}&apos;s application will be marked as rejected and they will be notified.
          </p>
        </div>
      </div>

      {/* Candidate header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]">
        <div
          className="size-9 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">{candidate.name}</p>
          <p className="text-xs text-[#666] dark:text-[#aaa]">{candidate.role} · {candidate.stage}</p>
        </div>
      </div>

      <form id="reject-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Rejection Reason</label>
          <select
            className={inputClass}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="" disabled>Select reason</option>
            <option>Not a fit for the role</option>
            <option>Insufficient experience</option>
            <option>Failed assessment</option>
            <option>Position filled</option>
            <option>Candidate withdrew</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Additional Notes (optional)</label>
          <textarea
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Provide additional context for this decision..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  )
}
