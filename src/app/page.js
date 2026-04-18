import { auth } from '@/lib/auth'

export const metadata = {
  title: 'Dentwise — Smart Dental Care',
  description: 'Book dental appointments, consult AI, and manage your dental health with Dentwise.',
}
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/layout/HeroSection'
import ServicesSection from '@/components/layout/ServicesSection'
import DoctorsSection from '@/components/layout/DoctorsSection'
import PricingSection from '@/components/layout/PricingSection'
import CTASection from '@/components/layout/CTASection'
import Footer from '@/components/layout/Footer'

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <DoctorsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
