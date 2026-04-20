import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/layout/HeroSection'
import ServicesSection from '@/components/layout/ServicesSection'
import BentoSection from '@/components/layout/BentoSection'
import DoctorsSection from '@/components/layout/DoctorsSection'
import TestimonialMarquee from '@/components/layout/TestimonialMarquee'
import PricingSection from '@/components/layout/PricingSection'
import FAQSection from '@/components/layout/FAQSection'
import CTASection from '@/components/layout/CTASection'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Dentwise — Smart Dental Care',
  description: 'Book appointments with top dental specialists, get AI-powered dental advice, and manage your oral health - all in one platform.',
}

export const revalidate = 0

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <BentoSection />
      <DoctorsSection />
      <TestimonialMarquee />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  )
}
