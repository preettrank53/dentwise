import { Check } from 'lucide-react'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    badge: null,
    key: 'free',
    features: [
      'Book up to 2 appointments/month',
      'View doctor profiles',
      'Email confirmations',
      'Basic patient dashboard',
    ],
    cta: 'Get Started Free',
    href: '/login',
  },
  {
    name: 'Basic',
    price: '$9',
    period: 'per month',
    description: 'For regular dental care',
    badge: 'Most Popular',
    key: 'basic',
    features: [
      'Unlimited appointments',
      'Priority booking',
      'Appointment reminders',
      'Full patient history',
      'Cancel & reschedule anytime',
    ],
    cta: 'Start Basic Plan',
    href: '/login',
  },
  {
    name: 'AI Pro',
    price: '$19',
    period: 'per month',
    description: 'Full AI-powered experience',
    badge: null,
    key: 'pro',
    features: [
      'Everything in Basic',
      'AI Voice Assistant access',
      'Unlimited AI consultations',
      'Personalized dental insights',
      'Priority support',
    ],
    cta: 'Start AI Pro',
    href: '/login',
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#F8FAFB]">
      <div className="page-container section-padding">
        <AnimatedSection className="max-w-xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#619BB6]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#619BB6]">
              Pricing
            </span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1A2832]">Simple, Transparent Pricing</h2>
          <p className="text-base text-[#4A6572] leading-relaxed mt-3">
            Choose the plan that fits your care journey. Upgrade or cancel anytime.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isFree = plan.key === 'free'
            const isBasic = plan.key === 'basic'
            const isPro = plan.key === 'pro'
            const delay = isFree ? 0 : isBasic ? 150 : 300

            return (
              <AnimatedSection key={plan.name} delay={delay}>
                <article
                  className={[
                    'rounded-[12px] p-8 flex flex-col relative',
                    isFree && 'bg-white border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)]',
                    isBasic && 'bg-[#619BB6] border border-[#619BB6] shadow-[0_8px_24px_rgba(97,155,182,0.25)] pt-12',
                    isPro && 'bg-[#1A2832] border border-[#1A2832] shadow-[0_8px_24px_rgba(26,40,50,0.15)]',
                  ].join(' ')}
                >
                  {isBasic && (
                    <span className="absolute top-3 left-1/2 -translate-x-1/2 text-center bg-white/20 text-white rounded-[4px] px-3 py-1 text-xs font-medium whitespace-nowrap">
                      Most Popular
                    </span>
                  )}

                  <p className={[
                    'text-xs font-semibold uppercase tracking-widest mb-4',
                    isBasic ? 'text-white/70' : isPro ? 'text-white/70' : 'text-[#7A9BAD]'
                  ].join(' ')}>
                    {plan.name}
                  </p>

                <p className={[
                  'text-4xl font-semibold mb-1',
                  isBasic || isPro ? 'text-white' : 'text-[#1A2832]'
                ].join(' ')}>
                  {plan.price}
                </p>

                <p className={[
                  'text-sm',
                  isBasic || isPro ? 'text-white/70' : 'text-[#7A9BAD]'
                ].join(' ')}>
                  /{plan.period}
                </p>

                <p className={[
                  'text-sm mb-6 mt-3',
                  isBasic || isPro ? 'text-white/70' : 'text-[#7A9BAD]'
                ].join(' ')}>
                  {plan.description}
                </p>

                <div className={[
                  'border-t pt-6 mb-6',
                  isBasic ? 'border-white/20' : isPro ? 'border-white/20' : 'border-[#E2EDF2]'
                ].join(' ')}>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className={[
                          'h-4 w-4 mt-0.5 shrink-0',
                          isBasic ? 'text-white' : 'text-[#619BB6]'
                        ].join(' ')} />
                        <span className={[
                          'text-sm',
                          isBasic || isPro ? 'text-white/90' : 'text-[#4A6572]'
                        ].join(' ')}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                  <Link
                    href={plan.href}
                    className={[
                      'w-full mt-auto rounded-[6px] py-2.5 text-sm text-center transition-colors',
                      isFree && 'border border-[#E2EDF2] text-[#4A6572] hover:border-[#619BB6] hover:text-[#619BB6]',
                      isBasic && 'bg-white text-[#619BB6] font-medium hover:bg-[#EDF5F8]',
                      isPro && 'bg-[#619BB6] text-white font-medium hover:bg-[#4A7D96]',
                    ].join(' ')}
                  >
                    {plan.cta}
                  </Link>
                </article>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
