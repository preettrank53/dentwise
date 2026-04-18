'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CheckCircle2, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react'
import { useCreateAppointment } from '@/hooks/useAppointments'
import StepSelectDoctor from './StepSelectDoctor'
import StepSelectDateTime from './StepSelectDateTime'
import StepConfirm from './StepConfirm'
import { cn } from '@/lib/utils'

/**
 * Main Booking Wizard Component
 */
export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [reason, setReason] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const { mutate: createAppointment, isPending } = useCreateAppointment()

  const nextStep = () => {
    if (currentStep === 2) {
      // Create final DateTime object
      const finalDateTime = new Date(selectedTimeSlot.datetime)
      setSelectedDateTime(finalDateTime)
    }
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    // Going from Step 2 back to Step 1: clear date/time/reason
    // so that selecting a new doctor gives a fresh time selection
    if (currentStep === 2) {
      setSelectedDate(null)
      setSelectedTimeSlot(null)
      setSelectedDateTime(null)
      setReason('')
    }
    setCurrentStep((prev) => prev - 1)
  }

  const handleConfirm = () => {
    const formData = {
      doctorId: selectedDoctorId,
      dateTime: selectedDateTime,
      reason: reason
    }

    createAppointment(formData, {
      onSuccess: (appointment) => {
        setIsSuccess(true)
        toast.success("Appointment booked successfully!")

        // Trigger Confirmation Email (Fire and forget)
        fetch('/api/send-appointment-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientName: appointment.user.name,
            patientEmail: appointment.user.email,
            doctorName: appointment.doctor.name,
            doctorSpecialty: appointment.doctor.specialty,
            appointmentDate: selectedDateTime,
            appointmentTime: selectedTimeSlot.time
          })
        }).catch(err => console.error("Email send trigger failed:", err))
      },
      onError: (error) => {
        toast.error(error.message || "Failed to book appointment")
      }
    })
  }

  const resetWizard = () => {
    setCurrentStep(1)
    setSelectedDoctorId(null)
    setSelectedDate(null)
    setSelectedTimeSlot(null)
    setSelectedDateTime(null)
    setReason('')
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <Card className="max-w-xl mx-auto border-2 shadow-2xl">
        <CardContent className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-6 animate-bounce">
              <CheckCircle2 className="h-20 w-20 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-primary italic">Appointment Booked!</h2>
          <p className="text-muted-foreground">
            Thank you for choosing Dentwise. We've sent a confirmation email with all the details 
            to your registered address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Button size="lg" className="gradient-primary text-white" onClick={resetWizard}>
              Book Another
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/appointments/my">View My Appointments</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-between max-w-lg mx-auto relative px-4 sm:px-0">
        <ProgressStep step={1} currentStep={currentStep} label="Select Doctor" />
        <ProgressLine active={currentStep > 1} />
        <ProgressStep step={2} currentStep={currentStep} label="Choose Time" />
        <ProgressLine active={currentStep > 2} />
        <ProgressStep step={3} currentStep={currentStep} label="Confirm" />
      </div>

      {/* Step Content */}
      <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm rounded-3xl overflow-hidden min-h-[450px]">
        <CardContent className="p-4 sm:p-6 md:p-10 pb-8 sm:pb-10">
          {currentStep === 1 && (
            <StepSelectDoctor 
              onSelect={setSelectedDoctorId} 
              selectedDoctorId={selectedDoctorId} 
            />
          )}

          {currentStep === 2 && (
            <StepSelectDateTime 
              doctorId={selectedDoctorId}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              selectedTime={selectedTimeSlot}
              onSelectTime={setSelectedTimeSlot}
              onSelectReason={setReason}
            />
          )}

          {currentStep === 3 && (
            <StepConfirm 
              doctorId={selectedDoctorId}
              selectedDateTime={selectedDateTime}
              reason={reason}
              onConfirm={handleConfirm}
              isLoading={isPending}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {currentStep < 3 && (
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 px-4 sm:px-0">
          <Button
            variant="ghost"
            onClick={prevStep}
            className={cn(
              "text-muted-foreground rounded-full px-8 w-full sm:w-auto h-12 sm:h-auto",
              currentStep === 1 && "invisible"
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && !selectedDoctorId) ||
              (currentStep === 2 && (!selectedDate || !selectedTimeSlot))
            }
            className="gradient-primary text-white rounded-full px-12 shadow-md shadow-primary/20 hover:opacity-90 w-full sm:w-auto h-12 sm:h-auto font-bold"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

function ProgressStep({ step, currentStep, label }) {
  const isCompleted = currentStep > step
  const isActive = currentStep === step

  return (
    <div className="flex flex-col items-center z-10 space-y-2">
      <div className={cn(
        "h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold transition-all duration-500",
        isCompleted ? "bg-cyan-500 text-white" : "",
        isActive ? "gradient-primary text-white scale-110 shadow-lg" : "bg-white border-2 border-muted text-muted-foreground"
      )}>
        {isCompleted ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : step}
      </div>
      <span className={cn(
        "text-[10px] sm:text-xs font-bold uppercase tracking-tight absolute -bottom-6 whitespace-nowrap hidden sm:block",
        isActive ? "text-primary" : "text-muted-foreground opacity-60"
      )}>
        {label}
      </span>
    </div>
  )
}

function ProgressLine({ active }) {
  return (
    <div className="flex-1 h-[2px] bg-muted mx-2 sm:mx-4 relative top-[-10px]">
      <div className={cn(
        "absolute inset-0 bg-cyan-500 transition-all duration-700",
        active ? "w-full" : "w-0"
      )} />
    </div>
  )
}
