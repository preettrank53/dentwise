# Dentwise - Internal Development Log

This document serves as the private log and technical reference for the Dentwise project. It tracks the project's setup, architectural decisions, and infrastructure updates.

---

## Project Status: Day 1 Complete — Fully Configured

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

### 7. Shadcn UI, Global CSS Theme, and Middleware (April 8, 2026)

**Shadcn UI initialized and components installed:**

| Component | File |
| :--- | :--- |
| Button | src/components/ui/button.jsx |
| Input | src/components/ui/input.jsx |
| Label | src/components/ui/label.jsx |
| Card | src/components/ui/card.jsx |
| Badge | src/components/ui/badge.jsx |
| Avatar | src/components/ui/avatar.jsx |
| Dialog | src/components/ui/dialog.jsx |
| Select | src/components/ui/select.jsx |
| Textarea | src/components/ui/textarea.jsx |
| Separator | src/components/ui/separator.jsx |
| Dropdown Menu | src/components/ui/dropdown-menu.jsx |
| Sonner (Toast) | src/components/ui/sonner.jsx |
| Skeleton | src/components/ui/skeleton.jsx |
| Table | src/components/ui/table.jsx |

Note: `toast` is deprecated in shadcn@4 — replaced with `sonner`.

**globals.css** — Updated with Dentwise dental theme (cyan/blue primary, full light/dark CSS variables).
Rewritten for Tailwind v4 compatibility: uses @import and var() directly instead of @apply with shorthand utilities.

**middleware.js** — Route protection using `next-auth/jwt getToken()` (Edge-compatible).
Protects: /appointments, /voice, /profile (auth required), /admin (admin email check).
Note: Original implementation using `auth()` from @/lib/auth was replaced because it pulled Prisma into the Edge Runtime.

**Key bug fixes in this session:**
- prisma.js converted from CommonJS to ESM (import/export)
- `server-only` added to prisma.js and auth.js to prevent browser bundling
- layout.js removed `auth()` call (Prisma cannot run in client bundle)
- middleware rewritten to use `getToken()` instead of auth() (Edge Runtime safe)
- globals.css rewritten for Tailwind v4 (no @apply with CSS variable shorthands)

**Dev server status:** Running on localhost:3000, page loads HTTP 200 with zero Prisma errors.
Remaining console warning: `GET /api/auth/session 500` — expected; resolves when real Google OAuth credentials are set in .env.

### 8. Frontend UI and Dashboard Assembly (April 8-9, 2026)
Assembled the core user experience and protected dashboard environment.

- **Landing Page:** Integrated all layout components (`Navbar`, `HeroSection`, `ServicesSection`, `DoctorsSection`, `PricingSection`, `CTASection`, `Footer`) into `app/page.js`.
- **Dashboard Infrastructure:**
  - **Sidebar:** Created `Sidebar.jsx` with a fixed desktop position and a mobile bottom-navigation variant.
  - **Layout:** Built `(dashboard)/layout.js` with server-side authentication redirects and headers.
  - **Home Page:** Created `(dashboard)/dashboard/page.js` featuring welcome banners and summary cards.
- **Routing Strategy:** Updated the root page (`/`) to automatically redirect authenticated users to `/dashboard` while guests see the landing page.

### 9. Doctor Management System (April 9, 2026)
Built a high-performance administration module for clinic staff management.

- **Server Actions:** Implemented a robust data layer in `doctor.actions.js` using Prisma v7 (CRUD operations + status toggling).
- **TanStack Query Hooks:** Encapsulated server actions into custom hooks in `useDoctors.js` for seamless state management, automatic cache invalidation, and refined loading/error states.
- **Admin UI:** 
  - **DoctorsTable:** Professional data table with skeletal loading states and status badges.
  - **DoctorFormModal:** Flexible modal form utilizing `react-hook-form` and `zod` for strict schema validation.
- **Admin Shield:** Hardened the `/admin/doctors` route with mandatory server-side session and `ADMIN_EMAIL` verification.

---

## Developer Notes
- **Authentication:** Google OAuth is the primary provider configured via NextAuth.
- **Dashboard Routing:** The root page (`/`) acts as a router based on auth status.
- **Doctor Stats:** Currently using static placeholders; real data integration planned for the next sprint.
- **Icon Compatibility:** Certain brand icons (Twitter, FB) were replaced with `Globe`, `Camera`, etc., due to version-specific limitations in `lucide-react`.
- **Prisma v7:** Do not add url to datasource block in schema.prisma.
- **Middleware:** Uses next-auth/jwt getToken() — Edge Runtime safe.
- **server-only:** Prevents server-side secrets from appearing in the client-side bundle.

*Last Updated: April 9, 2026 — Day 2 complete. Dashboard, Doctors CRUD, and Admin controls fully established.*
