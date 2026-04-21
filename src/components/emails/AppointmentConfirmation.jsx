import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Heading,
} from '@react-email/components'

export default function AppointmentConfirmation({
  patientName,
  doctorName,
  doctorSpecialty,
  appointmentDate,
  appointmentTime,
}) {
  const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: 'DM Sans, Arial, sans-serif',
          backgroundColor: '#F8FAFB',
          margin: 0,
          padding: '24px 16px',
        }}
      >
        <Container
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Section
            style={{
              backgroundColor: '#619BB6',
              padding: '32px 40px',
              textAlign: 'center',
            }}
          >
            <Heading
              as="h1"
              style={{
                color: '#ffffff',
                fontSize: '24px',
                fontWeight: '600',
                margin: '0',
              }}
            >
              Dentwise
            </Heading>
            <Text
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '14px',
                margin: '4px 0 0',
              }}
            >
              Appointment Confirmed
            </Text>
          </Section>

          <Section style={{ padding: '32px 40px' }}>
            <Text
              style={{
                fontSize: '16px',
                color: '#1A2832',
                margin: '0 0 12px',
              }}
            >
              Hi {patientName},
            </Text>

            <Text
              style={{
                fontSize: '14px',
                color: '#4A6572',
                lineHeight: '1.6',
                margin: '0',
              }}
            >
              Your appointment has been successfully scheduled. We are looking forward to seeing you.
            </Text>

            <Section
              style={{
                backgroundColor: '#EDF5F8',
                borderRadius: '8px',
                padding: '20px 24px',
                margin: '24px 0',
                borderLeft: '4px solid #619BB6',
              }}
            >
              <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['Doctor:', doctorName],
                    ['Specialty:', doctorSpecialty],
                    ['Date:', formattedDate],
                    ['Time:', appointmentTime],
                    ['Duration:', '30 minutes'],
                    ['Status:', 'Confirmed ✓'],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td
                        style={{
                          width: '80px',
                          padding: '0 12px 10px 0',
                          fontWeight: '600',
                          color: '#1A2832',
                          fontSize: '14px',
                          verticalAlign: 'top',
                        }}
                      >
                        {label}
                      </td>
                      <td
                        style={{
                          padding: '0 0 10px',
                          color: '#4A6572',
                          fontSize: '14px',
                          verticalAlign: 'top',
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section
              style={{
                backgroundColor: '#F8FAFB',
                borderRadius: '8px',
                padding: '16px 20px',
                margin: '16px 0',
              }}
            >
              <Text style={{ margin: '0 0 8px', fontSize: '14px', color: '#4A6572', lineHeight: '1.6' }}>
                • Please arrive 10 minutes early
              </Text>
              <Text style={{ margin: '0 0 8px', fontSize: '14px', color: '#4A6572', lineHeight: '1.6' }}>
                • Bring a valid photo ID
              </Text>
              <Text style={{ margin: '0', fontSize: '14px', color: '#4A6572', lineHeight: '1.6' }}>
                • Cancel 24 hours in advance if needed
              </Text>
            </Section>

            <Hr style={{ borderColor: '#E2EDF2', margin: '24px 0 12px' }} />

            <Text
              style={{
                margin: '0',
                fontSize: '12px',
                color: '#7A9BAD',
                textAlign: 'center',
              }}
            >
              Thank you for choosing Dentwise
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
