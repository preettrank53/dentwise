import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    badge: null,
    highlight: false,
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
    highlight: true,
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
    badge: 'Best Value',
    highlight: false,
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
    <section id="pricing" className="bg-gray-50">
      <div className="page-container section-padding">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-cyan-50 text-cyan-700 border-cyan-200"
          >
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple,{' '}
            <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your dental care needs.
            Upgrade or cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlight
                  ? 'border-cyan-500 border-2 shadow-lg shadow-cyan-100'
                  : 'border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gradient-primary text-white border-0 px-4">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="p-6 pb-0">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm mb-1">
                      /{plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 flex flex-col flex-1 gap-6">
                <Separator />
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-cyan-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? 'gradient-primary text-white border-0'
                      : ''
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
