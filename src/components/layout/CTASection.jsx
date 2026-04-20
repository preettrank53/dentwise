import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function CTASection() {
  return (
    <section>
      <div className="page-container section-padding">
        <AnimatedSection direction="up" delay={0}>
          <div className="relative bg-[#1A2832] rounded-[12px] px-8 py-14 md:py-20 text-center overflow-hidden">
            <div className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#619BB6] opacity-[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-[#619BB6] opacity-[0.04] blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#619BB6] mb-4">
                Get Started Today
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
                Ready to Transform Your Dental Practice?
              </h2>

              <p className="text-base text-[#4A6572] mt-4 max-w-md mx-auto leading-relaxed">
                Join patients who manage their dental health smarter with Dentwise. Book your first
                appointment in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/appointments"
                  className="bg-[#619BB6] text-white rounded-[6px] px-6 py-3 text-sm font-medium hover:bg-[#4A7D96] transition-colors"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/#pricing"
                  className="bg-transparent text-white border border-[#2D3F4F] hover:border-[#619BB6] hover:text-[#619BB6] rounded-[6px] px-6 py-3 text-sm font-medium transition-all duration-150"
                >
                  View Pricing
                </Link>
              </div>

              <p className="mt-6 text-xs text-[#4A6572]">
                No credit card required • Free plan available • Cancel anytime
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
