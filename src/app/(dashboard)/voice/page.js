import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getUserSubscription } from '@/actions/stripe.actions'
import UpgradePrompt from '@/components/billing/UpgradePrompt'
import { Mic } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default async function VoicePage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/login')
  }

  const subscription = await getUserSubscription()

  if (subscription.plan !== 'AI_PRO') {
    return (
      <main className="page-container section-padding flex items-center justify-center min-h-[60vh]">
        <UpgradePrompt 
          feature="AI Voice Assistant"
          requiredPlan="AI Pro"
          description="Talk to Riley, your personal AI dental assistant. Get instant advice, answers to dental questions, and guidance — all by voice."
        />
      </main>
    )
  }

  return (
    <main className="page-container section-padding text-center min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">AI Voice Assistant</h1>
        <p className="text-gray-500 font-medium max-w-md mx-auto">
          Talk to Riley, your AI dental assistant
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto p-12 flex flex-col items-center gap-6 w-full">
        <div className="gradient-primary rounded-full p-6 shadow-lg shadow-cyan-200 animate-pulse">
          <Mic className="h-16 w-16 text-white" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900">Voice interface coming in Day 11</h2>
        
        <Badge className="bg-green-50 text-green-700 border border-green-200 mt-2 font-bold px-3 py-1 shadow-sm uppercase tracking-wider">
          AI Pro ✓ Active
        </Badge>
      </div>

    </main>
  )
}
