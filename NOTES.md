# Production Deployment Notes

## Active TODOs
- src/app/api/send-appointment-email/route.js: Replace in-memory limiter with Upstash Redis in production.
- src/app/api/stripe/webhook/route.js: Replace in-memory limiter with Upstash Redis in production.
- src/app/layout.js: Replace /og-image.png with a professionally designed 1200x630 image before production launch.
