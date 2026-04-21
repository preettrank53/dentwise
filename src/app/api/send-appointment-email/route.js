import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import AppointmentConfirmation from '@/components/emails/AppointmentConfirmation'
import { getValidResendFromEmail } from '@/lib/email'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = getValidResendFromEmail(process.env.RESEND_FROM_EMAIL)
const REPLY_TO_EMAIL = process.env.RESEND_REPLY_TO?.trim() || null
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

    const emailHtml = await render(
      AppointmentConfirmation({
        patientName: body.patientName,
        doctorName: body.doctorName,
        doctorSpecialty: body.doctorSpecialty,
        appointmentDate: body.appointmentDate,
        appointmentTime: body.appointmentTime,
      })
    )

    const emailText = [
      `Hi ${body.patientName},`,
      '',
      'Your appointment has been confirmed.',
      `Doctor: ${body.doctorName}`,
      `Specialty: ${body.doctorSpecialty}`,
      `Date: ${new Date(body.appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`,
      `Time: ${body.appointmentTime}`,
      'Duration: 30 minutes',
      'Status: Confirmed',
      '',
      'Thank you for choosing Dentwise.',
    ].join('\n')

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [body.patientEmail],
      subject: 'Appointment Confirmed — Dentwise',
      html: emailHtml,
      text: emailText,
      ...(REPLY_TO_EMAIL ? { replyTo: REPLY_TO_EMAIL } : {}),
    })

    if (data?.error) {
      return NextResponse.json(
        { error: data.error.message || 'Failed to send email', details: data.error },
        { status: 502 }
      )
    }

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 })
  } catch (error) {
    console.error('Email API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
