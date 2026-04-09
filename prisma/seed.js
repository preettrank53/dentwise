const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const doctorsData = [
  {
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@dentwise.com',
    specialty: 'Orthodontics',
    bio: 'Dr. Jenkins has over 12 years of experience in creating perfect smiles through modern orthodontic techniques. She specializes in both traditional braces and clear aligners.',
    imageURL: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    gender: 'FEMALE',
    isActive: true,
  },
  {
    name: 'Dr. Michael Chen',
    email: 'michael.chen@dentwise.com',
    specialty: 'Dental Implants',
    bio: 'A leader in restorative dentistry, Dr. Chen focuses on high-precision dental implants. He is dedicated to helping patients regain their confidence with natural-looking results.',
    imageURL: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    gender: 'MALE',
    isActive: true,
  },
  {
    name: 'Dr. Elena Rodriguez',
    email: 'elena.rodriguez@dentwise.com',
    specialty: 'Pediatric Dentistry',
    bio: 'Dr. Rodriguez makes every visit fun for her young patients. She is passionate about preventive care and helping children develop healthy dental habits from an early age.',
    imageURL: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    gender: 'FEMALE',
    isActive: true,
  },
  {
    name: 'Dr. David Wilson',
    email: 'david.wilson@dentwise.com',
    specialty: 'Emergency Care',
    bio: 'With a background in oral surgery and urgent care, Dr. Wilson provides swift and compassionate treatment for dental emergencies, ensuring patients find immediate relief.',
    imageURL: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    gender: 'MALE',
    isActive: true,
  },
  {
    name: 'Dr. Maya Patel',
    email: 'maya.patel@dentwise.com',
    specialty: 'Teeth Whitening',
    bio: 'Dr. Patel specializes in cosmetic dentistry with a focus on advanced teeth whitening procedures. She combines art and science to create bright, radiant smiles.',
    imageURL: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop',
    gender: 'FEMALE',
    isActive: true,
  },
  {
    name: 'Dr. James Thompson',
    email: 'james.thompson@dentwise.com',
    specialty: 'General Dentistry',
    bio: 'Dr. Thompson provides comprehensive dental care for the whole family. His patient-first approach ensures that routine checkups are comfortable and thorough.',
    imageURL: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
    gender: 'MALE',
    isActive: false,
  },
]

async function main() {
  console.log('Start seeding doctors...')

  for (const doctor of doctorsData) {
    const upsertedDoctor = await prisma.doctor.upsert({
      where: { email: doctor.email },
      update: {},
      create: doctor,
    })
    console.log(`Upserted doctor: ${upsertedDoctor.name} (${upsertedDoctor.specialty})`)
  }

  console.log('Seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
