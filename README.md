# Dentwise - Internal Development Log

This document serves as the private log and technical reference for the Dentwise project. It tracks the project's setup, architectural decisions, and infrastructure updates.

---

## Project Status: Project Structure and Layout Complete

The foundation, database layer, and authentication layer of the project are fully established.

### Core Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL with Prisma ORM (v7.7.0)
- **Authentication:** NextAuth.js (v5 Beta) + Google OAuth
- **Payments:** Stripe (test mode)
- **Communication:** Resend API (Email)
- **AI Integration:** Vapi (Voice AI Assistant)
- **Data Fetching:** TanStack React Query
- **Styling:** Tailwind CSS + Lucide Icons + Class Variance Authority (CVA)

---

## Infrastructure and Setup Log

### 1. Project Initialization
- Created via create-next-app with the following configurations:
  - App Router
  - Tailwind CSS
  - ESLint
  - src directory structure
  - Import alias @/* configured
- Repository restructured: all files moved to the root (no nested dentwise/ subfolder)
- Remote linked to: https://github.com/preettrank53/dentwise.git

### 2. Dependency Management
Standard production packages installed:
- @prisma/client, @auth/prisma-adapter, next-auth@beta
- @tanstack/react-query, @tanstack/react-query-devtools
- stripe, @stripe/stripe-js, resend
- zod, react-hook-form, @hookform/resolvers
- lucide-react, class-variance-authority, clsx, tailwind-merge

Dev dependencies:
- prisma (CLI)

### 3. Database and Environment Configuration
- **Environment:** Dedicated .env and .env.example files created at root.
- **Database:** Local PostgreSQL — postgres user, port 5432, database name: dentwise.
- **Prisma v7 Note:** The datasource url is managed exclusively by prisma.config.ts (not schema.prisma). The config loads DATABASE_URL from the .env file via dotenv.
- **Security:** .env is listed in .gitignore to prevent credential leaks.

### 4. Database Schema (April 8, 2026)
Complete schema defined in prisma/schema.prisma and pushed to the local PostgreSQL database.

**Tables created:**

| Table                  | Purpose                                      |
| :--------------------- | :------------------------------------------- |
| users                  | Patient and admin user accounts              |
| accounts               | OAuth provider account links (NextAuth)      |
| sessions               | Active user sessions (NextAuth)              |
| verification_tokens    | Email verification tokens (NextAuth)         |
| doctors                | Dental clinic doctor profiles                |
| appointments           | Patient appointment bookings                 |
| subscriptions          | Stripe subscription plan tracking            |

**Enums defined:**

| Enum                | Values                              |
| :------------------ | :---------------------------------- |
| Role                | PATIENT, ADMIN                      |
| Gender              | MALE, FEMALE                        |
| AppointmentStatus   | CONFIRMED, COMPLETED, CANCELLED     |
| SubscriptionPlan    | FREE, BASIC, AI_PRO                 |
| SubscriptionStatus  | ACTIVE, CANCELLED, PAST_DUE         |

Commands run:
- npx prisma db push — schema applied to database successfully
- npx prisma generate — Prisma Client (v7.7.0) generated successfully

### 5. Auth and Prisma Client Setup (April 8, 2026)
Three files created to wire up the Prisma client singleton and NextAuth v5 with Google OAuth.

| File | Purpose |
| :--- | :--- |
| src/lib/prisma.js | Prisma singleton — prevents multiple client instances during HMR in development |
| src/lib/auth.js | NextAuth config — Google OAuth, Prisma adapter, JWT strategy, session/jwt callbacks |
| src/app/api/auth/[...nextauth]/route.js | NextAuth catch-all route — exposes GET and POST handlers at /api/auth/* |

Key decisions:
- JWT session strategy used (not database sessions) so the session is stored in a cookie, not the DB.
- User id and role are attached to the JWT token via callbacks for easy access in server components.
- Sign-in redirect set to /login (custom page to be built later).

### 6. Project Structure, Config, and Root Layout (April 8, 2026)
Full folder scaffold created. Core configuration and layout files set up.

**Folders created** (with .gitkeep for git tracking):
```
src/
  app/
    (auth)/login/
    (dashboard)/appointments/
    (dashboard)/voice/
    (dashboard)/profile/
    admin/
    api/appointments/
    api/doctors/
    api/stripe/
    api/send-appointment-email/
  components/
    ui/
    layout/
    appointments/
    admin/
    voice/
  hooks/
  actions/
  utils/
```

**Files created or updated:**

| File | Change |
| :--- | :--- |
| next.config.mjs | Added remotePatterns for Unsplash, Google, and GitHub image domains |
| src/components/layout/Providers.jsx | Global client wrapper — SessionProvider + QueryClientProvider |
| src/app/layout.js | Async root layout — fetches session server-side, wraps tree in Providers |
| src/utils/cn.js | cn() utility — clsx + tailwind-merge for conditional class merging |

Dev server confirmed running on localhost:3000 with zero errors.

---

## Essential Commands

### Development
```bash
npm run dev          # Start the local development server
npm run build        # Build the production bundle
npm run lint         # Run ESLint checks
```

### Database (Prisma)
```bash
npx prisma generate  # Sync Prisma Client with your schema
npx prisma db push   # Push schema changes to your local database
npx prisma studio    # Open the visual database editor at localhost:5555
```

### Git
```bash
git add .
git commit -m "your message"
git push origin main
```

---

## Developer Notes
- **Authentication:** Google OAuth is the primary provider configured via NextAuth.
- **Payments:** Stripe is currently in test mode.
- **Prisma v7:** Do not add url to datasource block in schema.prisma — it is handled by prisma.config.ts.
- **Environment Sync:** Always update .env.example when adding new environment variables.

*Last Updated: April 8, 2026 — Project structure, layout, and Providers configured*
