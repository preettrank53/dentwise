import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getUserSubscription } from '@/actions/stripe.actions'
import PricingPlans from '@/components/billing/PricingPlans'

export const metadata = {
  title: 'Billing & Plans — Dentwise',
  description: 'Manage your subscription plan and billing for Dentwise.',
}

export default async function BillingPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  const subscription = await getUserSubscription()

  return (
    <div className="min-h-screen bg-gray-50 pb-20 -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
      
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-24 px-4 relative overflow-hidden">
        {/* Subtle glowing elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="border border-cyan-500/30 text-cyan-400 bg-cyan-500/10 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 whitespace-nowrap">
            Flexible Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            Choose Your <span className="text-gradient pr-2 italic">Plan</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-medium">
            Upgrade anytime. Cancel anytime. No hidden fees. Select the perfect tier for your dental health tracking journey.
          </p>
        </div>
      </section>

      {/* Pricing Plans Wrapper */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <PricingPlans currentPlan={subscription.plan} />
      </section>

      {/* FAQ Strip */}
      <section className="max-w-5xl mx-auto px-4 mt-16 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-md border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Can I cancel anytime?</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Yes, cancel from your billing portal with one click.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-md border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">What payment methods?</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
               All major credit and debit cards via Stripe.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-md border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Is my data safe?</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Yes, payments handled by Stripe. We never store card details.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  )
}
