'use server'

import { stripe } from '@/lib/stripe'
import { PLANS } from '@/lib/plans'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { handlePrismaError } from '@/lib/prismaErrors'

export async function createCheckoutSession(planKey) {
  try {
    const session = await auth()
    if (!session?.user?.email) throw new Error('Unauthorized')

    const validPlans = ['BASIC', 'AI_PRO']
    if (!validPlans.includes(planKey)) {
      throw new Error('Invalid plan selected')
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    if (!user) throw new Error('User not found')

    let subscription = await prisma.subscription.findUnique({
      where: { userId: user.id }
    })

    if (subscription?.plan === planKey) {
      throw new Error('You are already on this plan')
    }

    let stripeCustomerId = subscription?.stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id }
      })
      stripeCustomerId = customer.id

      await prisma.subscription.upsert({
        where: { userId: user.id },
        update: { stripeCustomerId: stripeCustomerId },
        create: { 
          userId: user.id, 
          stripeCustomerId: stripeCustomerId,
          plan: 'FREE',
          status: 'ACTIVE'
        }
      })
    }

    const priceId = PLANS[planKey]?.priceId
    if (!priceId) {
      throw new Error('This plan is not currently available. Please contact support.')
    }

    const nextAuthUrl = process.env.NEXTAUTH_URL

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${nextAuthUrl}/profile?success=true`,
      cancel_url: `${nextAuthUrl}/profile?cancelled=true`,
      metadata: { userId: user.id, plan: planKey }
    })

    return { url: checkoutSession.url }
  } catch (error) {
    console.error('Checkout Session Error:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}

export async function createBillingPortalSession() {
  try {
    const session = await auth()
    if (!session?.user?.email) throw new Error('Not authenticated')

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    if (!user) throw new Error('User not found')

    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id }
    })

    if (!subscription?.stripeCustomerId) {
      throw new Error('No Stripe customer tracking found')
    }

    const nextAuthUrl = process.env.NEXTAUTH_URL

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${nextAuthUrl}/profile`
    })

    return { url: portalSession.url }
  } catch (error) {
    console.error('Billing Portal Error:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}

export async function getUserSubscription() {
  try {
    const session = await auth()
    if (!session?.user?.email) throw new Error('Not authenticated')

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    if (!user) throw new Error('User not found')

    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id }
    })

    if (!subscription) {
      return { 
        plan: 'FREE', 
        status: 'ACTIVE', 
        stripeCustomerId: null 
      }
    }

    // Reconcile from Stripe if local data is stale (e.g. missed webhook events).
    if (subscription.stripeCustomerId) {
      try {
        const stripeSubs = await stripe.subscriptions.list({
          customer: subscription.stripeCustomerId,
          status: 'all',
          limit: 5,
        })

        const liveSub = stripeSubs.data.find((s) =>
          ['active', 'trialing', 'past_due'].includes(s.status)
        )

        if (liveSub) {
          const livePriceId = liveSub.items?.data?.[0]?.price?.id || null
          const livePlan =
            livePriceId === PLANS.AI_PRO.priceId
              ? 'AI_PRO'
              : livePriceId === PLANS.BASIC.priceId
                ? 'BASIC'
                : subscription.plan

          const liveStatus = liveSub.status === 'past_due' ? 'PAST_DUE' : 'ACTIVE'

          const needsSync =
            subscription.plan !== livePlan ||
            subscription.status !== liveStatus ||
            subscription.stripeSubscriptionId !== liveSub.id ||
            subscription.stripePriceId !== livePriceId

          if (needsSync) {
            const synced = await prisma.subscription.update({
              where: { id: subscription.id },
              data: {
                plan: livePlan,
                status: liveStatus,
                stripeSubscriptionId: liveSub.id,
                stripePriceId: livePriceId,
                currentPeriodEnd: new Date(liveSub.current_period_end * 1000),
              },
            })
            return synced
          }
        }
      } catch (syncError) {
        console.error('Subscription reconcile failed:', syncError)
      }
    }

    return subscription
  } catch (error) {
    console.error('Get Subscription Error:', error)
    if (error?.code?.startsWith?.('P')) {
      throw new Error(handlePrismaError(error))
    }
    throw new Error(error.message || 'Something went wrong')
  }
}
