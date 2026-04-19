import {
  Smile,
  Shield,
  Zap,
  Heart,
  Microscope,
  Sparkles,
} from 'lucide-react'

const services = [
  {
    icon: Smile,
    title: 'General Dentistry',
    description:
      'Routine checkups, cleanings, fillings, and preventive care to keep your teeth healthy.',
    badge: 'Most Popular',
  },
  {
    icon: Sparkles,
    title: 'Teeth Whitening',
    description:
      'Professional-grade whitening treatments that deliver visibly brighter results.',
    badge: null,
  },
  {
    icon: Zap,
    title: 'Emergency Care',
    description:
      'Same-day emergency appointments for toothaches, broken teeth, and urgent issues.',
    badge: '24/7',
  },
  {
    icon: Shield,
    title: 'Orthodontics',
    description:
      'Braces and clear aligners to straighten your teeth and perfect your bite.',
    badge: null,
  },
  {
    icon: Microscope,
    title: 'Dental Implants',
    description:
      'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    badge: 'Advanced',
  },
  {
    icon: Heart,
    title: 'Pediatric Dentistry',
    description:
      'Gentle, child-friendly dental care in a calm and welcoming environment.',
    badge: null,
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white">
      <div className="page-container section-padding">
        <div className="max-w-xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#619BB6]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#619BB6]">
              Our Services
            </span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1A2832] tracking-tight">
            Complete Dental Care Under One Roof
          </h2>
          <p className="text-base text-[#4A6572] leading-relaxed mt-3">
            From routine cleanings to advanced procedures, our expert team covers every stage of your
            dental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 hover:border-[#BAD7E1] hover:shadow-[0_4px_12px_rgba(26,40,50,0.08)] transition-all duration-150 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-[8px] bg-[#EDF5F8] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[#619BB6]" />
                </div>

                <h3 className="text-sm font-semibold text-[#1A2832] mb-2">{service.title}</h3>
                <p className="text-sm text-[#4A6572] leading-relaxed">{service.description}</p>

                {service.badge && (
                  <span className="badge badge-confirmed text-[10px] mt-3">{service.badge}</span>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
