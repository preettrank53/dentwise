export function convertToCSV(data, columns) {
  if (!Array.isArray(data) || data.length === 0) {
    const headerOnly = columns.map((column) => escapeCSVValue(column.label)).join(',')
    return `${headerOnly}\n`
  }

  const headerRow = columns.map((column) => escapeCSVValue(column.label)).join(',')

  const rows = data.map((item) => {
    return columns
      .map((column) => {
        const rawValue = item?.[column.key]
        const formattedValue = typeof column.format === 'function'
          ? column.format(rawValue, item)
          : rawValue

        return escapeCSVValue(formattedValue)
      })
      .join(',')
  })

  return [headerRow, ...rows].join('\n')
}

export function downloadCSV(csvString, filename) {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const objectUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = objectUrl
  link.setAttribute('download', filename)
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(objectUrl)
}

export function formatAppointmentsForExport(appointments) {
  if (!Array.isArray(appointments)) {
    return []
  }

  return appointments.map((appointment) => {
    const appointmentDate = appointment?.dateTime ? new Date(appointment.dateTime) : null
    const createdDate = appointment?.createdAt ? new Date(appointment.createdAt) : null

    return {
      patientName: appointment?.user?.name || 'N/A',
      patientEmail: appointment?.user?.email || 'N/A',
      doctorName: appointment?.doctor?.name || 'N/A',
      doctorSpecialty: appointment?.doctor?.specialty || 'N/A',
      date: appointmentDate
        ? appointmentDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'N/A',
      time: appointmentDate
        ? appointmentDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
        : 'N/A',
      duration: '30 minutes',
      status: appointment?.status || 'N/A',
      reason: appointment?.reason || 'N/A',
      bookedOn: createdDate
        ? createdDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'N/A',
    }
  })
}

export function generateFilename(filters = {}) {
  const statusRaw = filters?.status || 'all'
  const normalizedStatus = String(statusRaw).toLowerCase()

  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `dentwise-appointments-${normalizedStatus}-${year}-${month}-${day}.csv`
}

function escapeCSVValue(value) {
  const safeValue = value == null ? '' : String(value)
  const escapedValue = safeValue.replace(/"/g, '""')
  return `"${escapedValue}"`
}
