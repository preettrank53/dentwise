# Dentwise

## 1. Header

Smart Dental Care Management Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

Dentwise is a full-stack SaaS platform for modern dental clinics and patients. It combines appointment booking, doctor discovery, subscription billing, admin operations, and AI-powered voice support in one product.

---

## 2. Live Demo

Live Demo: [dentwise.vercel.app](https://dentwise.vercel.app)

Test credentials:

- Patient login: Continue with Google
- Admin login: set the admin email via `ADMIN_EMAIL`

---

## 3. Features

Authentication and security:

- Google OAuth via NextAuth.js
- JWT sessions
- Route protection middleware
- Role-based access control
- Server-side validation with Zod

Appointment system:

- Multi-step booking wizard
- Real-time slot availability checks
- Conflict prevention for booking times
- Cancellation and rescheduling
- Confirmation emails via Resend

AI voice assistant:

- Voice assistant for patient interactions
- Vapi-powered STT/LLM/TTS pipeline
- Live transcript UI
- Plan-gated AI features

Payments and subscriptions:

- Free, Basic, and AI Pro plans
- Stripe Checkout
- Stripe webhooks
- Billing portal support

Admin panel:

- Doctor management
- Appointment status tracking
- Analytics dashboard and charts
- Subscriptions overview
- CSV export

---

## 4. Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Routing, server components, server actions |
| Language | JavaScript | Application code |
| Database | PostgreSQL (Neon) | Relational data storage |
| ORM | Prisma | Data modeling and query access |
| Auth | NextAuth.js | OAuth and session handling |
| State | TanStack Query | Caching and server state |
| Payments | Stripe | Subscription billing and checkout |
| Email | Resend + React Email | Transactional emails |
| AI Voice | Vapi | Voice assistant orchestration |
| UI | Tailwind CSS + shadcn/ui | Styling and reusable components |
| Charts | Recharts | Admin analytics visualizations |
| Validation | Zod + React Hook Form | Input and schema validation |
| Deployment | Vercel | Hosting and serverless runtime |

---

## 5. Project Structure

```text
dentwise/
|-- prisma/
|   |-- schema.prisma
|   `-- seed.js
|-- public/
|-- src/
|   |-- actions/
|   |-- app/
|   |   |-- (auth)/
|   |   |-- (dashboard)/
|   |   |-- admin/
|   |   `-- api/
|   |-- components/
|   |-- hooks/
|   |-- lib/
|   `-- middleware.js
|-- components.json
|-- eslint.config.mjs
|-- jsconfig.json
|-- next.config.mjs
|-- package.json
|-- postcss.config.mjs
|-- prisma.config.ts
|-- tailwind.config.mjs
`-- README.md
```

---

## 6. Getting Started

Prerequisites:

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials
- Stripe account
- Resend account
- Vapi account

Installation:

```bash
git clone https://github.com/yourusername/dentwise.git
cd dentwise
npm install
```

Environment setup:

```bash
cp .env.example .env
```

Database setup:

```bash
npx prisma db push
npx prisma db seed
```

Run locally:

```bash
npm run dev
```

---

## 7. Environment Variables

| Variable | Description | Source |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Database provider |
| `NEXTAUTH_URL` | Application base URL | Local or deployed URL |
| `NEXTAUTH_SECRET` | NextAuth secret | Generated secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Google Cloud Console |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe dashboard |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Stripe dashboard |
| `STRIPE_BASIC_PRICE_ID` | Stripe Basic plan price ID | Stripe products |
| `STRIPE_PRO_PRICE_ID` | Stripe AI Pro plan price ID | Stripe products |
| `RESEND_API_KEY` | Resend API key | Resend dashboard |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Vapi public key | Vapi dashboard |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | Vapi assistant ID | Vapi dashboard |
| `ADMIN_EMAIL` | Admin account email | Project configuration |

---

## 8. Database Schema

| Table | Key Fields | Purpose |
|---|---|---|
| `users` | `id`, `email`, `name`, `role` | Patient and admin identities |
| `accounts` | `userId`, `provider` | OAuth provider linkage |
| `sessions` | `userId`, `sessionToken` | Session storage |
| `verification_tokens` | `identifier`, `token` | Verification and recovery flows |
| `doctors` | `id`, `name`, `specialty`, `isActive` | Doctor catalog |
| `appointments` | `userId`, `doctorId`, `dateTime`, `status` | Appointment bookings |
| `subscriptions` | `userId`, `plan`, `stripeCustomerId` | Billing and plan state |

Key relationships:

- `appointments.userId -> users.id`
- `appointments.doctorId -> doctors.id`
- `subscriptions.userId -> users.id` (one-to-one)

---

## 9. Key Architecture Decisions

1. Server Actions for write-heavy workflows:
Mutation logic (booking, billing, admin updates) runs server-side to reduce API boilerplate and keep sensitive operations off the client.

2. TanStack Query for consistency:
Caching and invalidation keep dashboard and booking data synchronized after mutations without manual refresh handling.

3. Validation in two layers:
Client-side validation improves UX; server-side validation enforces trust boundaries.

4. Shared design tokens:
Custom semantic tokens ensure consistent visual behavior across landing, dashboard, and admin interfaces.

---

## 10. Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Configure all required environment variables.
4. Add production OAuth redirect URIs in Google Cloud Console.
5. Configure Stripe webhook endpoint for production.
6. Deploy.

Production checklist:

- [ ] Environment variables configured
- [ ] OAuth redirect URIs updated
- [ ] Stripe webhook configured
- [ ] Database schema applied
- [ ] Seed data loaded (optional)
- [ ] `ADMIN_EMAIL` verified

---

## 11. Subscription Plans

| Feature | Free | Basic ($9/mo) | AI Pro ($19/mo) |
|---|---|---|---|
| Book appointments | Yes | Yes | Yes |
| Email confirmations | Yes | Yes | Yes |
| Appointment history | Yes | Yes | Yes |
| Unlimited bookings | No | Yes | Yes |
| Rescheduling | No | Yes | Yes |
| Priority booking | No | Yes | Yes |
| AI Voice Assistant | No | No | Yes |
| Unlimited AI consultations | No | No | Yes |

---

## 12. Contributing and License

Contributing:

Pull requests are welcome. Open an issue first for major changes so implementation scope can be aligned before development.

License:

This project is licensed under the MIT License.

---

## 13. Acknowledgements

- Next.js by Vercel
- Prisma by Prisma
- Stripe for billing infrastructure
- Resend for transactional email
- Vapi for voice AI capabilities
- TanStack Query for data fetching and cache control
