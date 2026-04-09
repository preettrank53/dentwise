import React from 'react'

/**
 * Appointment Confirmation Email Template
 * Designed for cross-client compatibility using inline styles.
 */
export default function AppointmentConfirmation({
  patientName,
  doctorName,
  doctorSpecialty,
  appointmentDate,
  appointmentTime
}) {
  const containerStyle = {
    fontFamily: '"Inter", "Helvetica", Arial, sans-serif',
    backgroundColor: '#f8fafc',
    padding: '40px 20px',
    color: '#0f172a',
  }

  const mainStyle = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    maxWidth: '580px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  }

  const headerStyle = {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#f0fdfa',
    borderBottom: '1px solid #ccfbf1',
  }

  const brandStyle = {
    fontSize: '24px',
    fontWeight: '900',
    color: '#0891b2', // cyan-600
    letterSpacing: '-0.5px',
    marginBottom: '10px',
  }

  const headingStyle = {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0',
  }

  const bodyStyle = {
    padding: '40px 30px',
  }

  const detailsBoxStyle = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px',
    marginTop: '24px',
  }

  const detailRowStyle = {
    marginBottom: '12px',
    fontSize: '15px',
  }

  const labelStyle = {
    fontWeight: 'bold',
    color: '#64748b',
    marginRight: '8px',
  }

  const footerStyle = {
    padding: '20px 30px 40px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#94a3b8',
  }

  const formattedDateString = new Date(appointmentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div style={containerStyle}>
      <div style={mainStyle}>
        
        {/* Header */}
        <div style={headerStyle}>
          <div style={brandStyle}>DENTWISE</div>
          <h1 style={headingStyle}>Appointment Confirmed!</h1>
          <div style={{ marginTop: '10px', color: '#10b981', fontWeight: 'bold' }}>
            ✓ SECURED
          </div>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Hi {patientName},</p>
          <p style={{ lineHeight: '1.6', color: '#475569' }}>
            Great news! Your dental appointment has been successfully scheduled. 
            We look forward to seeing you soon.
          </p>

          <div style={detailsBoxStyle}>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Doctor:</span>
              <span style={{ fontWeight: 'bold' }}>{doctorName}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Specialty:</span>
              <span>{doctorSpecialty}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Date:</span>
              <span style={{ fontWeight: 'bold' }}>{formattedDateString}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Time:</span>
              <span style={{ fontWeight: 'bold' }}>{appointmentTime}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Duration:</span>
              <span>30 minutes</span>
            </div>
            <div style={{ ...detailRowStyle, marginBottom: 0 }}>
              <span style={labelStyle}>Status:</span>
              <span style={{ color: '#0891b2', fontWeight: 'bold' }}>Confirmed</span>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', borderLeft: '4px solid #0891b2', backgroundColor: '#f0fdfa' }}>
            <p style={{ margin: '0 0 10px', fontWeight: 'bold', fontSize: '14px' }}>IMPORTANT NOTES:</p>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.8' }}>
              <li>Please arrive 10 minutes early for check-in.</li>
              <li>Bring a valid government-issued ID.</li>
              <li>Contact us to reschedule at least 24 hours in advance.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <p style={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '4px' }}>
            Thank you for choosing Dentwise
          </p>
          <p>
            This email was sent from an automated system. Please do not reply.
            © 2026 Dentwise Clinic. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  )
}
