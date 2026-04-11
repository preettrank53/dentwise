import React from 'react'
import Link from 'next/link'
import { Lock, Mic, Brain, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UpgradePrompt({ feature, requiredPlan, description }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto p-10 flex flex-col items-center gap-6 text-center">
      
      {/* Top Section */}
      <div className="bg-gray-100 rounded-2xl p-4 inline-flex items-center justify-center">
        <Lock className="h-8 w-8 text-gray-400" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Unlock {feature}</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Required Plan Badge */}
      <div className="bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-4 py-1.5 text-sm font-bold tracking-wider uppercase">
        Requires {requiredPlan}
      </div>

      {/* Feature Highlights section */}
      <div className="bg-gray-50 rounded-xl p-4 w-full space-y-3 text-left">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-2 shadow-sm shrink-0">
            <Mic className="h-4 w-4 text-cyan-600" />
          </div>
          <span className="text-sm text-gray-600 font-medium">Real-time voice conversations</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-2 shadow-sm shrink-0">
            <Brain className="h-4 w-4 text-cyan-600" />
          </div>
          <span className="text-sm text-gray-600 font-medium">AI dental advice instantly</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-2 shadow-sm shrink-0">
            <Clock className="h-4 w-4 text-cyan-600" />
          </div>
          <span className="text-sm text-gray-600 font-medium">Available 24/7</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="w-full space-y-3 pt-2">
        <Button asChild className="gradient-primary text-white rounded-xl w-full h-11 font-bold shadow-cyan-100 shadow-md hover:shadow-lg transition-all">
          <Link href="/billing">Upgrade to {requiredPlan} — $19/mo</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl w-full h-11 font-bold border-gray-200 text-gray-700">
          <Link href="/billing">View All Plans</Link>
        </Button>
      </div>

      {/* Bottom Note */}
      <p className="text-xs text-gray-400 mt-2 font-medium">
        Cancel anytime • Secure payment via Stripe
      </p>

    </div>
  )
}
