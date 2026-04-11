import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const data = event.data.object

    switch (event.type) {
      case 'checkout.session.completed': {
        const customerId = data.customer
        const subscriptionId = data.subscription
        const userId = data.metadata?.userId
        const planKey = data.metadata?.plan

        if (subscriptionId && userId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const priceId = subscription.items.data[0].price.id

          await prisma.subscription.upsert({
            where: { userId },
            update: {
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              plan: planKey,
              status: 'ACTIVE',
              currentPeriodEnd: new Date(subscription.current_period_end * 1000)
            },
            create: {
              userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              plan: planKey,
              status: 'ACTIVE',
              currentPeriodEnd: new Date(subscription.current_period_end * 1000)
            }
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscriptionId = data.id
        const statusRaw = data.status
        const currentPeriodEnd = new Date(data.current_period_end * 1000)
        const priceId = data.items.data[0].price.id

        let dbStatus = 'ACTIVE'
        if (statusRaw === 'active') dbStatus = 'ACTIVE'
        else if (statusRaw === 'past_due') dbStatus = 'PAST_DUE'
        else if (statusRaw === 'canceled') dbStatus = 'CANCELLED'

        const existingSub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId }
        })

        if (existingSub) {
          await prisma.subscription.update({
            where: { id: existingSub.id },
            data: {
              status: dbStatus,
              currentPeriodEnd,
              stripePriceId: priceId
            }
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscriptionId = data.id

        const existingSub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId }
        })

        if (existingSub) {
          await prisma.subscription.update({
            where: { id: existingSub.id },
            data: {
              status: 'CANCELLED',
              plan: 'FREE',
              stripeSubscriptionId: null
            }
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const customerId = data.customer

        const existingSub = await prisma.subscription.findFirst({
          where: { stripeCustomerId: customerId }
        })

        if (existingSub) {
          await prisma.subscription.update({
            where: { id: existingSub.id },
            data: {
              status: 'PAST_DUE'
            }
          })
        }
        break
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`)
        break
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
    
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
