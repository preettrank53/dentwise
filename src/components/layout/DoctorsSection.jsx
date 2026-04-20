import { Star } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { unstable_noStore as noStore } from 'next/cache'

export default async function DoctorsSection() {
  noStore()

  const doctors = await prisma.doctor.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      specialty: true,
      imageURL: true,
      _count: { select: { appointments: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  })

  return (
    <section id="doctors" className="bg-white">
      <div className="page-container section-padding">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#619BB6]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#619BB6]">
              Our Team
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#1A2832] tracking-tight mb-4">
            Meet Our Expert Dentists
          </h2>
          <p className="text-base text-[#4A6572] leading-relaxed">
            Board-certified specialists dedicated to delivering exceptional dental care with a
            gentle touch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {doctors.map((doctor) => {
            const reviews = doctor._count?.appointments || 0
            const rating = reviews > 0 ? 4.9 : 4.8

            return (
            <article
              key={doctor.id}
              className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-5 text-center hover:border-[#BAD7E1] hover:-translate-y-[1px] transition-all duration-150"
            >
              <img
                src={doctor.imageURL}
                alt={doctor.name}
                className="h-20 w-20 rounded-full mx-auto border-2 border-[#E2EDF2] object-cover"
              />

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#1A2832]">{doctor.name}</h3>
                <p className="text-xs text-[#7A9BAD] mt-1">{doctor.specialty}</p>
                <p className="text-xs text-[#7A9BAD]">Experienced specialist</p>
              </div>

              <div className="flex items-center justify-center gap-1 mt-3">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-[#1A2832]">{rating}</span>
                <span className="text-xs text-[#7A9BAD]">({reviews})</span>
              </div>

              <span
                className={[
                  'inline-flex items-center justify-center rounded-[4px] text-[10px] border px-2 py-1 mt-3',
                  'bg-[#F0FAF4] text-[#2D7A4F] border-[#A8D5B5]',
                ].join(' ')}
              >
                  Available
              </span>

              <Link
                href="/appointments"
                className="mt-4 block w-full text-xs py-2 rounded-[6px] border border-[#E2EDF2] text-[#4A6572] hover:border-[#619BB6] hover:text-[#619BB6] transition-colors duration-150"
              >
                Book Now
              </Link>
            </article>
          )})}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/appointments"
            className="inline-flex items-center border border-[#619BB6] text-[#619BB6] rounded-[6px] px-5 py-2.5 text-sm hover:bg-[#EDF5F8] transition-colors duration-150"
          >
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  )
}
