import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import Link from 'next/link'

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialty: 'General Dentistry',
    rating: 4.9,
    reviews: 312,
    experience: '12 years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
    available: true,
  },
  {
    name: 'Dr. James Okafor',
    specialty: 'Orthodontics',
    rating: 4.8,
    reviews: 198,
    experience: '9 years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
    available: true,
  },
  {
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatric Dentistry',
    rating: 5.0,
    reviews: 421,
    experience: '15 years',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop',
    available: false,
  },
  {
    name: 'Dr. Marcus Chen',
    specialty: 'Dental Implants',
    rating: 4.9,
    reviews: 276,
    experience: '11 years',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop',
    available: true,
  },
]

export default function DoctorsSection() {
  return (
    <section id="doctors" className="bg-white">
      <div className="page-container section-padding">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-cyan-50 text-cyan-700 border-cyan-200"
          >
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our{' '}
            <span className="text-gradient">Expert Dentists</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Board-certified specialists dedicated to delivering exceptional
            dental care with a gentle touch.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <Card
              key={doctor.name}
              className="card-hover border text-center group"
            >
              <CardContent className="p-6 flex flex-col items-center gap-4">

                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="gradient-primary text-white text-xl">
                      {doctor.name.charAt(3)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                      doctor.available ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-sm">{doctor.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {doctor.specialty}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {doctor.experience} exp.
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{doctor.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({doctor.reviews})
                  </span>
                </div>

                {/* Badge */}
                <Badge
                  variant={doctor.available ? 'default' : 'secondary'}
                  className={`text-xs ${
                    doctor.available
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {doctor.available ? 'Available' : 'Unavailable'}
                </Badge>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  asChild
                >
                  <Link href="/appointments">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/appointments">View All Doctors</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
