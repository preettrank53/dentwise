import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import AppointmentConfirmation from '@/components/emails/AppointmentConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)
const REQUIRED_FIELDS = [
  'patientName',
  'patientEmail',
  'doctorName',
  'doctorSpecialty',
  'appointmentDate',
  'appointmentTime',
]

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({
      error: 'Method not allowed',
    }, { status: 405 })
  }

  try {
    const body = await req.json()
    const missing = REQUIRED_FIELDS.filter((f) => !body[f])
    if (missing.length > 0) {
      return NextResponse.json({
        error: 'Missing required fields',
        fields: missing,
      }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.patientEmail)) {
      return NextResponse.json({
        error: 'Invalid email address',
      }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set, skipping email')
      return NextResponse.json({
        success: true,
        skipped: true,
      })
    }

    // In production, protect this route with IP-based rate limiting
    // to reduce abuse and bot-triggered email flooding.

    const data = await resend.emails.send({
      from: 'Dentwise <onboarding@resend.dev>',
      to: [body.patientEmail],
      subject: 'Appointment Confirmed — Dentwise',
      react: AppointmentConfirmation({
        patientName: body.patientName,
        doctorName: body.doctorName,
        doctorSpecialty: body.doctorSpecialty,
        appointmentDate: body.appointmentDate,
        appointmentTime: body.appointmentTime,
      }),
    })

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 })
  } catch (error) {
    console.error('Email API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
