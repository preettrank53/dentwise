import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: Sparkles,
    title: 'Teeth Whitening',
    description:
      'Professional-grade whitening treatments that deliver visibly brighter results.',
    badge: null,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  {
    icon: Zap,
    title: 'Emergency Care',
    description:
      'Same-day emergency appointments for toothaches, broken teeth, and urgent issues.',
    badge: '24/7',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    icon: Shield,
    title: 'Orthodontics',
    description:
      'Braces and clear aligners to straighten your teeth and perfect your bite.',
    badge: null,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Microscope,
    title: 'Dental Implants',
    description:
      'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    badge: 'Advanced',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Heart,
    title: 'Pediatric Dentistry',
    description:
      'Gentle, child-friendly dental care in a calm and welcoming environment.',
    badge: null,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-gray-50">
      <div className="page-container section-padding">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-cyan-50 text-cyan-700 border-cyan-200"
          >
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Dental Care{' '}
            <span className="text-gradient">Under One Roof</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From routine cleanings to advanced procedures, our expert team
            covers all your dental needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="card-hover border bg-white group cursor-pointer"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.bg}`}
                    >
                      <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    {service.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
