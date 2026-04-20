import { Star } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const testimonials = [
  {
    name: 'Olivia Bennett',
    role: 'Patient',
    rating: 5,
    text: 'Booking my appointment took less than 2 minutes. The email confirmation was instant and super clear.',
    initials: 'OB',
  },
  {
    name: 'Noah Ramirez',
    role: 'Dental Patient',
    rating: 5,
    text: 'Riley the AI assistant answered my teeth whitening questions before I even booked, which saved me time.',
    initials: 'NR',
  },
  {
    name: 'Sophia Chen',
    role: 'Patient',
    rating: 5,
    text: 'The doctor selection is so easy. I could see specialties and pick the right dentist for my child.',
    initials: 'SC',
  },
  {
    name: 'Ethan Clarke',
    role: 'Dental Patient',
    rating: 5,
    text: 'Rescheduling was seamless and I got a new confirmation right away. The whole experience feels modern.',
    initials: 'EC',
  },
  {
    name: 'Mia Sullivan',
    role: 'Patient',
    rating: 5,
    text: 'I love seeing everything in one dashboard. Reminders are on time and I never miss appointments now.',
    initials: 'MS',
  },
  {
    name: 'Liam Foster',
    role: 'Dental Patient',
    rating: 5,
    text: 'As a busy parent, quick booking and clear updates make a huge difference. Dentwise keeps it simple.',
    initials: 'LF',
  },
  {
    name: 'Ava Thompson',
    role: 'Patient',
    rating: 5,
    text: 'The clinic communication is excellent. I receive confirmations, reminders, and follow-up notes right on time.',
    initials: 'AT',
  },
  {
    name: 'Lucas Morgan',
    role: 'Dental Patient',
    rating: 5,
    text: 'From finding the right specialist to final confirmation, every step felt fast, polished, and stress-free.',
    initials: 'LM',
  },
]

const rowOne = [...testimonials, ...testimonials]
const rowTwo = [...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)]

function TestimonialCard({ testimonial, index }) {
  return (
    <article
      className="flex-shrink-0 w-80 bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-5 mx-3"
      aria-label={`testimonial-${index}`}
    >
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={`${testimonial.name}-star-${i}`} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
        ))}
      </div>

      <p className="text-sm text-[#4A6572] leading-relaxed mb-4">{testimonial.text}</p>

      <div className="flex items-center gap-3">
        <span className="h-8 w-8 rounded-full bg-[#EDF5F8] text-[#619BB6] text-xs font-semibold flex items-center justify-center">
          {testimonial.initials}
        </span>
        <div>
          <p className="text-sm font-medium text-[#1A2832]">{testimonial.name}</p>
          <p className="text-xs text-[#7A9BAD]">{testimonial.role}</p>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialMarquee() {
  return (
    <section className="bg-[#F8FAFB] section-padding overflow-hidden">
      <div className="page-container">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#619BB6]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#619BB6]">
              Patient Reviews
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#1A2832] tracking-tight">
            Loved by Patients
          </h2>
          <p className="text-base text-[#4A6572] leading-relaxed mt-3">
            Thousands of patients trust Dentwise for fast booking, clear communication, and better
            dental care experiences.
          </p>
        </AnimatedSection>
      </div>

      <div
        className="space-y-6"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee-left">
          {rowOne.map((testimonial, index) => (
            <TestimonialCard
              key={`row1-${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <div className="flex w-max animate-marquee-right">
          {rowTwo.map((testimonial, index) => (
            <TestimonialCard
              key={`row2-${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
