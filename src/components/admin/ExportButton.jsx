'use client'

import React, { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getAllAppointments } from '@/actions/admin.actions'
import {
  convertToCSV,
  downloadCSV,
  formatAppointmentsForExport,
  generateFilename,
} from '@/lib/exportUtils'

const APPOINTMENT_COLUMNS = [
  { key: 'patientName', label: 'Patient Name' },
  { key: 'patientEmail', label: 'Patient Email' },
  { key: 'doctorName', label: 'Doctor' },
  { key: 'doctorSpecialty', label: 'Specialty' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'duration', label: 'Duration' },
  { key: 'status', label: 'Status' },
  { key: 'reason', label: 'Reason' },
  { key: 'bookedOn', label: 'Booked On' },
]

export default function ExportButton({ filters = {}, disabled = false }) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)

      const appointments = await getAllAppointments(filters)
      const formattedData = formatAppointmentsForExport(appointments)
      const filename = generateFilename(filters)
      const csvString = convertToCSV(formattedData, APPOINTMENT_COLUMNS)

      downloadCSV(csvString, filename)

      toast.success('Export complete', {
        description: `${formattedData.length} appointments exported`,
        duration: 5000,
      })
    } catch (error) {
      toast.error('Export failed', {
        description: error?.message || 'Unable to export appointments right now.',
        duration: 5000,
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={disabled || isExporting}
      className="inline-flex items-center border border-[#E2EDF2] text-[#4A6572] hover:bg-[#EDF5F8] hover:text-[#1A2832] rounded-[6px] px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </>
      )}
    </button>
  )
}
