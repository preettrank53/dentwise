# Dentwise - Internal Development Log

This document serves as the private log and technical reference for the Dentwise project. It tracks the project's setup, architectural decisions, and infrastructure updates.

---

## Project Status: Initial Setup Complete

The foundation of the project has been established with a full-stack Next.js environment.

### Core Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js (v5 Beta)
- **Payments:** Stripe
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

### 2. Dependency Management
Standard production packages installed:
- @prisma/client, @auth/prisma-adapter, next-auth@beta
- @tanstack/react-query, @tanstack/react-query-devtools
- stripe, @stripe/stripe-js, resend
- zod, react-hook-form, @hookform/resolvers
- lucide-react, class-variance-authority, clsx, tailwind-merge

### 3. Database and Environment Configuration
- **Environment:** Dedicated .env and .env.example files created.
- **Database URL:** Configured to local PostgreSQL (postgres user on port 5432).
- **Prisma:** Initialized with prisma/schema.prisma structure.
- **Security:** .env is listed in .gitignore to prevent credential leaks.

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
npx prisma studio    # Open the visual database editor
```

---

## Developer Notes
- **Authentication:** Google OAuth is the primary provider configured via NextAuth.
- **Payments:** Stripe is currently in test mode.
- **Environment Sync:** Always update .env.example when adding new environment variables.

*Last Updated: April 8, 2026*
