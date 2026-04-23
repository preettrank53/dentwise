# Deployment Notes

## Pre-deployment steps
1. Update `NEXTAUTH_URL` to production domain.
2. Add production domain to Google OAuth authorized redirect URIs.
3. Create production Stripe webhook pointing to `https://yourdomain.com/api/stripe/webhook`.
4. Update `STRIPE_WEBHOOK_SECRET` with production webhook secret.
5. Run `npx prisma db push` on production database.

## Environment variables required
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_REPLY_TO`
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
- `NEXT_PUBLIC_VAPI_ASSISTANT_ID`
- `ADMIN_EMAIL`

## Post-deployment verification
1. Test Google login on live URL.
2. Test booking flow end to end.
3. Make a real Stripe test payment.
4. Verify email arrives.
5. Test admin panel access.
