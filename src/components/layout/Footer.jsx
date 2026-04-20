import Link from 'next/link'
import { Globe, Send, Share2, Stethoscope } from 'lucide-react'

export default function Footer() {
  const productLinks = [
    { label: 'Features', href: '/#services' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'AI Assistant', href: '/voice' },
    { label: 'Book Appointment', href: '/appointments' },
  ]

  const companyLinks = [
    { label: 'About', href: '/#' },
    { label: 'Blog', href: '/#' },
    { label: 'Careers', href: '/#' },
    { label: 'Contact', href: '/#' },
  ]

  const supportLinks = [
    { label: 'Help Center', href: '/#' },
    { label: 'Privacy Policy', href: '/#' },
    { label: 'Terms of Service', href: '/#' },
    { label: 'Cookie Policy', href: '/#' },
  ]

  return (
    <footer className="bg-[#1A2832]">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-[8px] bg-[#619BB6] flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-semibold text-lg">Dentwise</span>
            </Link>

            <p className="text-sm text-[#4A6572] mt-3 leading-relaxed max-w-[200px]">
              Smart dental care management for modern clinics.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <Link
                href="#"
                className="h-8 w-8 rounded-[6px] border border-[#2D3F4F] text-[#4A6572] hover:text-white hover:border-[#619BB6] transition-all duration-150 flex items-center justify-center"
              >
                <Globe className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 rounded-[6px] border border-[#2D3F4F] text-[#4A6572] hover:text-white hover:border-[#619BB6] transition-all duration-150 flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 rounded-[6px] border border-[#2D3F4F] text-[#4A6572] hover:text-white hover:border-[#619BB6] transition-all duration-150 flex items-center justify-center"
              >
                <Share2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4A6572] mb-4">Product</h4>
            {productLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#7A9BAD] hover:text-white transition-colors duration-150 block mb-2.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4A6572] mb-4">Company</h4>
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#7A9BAD] hover:text-white transition-colors duration-150 block mb-2.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4A6572] mb-4">Support</h4>
            {supportLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#7A9BAD] hover:text-white transition-colors duration-150 block mb-2.5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[#2D3F4F] my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#4A6572]">© 2026 Dentwise. All rights reserved.</p>

          <p className="text-xs text-[#4A6572]">Built with Next.js and ❤</p>

          <div className="flex items-center gap-4">
            <Link href="/#" className="text-xs text-[#4A6572] hover:text-white transition-colors duration-150">
              Privacy
            </Link>
            <Link href="/#" className="text-xs text-[#4A6572] hover:text-white transition-colors duration-150">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
