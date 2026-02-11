# TOMS — Talent Operations Management System

TOMS (Talent Operations Management System) is a standalone Next.js application for managing the complete talent lifecycle from application to payroll.

**Repository:** [github.com/mecxist/TOMS](https://github.com/mecxist/TOMS)

## Overview

TOMS is a comprehensive back office platform designed to manage every stage of the talent lifecycle for a hybrid builder studio/product lab. It provides a unified interface for recruiting, onboarding, project management, time tracking, and operations.

## The Complete Talent Journey

TOMS manages the end-to-end talent lifecycle:

1. **Application** → Candidate applies to join talent pool  
2. **Review** → Application is reviewed by team  
3. **Interview** → Interviews are scheduled and conducted  
4. **Decision** → Candidate is accepted or rejected  
5. **Onboarding** → Accepted candidates complete onboarding tasks  
6. **Availability** → Talent submits availability schedules  
7. **Assignment** → Talent is assigned to project(s)  
8. **Time Tracking** → Talent logs hours worked  
9. **Validation** → Hours are validated by managers  
10. **Payroll** → Payroll data is prepared for 3rd party processing  

## Features (from the codebase)

### Acquisition

- **Requisitions** — Create and manage role requisitions linked to projects (required/nice-to-have skills, hours, dates).  
- **Pipeline** — Kanban view of candidates (Applied → Screening → Interview → Offer → Hired) with candidate modals (detail, message, schedule).  
- **Applications** — List and detail views; application status (Applied, Reviewing, Interviewing, Offer Sent, Accepted, Rejected, Withdrawn).  
- **Interviews** — Schedule and manage interviews (type, meeting URL, feedback, scores).  
- **Offers** — Job offer workflow and tracking.  

### Onboarding

- **Onboarding** — Task checklist (Contract, W9/W4, Skill assessment, Tool training, Background check, Video training, Document upload) with status (Pending, In progress, Completed, Skipped).  
- **Skill assessments** — Assess talent skills; scores used in AI matching.  

### Engagement

- **Availability** — Talent availability slots (day of week, start/end time, hours per week, effective dates).  
- **Projects** — Project management with multiple views: **Timeline**, **Gantt**, **Calendar**, **Kanban**, **Roadmap**; project status (Planning, Active, On hold, Completed, Cancelled); optional external integration (e.g. Asana, Jira).  
- **AI Matching** — Match talent to requisitions (score, reasoning, skills match, availability match, assessment average).  
- **Assignments** — Assign talent to projects (dates, hourly rate, hours/week, status: Pending, Active, Completed, Cancelled).  

### Operations

- **Timesheets** — Weekly timesheets with time entries; status flow Draft → Submitted → Approved/Rejected → Paid; manager approval and rejection notes.  
- **Resource planning** — Capacity and resource views.  

### Analytics & Finance

- **Analytics** — Dashboard and reporting.  
- **Payroll** — Payroll runs (period, total amount, status: Draft → Pending approval → Approved → Exported → Processed); export for 3rd party (e.g. Gusto).  

### Account & Admin

- **Account** — User profile, security, preferences (account page and sidebar link).  
- **Admin — Invitations** — Send, list, filter (pending/accepted/expired), resend, and track invitation links; accept-invitation flow (by token) with sign-up/sign-in.  
- **Admin — Quickstart** — Guided setup: organization (name, slug, domain), talent model (Employment, Contingent, Volunteer, Hybrid), terminology customization, feature toggles, integrations (project management, time tracking, payroll, calendar, communication), talent onboarding (invite by CSV or manual), and review summary.  

### Auth & Public

- Sign-in, sign-up, forgot password, reset password, verify email, welcome.  
- Accept invitation by token (public route).  

### Other

- **Design system** — Reference page for UI components.  
- **Role-based access** — Sidebar and access by role: Admin, Manager, Coordinator, Talent.  
- **Theme** — Light/dark mode toggle.  

## Tech stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide icons, Radix UI  
- **Backend:** Next.js API routes, Prisma ORM  
- **Database:** PostgreSQL (e.g. Neon)  
- **Auth:** Better-auth (see `.env.example` for Clerk or other config)  
- **Optional:** Uploadthing (files), Pusher (realtime), Resend (email), Anthropic (AI matching)  

## Getting started

1. **Clone and install**

   ```bash
   git clone https://github.com/mecxist/TOMS.git
   cd TOMS
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set at least:

   - `DATABASE_URL` — PostgreSQL connection string  
   - Auth-related keys (see `.env.example`)

3. **Database**

   ```bash
   npx prisma generate
   npx prisma db push   # or: npx prisma migrate dev
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description          |
|---------------------|----------------------|
| `npm run dev`       | Start dev server     |
| `npm run build`     | Production build     |
| `npm run start`     | Start production     |
| `npm run lint`      | Run ESLint           |
| `npm run db:studio` | Open Prisma Studio   |

Changelog and versioning scripts live in `scripts/` and are documented in `changelog/README.md`.

## Project structure

```
├── app/                    # Next.js App Router
│   ├── (public)/            # Login, sign-up, accept-invitation, etc.
│   ├── account/             # Account settings
│   ├── admin/               # Invitations, Quickstart
│   ├── analytics/           # Analytics
│   ├── api/                 # API routes (auth, invitations, quickstart, etc.)
│   ├── applications/        # Applications list & detail
│   ├── assignments/        # Assignments
│   ├── availability/        # Availability
│   ├── design-system/       # UI reference
│   ├── interviews/          # Interviews
│   ├── matching/            # AI Matching
│   ├── offers/              # Job offers
│   ├── onboarding/          # Onboarding
│   ├── payroll/             # Payroll
│   ├── projects/            # Projects (Timeline, Gantt, Calendar, Kanban, Roadmap)
│   ├── requisitions/        # Requisitions & candidates
│   ├── resource-planning/   # Resource planning
│   ├── skill-assessments/   # Skill assessments
│   ├── timesheets/          # Timesheets
│   └── page.tsx             # Pipeline (home)
├── components/              # Shared & UI components
├── lib/                     # Auth, DB, utils, etc.
├── prisma/                  # Schema & seed
├── changelog/               # Changelog entries & templates
└── scripts/                 # Changelog, versioning, etc.
```

## Deploy (Vercel)

1. **Push to GitHub** (with GitHub auth set up):  
   `git push -u origin main`
2. In [Vercel](https://vercel.com), **Import** the repo `mecxist/TOMS` and connect it.  
3. **Environment variables:** Add the same vars as `.env.local` (e.g. `DATABASE_URL`, auth keys) in the Vercel project.  
4. Deploy; Vercel will run `npm run build` and serve with Next.js.

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
# follow prompts, then: vercel --prod
```

## License

Proprietary — all rights reserved.
