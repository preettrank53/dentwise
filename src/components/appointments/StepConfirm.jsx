'use client'

import React from 'react'
import { useGetDoctorById } from '@/hooks/useDoctors'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  AlertCircle,
  Calendar, 
  Clock, 
  Timer, 
  FileText, 
  CheckCircle,
  Loader2
} from 'lucide-react'

/**
 * Step 3: Review and Confirm Booking
 * @param {string} doctorId - ID of the selected doctor
 * @param {Date} selectedDateTime - Final appointment timestamp
 * @param {string} reason - Reason for visit
 * @param {function} onConfirm - Form submission handler
 * @param {boolean} isLoading - Submission state
 */
export default function StepConfirm({
  doctorId,
  selectedDateTime,
  reason,
  onConfirm,
  isLoading,
  mutation
}) {
  const { data: doctor, isLoading: doctorLoading } = useGetDoctorById(doctorId)

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  if (doctorLoading) {
    return (
      <Card className="max-w-md mx-auto bg-white rounded-[12px] border border-[#E2EDF2] py-8">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="w-full px-8 pt-4 space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="bg-white rounded-[12px] border border-[#E2EDF2] max-w-md mx-auto overflow-hidden">
        <div className="bg-[#EDF5F8] px-6 py-5 border-b border-[#BAD7E1]">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#619BB6]" />
            <CardTitle className="text-sm font-semibold text-[#1A2832]">Booking Summary</CardTitle>
          </div>
          <CardDescription className="text-xs text-[#7A9BAD] mt-1">
            Review before confirming
          </CardDescription>
        </div>

        <CardContent className="p-0">
          {/* Doctor Info Row */}
          <div className="px-6 py-4 flex items-center gap-4 border-b border-[#F0F6F8]">
            <Avatar className="h-10 w-10 rounded-full border border-[#E2EDF2]">
              <AvatarImage src={doctor?.imageURL} alt={doctor?.name} />
              <AvatarFallback className="bg-[#EDF5F8] text-[#4A7D96] text-xs rounded-full">
                {doctor?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold text-[#1A2832]">{doctor?.name}</h4>
              <p className="text-xs text-[#7A9BAD]">{doctor?.specialty}</p>
            </div>
          </div>

          {/* Appointment Rows */}
          <div>
            <InfoRow 
              icon={<Calendar className="h-3.5 w-3.5 text-[#619BB6]" />} 
              label="Date" 
              value={formatDate(selectedDateTime)} 
            />
            <InfoRow 
              icon={<Clock className="h-3.5 w-3.5 text-[#619BB6]" />} 
              label="Time" 
              value={formatTime(selectedDateTime)} 
            />
            <InfoRow 
              icon={<Timer className="h-3.5 w-3.5 text-[#619BB6]" />} 
              label="Duration" 
              value="30 minutes" 
            />
            <InfoRow 
              icon={<FileText className="h-3.5 w-3.5 text-[#619BB6]" />} 
              label="Reason" 
              value={reason || "No reason provided"} 
            />
          </div>
        </CardContent>
      </Card>

      <button
        type="button"
        className="w-full mt-4 bg-[#619BB6] text-white rounded-[6px] py-3 text-sm font-medium hover:bg-[#4A7D96] transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center"
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm Booking"
        )}
      </button>

      {mutation?.isError && (
        <div
          style={{
            background: '#FDF2F2',
            border: '1px solid #E8A09A',
            borderRadius: '6px',
            padding: '12px 16px',
            marginTop: '12px',
          }}
        >
          <p className="form-error" style={{ marginTop: 0 }}>
            <AlertCircle className="h-4 w-4" />
            {mutation.error?.message || 'Booking failed. Please try again.'}
          </p>
        </div>
      )}

      <p className="text-xs text-[#A8C4CF] text-center mt-2">
        You will receive a confirmation email
      </p>
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="px-6 py-3 flex items-center gap-3 border-b border-[#F0F6F8] last:border-0">
      <div className="h-7 w-7 rounded-[6px] bg-[#EDF5F8] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="text-xs text-[#7A9BAD] w-16">{label}</span>
      <span className="text-sm font-medium text-[#1A2832] ml-auto text-right">{value}</span>
    </div>
  )
}
