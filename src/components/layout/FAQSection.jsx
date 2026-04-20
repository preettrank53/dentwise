'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const faqItems = [
  {
    question: 'Is Dentwise free to use?',
    answer:
      'Yes. Dentwise includes a free plan for getting started with core appointment booking and patient management. If you need advanced features like expanded limits and AI tools, you can upgrade to a paid plan anytime.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'Booking is simple with our 3-step flow: select a doctor, pick an available time slot, and confirm your appointment details. You will receive confirmation immediately after booking.',
  },
  {
    question: 'Can I cancel or reschedule?',
    answer:
      'Yes. You can manage appointments directly from the My Appointments page, including cancellation and rescheduling when needed.',
  },
  {
    question: 'What is the AI Voice Assistant?',
    answer:
      'Riley is Dentwise\'s AI voice assistant that answers common dental questions and helps guide patients before booking. It does not replace professional diagnosis or treatment advice. AI voice features are available with AI Pro.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Billing is handled securely through Stripe on monthly subscription plans. You can upgrade, downgrade, or cancel anytime, and there are no hidden fees.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is a priority. Authentication is powered by Google OAuth, payments are processed by Stripe, and Dentwise does not store your raw card details.',
  },
  {
    question: 'Which doctors are available?',
    answer:
      'You can browse available dental specialists by profile and specialty, then choose based on availability. Dentwise supports multiple specialties to match different care needs.',
  },
  {
    question: 'Can I use Dentwise on mobile?',
    answer:
      'Absolutely. Dentwise is fully responsive and works across phones, tablets, and desktops, so you can book and manage appointments without installing a separate app.',
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="bg-white">
      <div className="page-container section-padding">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-6 bg-[#619BB6]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#619BB6]">
                FAQs
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-[#1A2832] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#4A6572] leading-relaxed mt-3">
              Everything you need to know about Dentwise
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="border border-[#E2EDF2] rounded-[12px] overflow-hidden divide-y divide-[#E2EDF2]">
              {faqItems.map((item, i) => {
                const isOpen = activeIndex === i

                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => handleToggle(i)}
                      className="w-full px-6 py-5 flex justify-between items-center cursor-pointer hover:bg-[#F8FAFB] transition-colors duration-150 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span className="text-sm font-medium text-[#1A2832] flex-1 pr-4">{item.question}</span>
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-[#619BB6] transition-colors duration-150" />
                      ) : (
                        <Plus className="h-4 w-4 text-[#7A9BAD] transition-colors duration-150" />
                      )}
                    </button>

                    <div
                      id={`faq-answer-${i}`}
                      style={{
                        maxHeight: isOpen ? '500px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <div className="px-6 pb-5 text-sm text-[#4A6572] leading-relaxed">{item.answer}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
