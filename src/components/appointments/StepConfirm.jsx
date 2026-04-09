'use client'

import React from 'react'
import { useGetDoctorById } from '@/hooks/useDoctors'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { 
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
  isLoading
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
      <Card className="max-w-md mx-auto py-8">
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
    <div className="max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-500">
      <Card className="border-2 shadow-xl overflow-hidden">
        <div className="bg-primary/5 p-6 text-center border-b border-primary/10">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-2" />
          <CardTitle className="text-2xl font-bold text-primary">Booking Summary</CardTitle>
          <CardDescription>Please review your appointment details</CardDescription>
        </div>

        <CardContent className="p-8 space-y-6">
          {/* Doctor Info Row */}
          <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={doctor?.imageURL} alt={doctor?.name} />
              <AvatarFallback className="gradient-primary text-white text-xl">
                {doctor?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-bold text-lg leading-tight">{doctor?.name}</h4>
              <p className="text-muted-foreground text-sm">{doctor?.specialty}</p>
            </div>
          </div>

          <Separator />

          {/* Appointment Rows */}
          <div className="space-y-4">
            <InfoRow 
              icon={<Calendar className="h-5 w-5 text-primary" />} 
              label="Date" 
              value={formatDate(selectedDateTime)} 
            />
            <InfoRow 
              icon={<Clock className="h-5 w-5 text-primary" />} 
              label="Time" 
              value={formatTime(selectedDateTime)} 
            />
            <InfoRow 
              icon={<Timer className="h-5 w-5 text-primary" />} 
              label="Duration" 
              value="30 minutes" 
            />
            <InfoRow 
              icon={<FileText className="h-5 w-5 text-primary" />} 
              label="Reason" 
              value={reason || "No reason provided"} 
            />
          </div>

          <div className="pt-4">
            <p className="text-xs text-center text-muted-foreground italic">
              * You will receive a confirmation email immediately after booking.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        className="w-full py-6 text-lg font-bold gradient-primary text-white shadow-lg hover:opacity-95 transition-all"
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm Booking"
        )}
      </Button>
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">
          {label}
        </span>
        <span className="font-semibold text-sm leading-tight">{value}</span>
      </div>
    </div>
  )
}
