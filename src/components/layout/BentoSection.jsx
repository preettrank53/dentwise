import { CreditCard, Mail, Mic, Users } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function BentoSection() {
  return (
    <section className="bg-[#F8FAFB]">
      <div className="page-container section-padding">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#619BB6]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#619BB6]">
              Features
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#1A2832] tracking-tight">
            Everything Your Clinic Needs
          </h2>
          <p className="text-base text-[#4A6572] leading-relaxed mt-3">
            Dentwise combines scheduling, communication, voice support, and analytics in one clean
            workflow for modern dental teams.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(170px,auto)] md:auto-rows-[minmax(190px,auto)]">
          <article className="rounded-[12px] p-6 md:p-8 bg-[#619BB6] text-white md:col-span-2 transition-all duration-200 hover:-translate-y-[2px]">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              Smart Appointment Booking
            </h3>
            <p className="text-sm md:text-base text-white/85 max-w-xl leading-relaxed">
              Patients can find specialists, choose slots, and confirm visits in minutes with an
              intuitive booking flow.
            </p>

            <div className="mt-6 bg-white/10 border border-white/20 rounded-[12px] p-4 max-w-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-[8px] bg-white/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" aria-hidden="true">
                      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M8 3.5V7M16 3.5V7M4 9.5H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-white">Booking Calendar</span>
                </div>
                <span className="text-xs text-white/80">Today</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {[...Array(14)].map((_, i) => (
                  <span
                    key={`slot-${i}`}
                    className={[
                      'h-5 rounded-[4px]',
                      i === 3 || i === 8 ? 'bg-white' : 'bg-white/30',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[12px] p-6 md:p-8 bg-[#1A2832] text-white md:row-span-2 transition-all duration-200 hover:-translate-y-[2px]">
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <Mic className="h-8 w-8" />
              </div>
              <div className="h-12 w-12 rounded-full bg-[#619BB6] text-white text-lg font-semibold flex items-center justify-center mb-5">
                R
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Voice Assistant - Riley</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-2">Ask dental questions by voice</p>
              <p className="text-sm text-white/65">Available 24/7</p>
            </div>
          </article>

          <article className="rounded-[12px] p-6 bg-white border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] transition-all duration-200 hover:-translate-y-[2px]">
            <Mail className="h-8 w-8 text-[#619BB6] mb-4" />
            <h3 className="text-lg font-semibold text-[#1A2832] mb-2">Email Confirmations</h3>
            <p className="text-sm text-[#4A6572] leading-relaxed">
              Automatic confirmations and reminders keep patients informed before every visit.
            </p>
          </article>

          <article className="rounded-[12px] p-6 bg-white border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] transition-all duration-200 hover:-translate-y-[2px]">
            <Users className="h-8 w-8 text-[#619BB6] mb-4" />
            <h3 className="text-lg font-semibold text-[#1A2832] mb-2">Doctor Management</h3>
            <p className="text-sm text-[#4A6572] leading-relaxed">
              Add profiles, manage availability, and keep your care team organized in one place.
            </p>
          </article>

          <article className="rounded-[12px] p-6 bg-[#EDF5F8] border border-[#E2EDF2] transition-all duration-200 hover:-translate-y-[2px]">
            <CreditCard className="h-8 w-8 text-[#619BB6] mb-4" />
            <h3 className="text-lg font-semibold text-[#1A2832] mb-2">Subscription Plans</h3>
            <p className="text-sm text-[#4A6572] leading-relaxed">Free, Basic, AI Pro</p>
          </article>

          <article className="rounded-[12px] p-6 md:p-8 bg-white border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] md:col-span-2 transition-all duration-200 hover:-translate-y-[2px]">
            <h3 className="text-xl font-semibold text-[#1A2832] mb-2">Real-time Analytics</h3>
            <p className="text-sm text-[#4A6572] leading-relaxed mb-5">
              Track your clinic performance instantly and monitor growth across every key metric.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-[8px] border border-[#E2EDF2] bg-[#F8FAFB] p-3">
                <p className="text-xs text-[#7A9BAD]">Appointments</p>
                <p className="text-xl font-semibold text-[#1A2832] mt-1">248</p>
              </div>
              <div className="rounded-[8px] border border-[#E2EDF2] bg-[#F8FAFB] p-3">
                <p className="text-xs text-[#7A9BAD]">Doctors</p>
                <p className="text-xl font-semibold text-[#1A2832] mt-1">12</p>
              </div>
              <div className="rounded-[8px] border border-[#E2EDF2] bg-[#F8FAFB] p-3">
                <p className="text-xs text-[#7A9BAD]">Patients</p>
                <p className="text-xl font-semibold text-[#1A2832] mt-1">1,964</p>
              </div>
            </div>
          </article>
        </AnimatedSection>
      </div>
    </section>
  )
}
