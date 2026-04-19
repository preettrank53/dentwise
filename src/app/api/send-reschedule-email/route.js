import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
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

    const html = `
      <div style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; background: #F8FAFB; padding: 24px; color: #1A2832;">
        <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2EDF2; border-radius: 12px; overflow: hidden;">
          <div style="background: #EDF5F8; border-bottom: 1px solid #BAD7E1; padding: 16px 20px;">
            <h1 style="margin: 0; font-size: 20px; color: #1A2832;">Dentwise</h1>
          </div>

          <div style="padding: 20px;">
            <h2 style="margin: 0 0 12px; font-size: 18px; color: #1A2832;">Your appointment has been rescheduled</h2>

            <p style="margin: 0 0 14px; font-size: 14px; color: #4A6572;">
              Hi ${body.patientName}, here are your updated appointment details:
            </p>

            <p style="margin: 0 0 8px; font-size: 14px; color: #7A9BAD; text-decoration: line-through;">
              Previous: ${oldDateFormatted} at ${oldTimeFormatted}
            </p>

            <p style="margin: 0 0 16px; font-size: 15px; color: #619BB6; font-weight: 700;">
              New: ${newDateFormatted} at ${newTimeFormatted}
            </p>

            <div style="margin: 0 0 16px; padding: 12px; background: #F8FAFB; border: 1px solid #E2EDF2; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #1A2832; font-weight: 600;">${body.doctorName}</p>
              <p style="margin: 4px 0 0; font-size: 13px; color: #7A9BAD;">${body.doctorSpecialty}</p>
            </div>

            <p style="margin: 0; font-size: 13px; color: #4A6572;">
              If you need to cancel please use the Dentwise app.
            </p>
          </div>

          <div style="border-top: 1px solid #E2EDF2; padding: 12px 20px; background: #FFFFFF;">
            <p style="margin: 0; font-size: 12px; color: #A8C4CF;">Dentwise Dental Platform</p>
          </div>
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'Dentwise <onboarding@resend.dev>',
      to: [body.patientEmail],
      subject: 'Appointment Rescheduled — Dentwise',
      html,
    })

    return NextResponse.json({ message: 'Reschedule email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Reschedule Email API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send reschedule email' },
      { status: 500 }
    )
  }
}
