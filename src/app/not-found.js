import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFB] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative">
          <p
            className="font-semibold tracking-tight text-[#E2EDF2] leading-none"
            style={{ fontSize: 'clamp(80px, 15vw, 120px)' }}
          >
            404
          </p>
        </div>

        <h1 className="text-2xl font-semibold text-[#1A2832] mt-4">Page Not Found</h1>
        <p className="text-sm text-[#7A9BAD] mt-2 leading-relaxed max-w-xs mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#619BB6] text-white rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#4A7D96] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/appointments"
            className="border border-[#619BB6] text-[#619BB6] rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#EDF5F8] transition-colors"
          >
            Book Appointment
          </Link>
        </div>

        <div className="mt-4">
          <Link href="/" className="text-sm text-[#7A9BAD] hover:text-[#4A6572] transition-colors">
            ← Back
          </Link>
        </div>
      </div>
    </main>
  )
}
