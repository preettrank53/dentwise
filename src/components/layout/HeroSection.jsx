import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Shield, Clock } from 'lucide-react'

export default function HeroSection() {
  const stats = [
    { icon: Star, label: '4.9 Rating', sub: 'From 2,000+ patients' },
    { icon: Shield, label: '100% Safe', sub: 'Certified doctors' },
    { icon: Clock, label: '24/7 Support', sub: 'AI assistant always on' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 min-h-[90vh] flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      </div>

      <div className="page-container section-padding relative z-10 w-full mt-16 md:mt-0">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8 py-12 md:py-20">

          {/* Badge */}
          <div className="bg-white/10 border border-white/20 text-cyan-400 text-xs font-medium rounded-full px-4 py-1.5 inline-flex items-center">
            ✨ AI-Powered Dental Care
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Your Smile Deserves<br/>
            <span className="text-gradient">
              Smart Care
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            Book appointments with top dental specialists, get instant AI-powered
            dental advice, and manage your oral health — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
            <Button
              size="lg"
              className="gradient-primary text-white border-0 rounded-xl h-12 px-8 font-bold"
              asChild
            >
              <Link href="/appointments">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-xl h-12 px-8 font-bold"
              asChild
            >
              <Link href="/voice">
                Try AI Assistant
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl pt-10 mt-6 border-t border-white/10">
            {stats.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center rounded-xl bg-white/10 p-2.5">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-white">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
