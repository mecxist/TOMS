# TOMS — Talent Operations Management System

A talent management back office built with **Next.js**, **TypeScript**, **Prisma**, and **PostgreSQL**. Supports recruitment pipeline, applications, interviews, offers, onboarding, assignments, timesheets, resource planning, and analytics.

**Repository:** [github.com/mecxist/TOMS](https://github.com/mecxist/TOMS)

## Features

- **Acquisition:** Requisitions, Pipeline (Kanban), Applications, Interviews, Job Offers  
- **Onboarding:** Onboarding checklist, Skill assessments  
- **Engagement:** Availability, Projects (Timeline / Gantt / Calendar / Kanban / Roadmap), AI Matching, Assignments  
- **Operations:** Timesheets, Resource planning  
- **Analytics & finance:** Analytics dashboard, Payroll  
- **Account:** Profile, security, preferences  

Role-based access (Admin, Manager, Coordinator, Talent) with a shared sidebar and consistent layout.

## Tech stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide icons, Radix UI  
- **Backend:** Next.js API routes, Prisma ORM  
- **Database:** PostgreSQL (e.g. Neon)  
- **Auth:** Clerk (see `.env.example`)  
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
   - Clerk keys if using auth (see `.env.example`)

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

| Command           | Description        |
|-------------------|--------------------|
| `npm run dev`     | Start dev server   |
| `npm run build`   | Production build   |
| `npm run start`   | Start production   |
| `npm run lint`    | Run ESLint         |
| `npm run db:studio` | Open Prisma Studio |

Changelog and versioning scripts live in `scripts/` and are documented in `changelog/README.md`.

## Project structure

```
├── app/                    # Next.js App Router
│   ├── (public)/           # Login, sign-up, etc.
│   ├── account/            # Account settings
│   ├── admin/              # Admin (invitations, quickstart)
│   ├── analytics/          # Analytics
│   ├── api/                # API routes (auth, invitations, etc.)
│   ├── applications/       # Applications list & detail
│   ├── assignments/       # Assignments (talent / admin)
│   ├── availability/      # Availability
│   ├── interviews/        # Interviews
│   ├── matching/          # AI Matching
│   ├── offers/            # Job offers
│   ├── onboarding/        # Onboarding
│   ├── payroll/           # Payroll
│   ├── projects/          # Projects (views)
│   ├── requisitions/      # Requisitions & candidates
│   ├── resource-planning/ # Resource planning
│   ├── skill-assessments/ # Skill assessments
│   ├── timesheets/        # Timesheets
│   └── page.tsx           # Pipeline (home)
├── components/            # Shared & UI components
├── lib/                    # Auth, DB, utils, etc.
├── prisma/                 # Schema & seed
├── changelog/              # Changelog entries & templates
└── scripts/                # Changelog, versioning, etc.
```

## Deploy (Vercel)

1. Push to GitHub and connect the repo in [Vercel](https://vercel.com).  
2. Set environment variables in the Vercel project (same as `.env.local`).  
3. Deploy; Vercel will use `npm run build` and `npm run start`.

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
# follow prompts, then: vercel --prod
```

## License

Proprietary — all rights reserved.
