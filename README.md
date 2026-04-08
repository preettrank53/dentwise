# Dentwise - Internal Development Log

This document serves as the private log and technical reference for the Dentwise project. It tracks the project's setup, architectural decisions, and infrastructure updates.

---

## Project Status: Database Schema Complete

The foundation and database layer of the project are fully established.

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

*Last Updated: April 8, 2026*
