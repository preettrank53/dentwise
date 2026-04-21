import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getUserSubscription } from '@/actions/stripe.actions'
import PricingPlans from '@/components/billing/PricingPlans'

export const metadata = {
  title: 'Plans & Billing',
  description: 'View and manage your Dentwise subscription plan.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function BillingPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  const subscription = await getUserSubscription()
  const currentPlan = subscription?.plan || 'FREE'

  const planTone = {
    FREE: 'bg-[#F5F5F5] text-[#6B7280] border-[#D0D0D0]',
    BASIC: 'bg-[#EDF5F8] text-[#4A7D96] border-[#BAD7E1]',
    AI_PRO: 'bg-[#EDF5F8] text-[#1A2832] border-[#BAD7E1]',
  }

  return (
    <div className="page-container pb-20 pt-8 space-y-8">
      <section className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#619BB6] mb-2">
              Billing and Plans
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1A2832] tracking-tight">
              Choose the right plan for your clinic
            </h1>
            <p className="text-sm md:text-base text-[#4A6572] mt-3 max-w-2xl">
              Upgrade anytime, cancel anytime, and manage your subscription securely with Stripe.
            </p>
          </div>

          <div className={`inline-flex items-center border rounded-[4px] px-2 py-1 text-xs font-medium uppercase tracking-wider w-fit ${planTone[currentPlan] || planTone.FREE}`}>
            Current: {currentPlan.replace('_', ' ')}
          </div>
        </div>
      </section>

      <section>
        <PricingPlans currentPlan={currentPlan} />
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[12px] p-5 shadow-[0_1px_3px_rgba(26,40,50,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(26,40,50,0.08)] border border-[#E2EDF2]">
            <h4 className="text-sm font-semibold text-[#1A2832] mb-1">Can I cancel anytime?</h4>
            <p className="text-sm text-[#4A6572] leading-relaxed">
              Yes, cancel from your billing portal with one click.
            </p>
          </div>
          <div className="bg-white rounded-[12px] p-5 shadow-[0_1px_3px_rgba(26,40,50,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(26,40,50,0.08)] border border-[#E2EDF2]">
            <h4 className="text-sm font-semibold text-[#1A2832] mb-1">What payment methods?</h4>
            <p className="text-sm text-[#4A6572] leading-relaxed">
               All major credit and debit cards via Stripe.
            </p>
          </div>
          <div className="bg-white rounded-[12px] p-5 shadow-[0_1px_3px_rgba(26,40,50,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(26,40,50,0.08)] border border-[#E2EDF2]">
            <h4 className="text-sm font-semibold text-[#1A2832] mb-1">Is my data safe?</h4>
            <p className="text-sm text-[#4A6572] leading-relaxed">
              Yes, payments handled by Stripe. We never store card details.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  )
}
