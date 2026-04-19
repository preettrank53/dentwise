import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUserSubscription } from '@/actions/stripe.actions'
import VoiceInterface from '@/components/voice/VoiceInterface'
import UpgradePrompt from '@/components/billing/UpgradePrompt'
import { Mic, Crown } from 'lucide-react'

export const metadata = {
  title: 'AI Assistant — Dentwise',
  description: 'Talk to Riley, your AI-powered dental assistant.',
}

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
    <div className="page-container pb-20 pt-8 space-y-6">
      <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A2832]">AI Voice Assistant</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Mic className="h-4 w-4 text-[#619BB6]" />
            <p className="text-sm text-[#4A6572]">Powered by Vapi AI</p>
          </div>
        </div>
        
        <div className="inline-flex items-center gap-1.5 bg-[#EDF5F8] text-[#1A2832] border border-[#BAD7E1] rounded-[4px] px-2 py-1 text-xs font-medium uppercase tracking-wider shrink-0 w-fit">
          <Crown className="h-4 w-4" />
          AI Pro Active
        </div>
      </div>

      <VoiceInterface />
    </div>
  )
}
