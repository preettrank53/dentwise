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
  'newDate',
  'oldDate',
]

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export async function POST(req) {
  try {
    const body = await req.json()
    const missing = REQUIRED_FIELDS.filter((f) => !body[f])

    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missing },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const oldDateFormatted = formatDate(body.oldDate)
    const oldTimeFormatted = formatTime(body.oldDate)
    const newDateFormatted = formatDate(body.newDate)
    const newTimeFormatted = formatTime(body.newDate)

    const appointmentTimeWithNote = `${newTimeFormatted} (rescheduled from ${oldDateFormatted} at ${oldTimeFormatted})`

    const html = await render(
      AppointmentConfirmation({
        patientName: body.patientName,
        doctorName: body.doctorName,
        doctorSpecialty: body.doctorSpecialty,
        appointmentDate: body.newDate,
        appointmentTime: appointmentTimeWithNote,
      })
    )

    const text = [
      `Hi ${body.patientName},`,
      '',
      'Your appointment has been rescheduled.',
      `Doctor: ${body.doctorName}`,
      `Specialty: ${body.doctorSpecialty}`,
      `Previous: ${oldDateFormatted} at ${oldTimeFormatted}`,
      `New: ${newDateFormatted} at ${newTimeFormatted}`,
      '',
      'Thank you for choosing Dentwise.',
    ].join('\n')

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [body.patientEmail],
      subject: 'Appointment Rescheduled — Dentwise',
      html,
      text,
      ...(REPLY_TO_EMAIL ? { replyTo: REPLY_TO_EMAIL } : {}),
    })

    if (result?.error) {
      return NextResponse.json(
        { error: result.error.message || 'Failed to send reschedule email', details: result.error },
        { status: 502 }
      )
    }

    return NextResponse.json({ message: 'Reschedule email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Reschedule Email API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send reschedule email' },
      { status: 500 }
    )
  }
}
