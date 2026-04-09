import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import AppointmentConfirmation from '@/components/emails/AppointmentConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const body = await req.json()
    const { 
      patientName, 
      patientEmail, 
      doctorName, 
      doctorSpecialty, 
      appointmentDate, 
      appointmentTime 
    } = body

    // 1. Validation
    if (!patientName || !patientEmail || !doctorName || !doctorSpecialty || !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { error: 'Missing required fields for email confirmation' },
        { status: 400 }
      )
    }

    // 2. Send Email
    const data = await resend.emails.send({
      from: 'Dentwise <onboarding@resend.dev>',
      to: [patientEmail],
      subject: 'Appointment Confirmed — Dentwise',
      react: AppointmentConfirmation({
        patientName,
        doctorName,
        doctorSpecialty,
        appointmentDate,
        appointmentTime
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
