import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUserSubscription } from '@/actions/stripe.actions'
import VoiceInterface from '@/components/voice/VoiceInterface'
import UpgradePrompt from '@/components/billing/UpgradePrompt'
import { Mic, Crown } from 'lucide-react'

export default async function VoicePage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const subscription = await getUserSubscription()
  const isAiPro = subscription?.plan === 'AI_PRO' || session.user.email === process.env.ADMIN_EMAIL // Let admin pass for test if necessary, but actually code specifically says "Check if plan === 'AI_PRO'"

  if (subscription?.plan !== 'AI_PRO') {
    return (
      <div className="page-container section-padding min-h-[70vh] flex items-center justify-center">
        <UpgradePrompt 
          title="AI Voice Assistant"
          description="Upgrade to AI Pro to unlock Riley, your personal 24/7 AI dental assistant. Riley can answer patient questions, provide pricing info, and guide patients through your services."
        />
      </div>
    )
  }

  return (
    <div className="page-container pb-20">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Voice Assistant</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Mic className="h-4 w-4 text-cyan-500" />
            <p className="text-sm text-gray-500">Powered by Vapi AI</p>
          </div>
        </div>
        
        <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider shrink-0 w-fit">
          <Crown className="h-4 w-4" />
          AI Pro Active
        </div>
      </div>

      {/* VOICE INTERFACE */}
      <VoiceInterface />
    </div>
  )
}
