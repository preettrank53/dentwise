import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Fallback predictable version
})

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      'Basic profile management',
      'View appointment history',
      'Standard email support',
      'Book regular appointments'
    ]
  },
  BASIC: {
    name: 'Basic',
    price: 9,
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: [
      'Everything in Free',
      'Priority booking',
      'SMS reminders',
      '24/7 dedicated support',
      'Early access to new features'
    ]
  },
  AI_PRO: {
    name: 'AI Pro',
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Everything in Basic',
      '24/7 AI Voice Dental Assistant',
      'Personalized oral health tracking',
      'Custom treatment timelines',
      'Exclusive partner discounts',
      'Direct messaging with clinic'
    ]
  }
}
