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
  title: {
    absolute: 'Dentwise - Smart Dental Care',
  },
  description: 'Book appointments with top dental specialists, get AI-powered dental advice, and manage your oral health. Free plan available.',
  openGraph: {
    type: 'website',
    title: 'Dentwise — Smart Dental Care Platform',
    description: 'Book dental appointments in minutes. Choose from certified specialists. Get AI dental advice with Riley.',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dentwise - Smart Dental Care Platform',
      },
    ],
  },
}

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
