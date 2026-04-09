import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import {
  Stethoscope,
  Globe,
  Camera,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/#about' },
      { label: 'Our Team', href: '/#team' },
      { label: 'Careers', href: '/#careers' },
      { label: 'Contact', href: '/#contact' },
    ],
    services: [
      { label: 'General Dentistry', href: '/#services' },
      { label: 'Teeth Whitening', href: '/#services' },
      { label: 'Orthodontics', href: '/#services' },
      { label: 'Dental Implants', href: '/#services' },
    ],
    support: [
      { label: 'Help Center', href: '/#help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Patient Portal', href: '/appointments' },
    ],
  }

  return (
    <footer className="bg-white border-t">
      <div className="page-container py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Dentwise</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading the way in modern dental care with AI-powered diagnostics
              and accessible patient-centric solutions. Your smile is our
              priority.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                <Camera className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Company</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-cyan-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Services</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-cyan-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Smile Boulevard, Health City, DE 56789
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-cyan-500 shrink-0" />
                <span className="text-sm text-muted-foreground">+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyan-500 shrink-0" />
                <span className="text-sm text-muted-foreground">hello@dentwise.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Dentwise Dental Care. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-cyan-600 underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-cyan-600 underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-cyan-600 underline-offset-4 hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
