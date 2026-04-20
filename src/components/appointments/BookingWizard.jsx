'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [showDoctorError, setShowDoctorError] = useState(false)
  const [showDateError, setShowDateError] = useState(false)
  const [showTimeError, setShowTimeError] = useState(false)

  const createAppointmentMutation = useCreateAppointment()
  const { mutate: createAppointment, isPending } = createAppointmentMutation

  useEffect(() => {
    if (selectedDoctorId) {
      setShowDoctorError(false)
    }
  }, [selectedDoctorId])

  useEffect(() => {
    if (selectedDate) {
      setShowDateError(false)
    }
  }, [selectedDate])

  useEffect(() => {
    if (selectedTimeSlot) {
      setShowTimeError(false)
    }
  }, [selectedTimeSlot])

  const nextStep = () => {
    if (currentStep === 1) {
      if (!selectedDoctorId) {
        setShowDoctorError(true)
        return
      }
      setShowDoctorError(false)
    }

    if (currentStep === 2) {
      if (!selectedDate) {
        setShowDateError(true)
        return
      }

      setShowDateError(false)

      if (!selectedTimeSlot) {
        setShowTimeError(true)
        return
      }

      setShowTimeError(false)

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
    const finalDateTime = selectedDateTime || selectedTimeSlot?.datetime || null

    if (!selectedDoctorId || !finalDateTime) {
      if (!selectedDate) setShowDateError(true)
      if (!selectedTimeSlot) setShowTimeError(true)
      return
    }

    const formData = {
      doctorId: selectedDoctorId,
      dateTime: finalDateTime ? new Date(finalDateTime).toISOString() : null,
      reason: reason
    }

    createAppointment(formData, {
      onSuccess: (appointment) => {
        setIsSuccess(true)
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
    setShowDoctorError(false)
    setShowDateError(false)
    setShowTimeError(false)
  }

  if (isSuccess) {
    return (
      <Card className="max-w-xl mx-auto bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)]">
        <CardContent className="flex flex-col items-center text-center gap-6 py-12 px-6">
          <div className="h-16 w-16 rounded-full bg-[#EDF5F8] border border-[#BAD7E1] flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-[#619BB6]" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#1A2832]">Appointment Confirmed</h2>
            <p className="text-sm text-[#4A6572] max-w-xs mt-2">
              Your appointment has been booked successfully.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              className="border border-[#619BB6] text-[#619BB6] rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#EDF5F8] transition-colors"
              onClick={resetWizard}
            >
              Book Another
            </button>
            <Link
              href="/appointments/my"
              className="bg-[#619BB6] text-white rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#4A7D96] transition-colors"
            >
              View My Appointments
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        <ProgressStep step={1} currentStep={currentStep} label="Doctor" />
        <ProgressLine active={currentStep > 1} />
        <ProgressStep step={2} currentStep={currentStep} label="Date & Time" />
        <ProgressLine active={currentStep > 2} />
        <ProgressStep step={3} currentStep={currentStep} label="Confirm" />
      </div>

      {/* Step Content */}
      <Card className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)]">
        <CardContent className="p-6 sm:p-8">
          {currentStep === 1 && (
            <>
              <StepSelectDoctor
                onSelect={setSelectedDoctorId}
                selectedDoctorId={selectedDoctorId}
              />
              {showDoctorError && (
                <p className="text-xs text-[#C0392B] mt-3">Please select a doctor to continue</p>
              )}
            </>
          )}

          {currentStep === 2 && (
            <StepSelectDateTime
              doctorId={selectedDoctorId}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              selectedTime={selectedTimeSlot}
              onSelectTime={setSelectedTimeSlot}
              onSelectReason={setReason}
              showDateError={showDateError}
              showTimeError={showTimeError}
            />
          )}

          {currentStep === 3 && (
            <StepConfirm
              doctorId={selectedDoctorId}
              selectedDateTime={selectedDateTime}
              reason={reason}
              onConfirm={handleConfirm}
              isLoading={isPending}
              mutation={createAppointmentMutation}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {currentStep < 3 && (
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#E2EDF2]">
          <Button
            variant="ghost"
            onClick={prevStep}
            className={cn(
              'rounded-[6px] text-[#4A6572] hover:text-[#1A2832] hover:bg-[#EDF5F8]',
              currentStep === 1 && 'invisible'
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <button
            type="button"
            onClick={nextStep}
            disabled={
              (currentStep === 1 && !selectedDoctorId) ||
              (currentStep === 2 && (!selectedDate || !selectedTimeSlot))
            }
            className="bg-[#619BB6] text-white rounded-[6px] px-5 py-2.5 text-sm font-medium hover:bg-[#4A7D96] disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

function ProgressStep({ step, currentStep, label }) {
  const isCompleted = currentStep > step
  const isActive = currentStep === step

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center',
            isCompleted && 'bg-[#619BB6] border border-[#619BB6]',
            isActive && 'bg-white border-2 border-[#619BB6]',
            !isCompleted && !isActive && 'bg-white border border-[#E2EDF2]'
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4 text-white" />
          ) : (
            <span className={cn('text-sm', isActive ? 'font-semibold text-[#619BB6]' : 'text-[#A8C4CF]')}>{step}</span>
          )}
        </div>
        <span
          className={cn(
            'text-[10px] font-medium uppercase tracking-wider mt-1 text-center',
            (isCompleted || isActive) ? 'text-[#619BB6]' : 'text-[#A8C4CF]'
          )}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

function ProgressLine({ active }) {
  return <div className={cn('w-16 h-[1px] mx-2', active ? 'bg-[#619BB6]' : 'bg-[#E2EDF2]')} />
}
