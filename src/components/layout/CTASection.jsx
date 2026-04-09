import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-primary w-full">
        <div className="page-container section-padding">
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Join thousands of happy patients who trust Dentwise for their
              dental health. Book your first appointment today or chat with our
              AI assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 text-base font-semibold bg-white text-cyan-600 hover:bg-white/90 border-0"
                asChild
              >
                <Link href="/appointments">
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4 text-cyan-500" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base font-semibold border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                asChild
              >
                <Link href="/voice">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Try AI Assistant
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[40px] border-white" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border-[20px] border-white" />
        </div>
      </div>
    </section>
  )
}
