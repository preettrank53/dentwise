import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="bg-[#F8FAFB]">
      <div className="h-1 w-full bg-[#619BB6]" />

      <div className="page-container section-padding py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-[#619BB6]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#619BB6]">
                Advanced Dental Care
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold text-[#1A2832] tracking-tight leading-[1.1]">
              <span className="block">Your Smile,</span>
              <span className="block">Our Expertise.</span>
            </h1>

            <p className="text-base text-[#4A6572] leading-relaxed max-w-md mt-6">
              Book appointments with certified dental specialists, get AI-powered dental advice,
              and manage your oral health - all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/appointments"
                className="bg-[#619BB6] text-white rounded-[6px] px-6 py-3 text-sm font-medium hover:bg-[#4A7D96] transition-colors text-center"
              >
                Book Appointment
              </Link>
              <Link
                href="/voice"
                className="bg-white text-[#619BB6] border border-[#619BB6] rounded-[6px] px-6 py-3 text-sm font-medium hover:bg-[#EDF5F8] transition-colors text-center"
              >
                Try AI Assistant
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[#E2EDF2]">
              <div>
                <p className="text-sm font-semibold text-[#1A2832]">4.9 ★ Rating</p>
                <p className="text-xs text-[#7A9BAD]">2,000+ patients</p>
              </div>
              <span className="h-8 w-px bg-[#E2EDF2]" />
              <div>
                <p className="text-sm font-semibold text-[#1A2832]">98% Retention</p>
                <p className="text-xs text-[#7A9BAD]">long-term care</p>
              </div>
              <span className="h-8 w-px bg-[#E2EDF2]" />
              <div>
                <p className="text-sm font-semibold text-[#1A2832]">Same-day Slots</p>
                <p className="text-xs text-[#7A9BAD]">quick bookings</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative lg:flex lg:justify-center">
            <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_8px_32px_rgba(26,40,50,0.08)] p-5 w-full max-w-[430px]">
              <div className="h-48 w-full rounded-[8px] bg-[#EDF5F8] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80"
                  alt="Dentist profile"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="mt-3">
                <p className="text-sm font-semibold text-[#1A2832]">Dr. Amelia Foster, DDS</p>
                <p className="text-xs text-[#7A9BAD]">Cosmetic & Preventive Dentistry</p>
                <span className="badge badge-confirmed mt-2">Available Today</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-8 bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_4px_16px_rgba(26,40,50,0.10)] px-4 py-3 flex items-center gap-3">
              <span className="h-5 w-5 text-[#619BB6] bg-[#EDF5F8] rounded-[6px] p-1.5 inline-flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-[#1A2832]">Appointment Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
