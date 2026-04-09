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
    <section className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-50 blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-50 blur-3xl opacity-60 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="page-container section-padding">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8 py-12 md:py-20">

          {/* Badge */}
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm font-medium bg-cyan-50 text-cyan-700 border-cyan-200"
          >
            ✨ AI-Powered Dental Care Platform
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Your Smile Deserves{' '}
            <span className="text-gradient">
              Smart Care
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Book appointments with top dental specialists, get instant AI-powered
            dental advice, and manage your oral health — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              size="lg"
              className="gradient-primary text-white border-0 h-12 px-8 text-base"
              asChild
            >
              <Link href="/appointments">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              asChild
            >
              <Link href="/voice">
                Try AI Assistant
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl pt-8 border-t">
            {stats.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50">
                  <Icon className="h-5 w-5 text-cyan-600" />
                </div>
                <p className="font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
