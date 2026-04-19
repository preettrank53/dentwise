'use client'

import React from 'react'
import Image from 'next/image'
import { useGetDoctors } from '@/hooks/useDoctors'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, User } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Step 1: Select a Doctor
 * @param {function} onSelect - Callback when a doctor is clicked
 * @param {string} selectedDoctorId - Currently selected doctor ID
 */
export default function StepSelectDoctor({ onSelect, selectedDoctorId }) {
  const { data: doctors, isLoading, isError, refetch } = useGetDoctors()

  if (isLoading) {
    return (
      <div>
        <h2 className="text-sm font-semibold text-[#1A2832] uppercase tracking-wider mb-4">Select a Doctor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[12px] border border-[#E2EDF2] p-5">
              <Skeleton className="w-full aspect-[4/3] rounded-[8px] mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-16 rounded-[4px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-[#F8FAFB] rounded-[12px] border border-[#E2EDF2]">
        <p className="text-sm font-medium text-[#1A2832] mb-4">Failed to load doctors.</p>
        <button 
          onClick={() => refetch()}
          className="text-sm px-4 py-2 bg-[#619BB6] text-white rounded-[6px] hover:bg-[#4A7D96] transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-12 bg-[#F8FAFB] rounded-[12px] border border-[#E2EDF2]">
        <p className="text-sm text-[#7A9BAD]">No active doctors available at the moment.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-[#1A2832] uppercase tracking-wider mb-4">Select a Doctor</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => {
          const isSelected = selectedDoctorId === doctor.id

          return (
            <article
              key={doctor.id}
              className={cn(
                'relative p-5 cursor-pointer rounded-[12px] transition-all duration-150',
                isSelected
                  ? 'bg-[#EDF5F8] border-2 border-[#619BB6]'
                  : 'bg-white border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] hover:border-[#BAD7E1] hover:shadow-[0_4px_12px_rgba(26,40,50,0.08)]'
              )}
              onClick={() => onSelect(doctor.id)}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[#619BB6] border-2 border-white flex items-center justify-center z-10 shadow-[0_2px_6px_rgba(26,40,50,0.15)]">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
              )}

              <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-4 border border-[#E2EDF2] bg-[#F8FAFB]">
                {doctor.imageURL ? (
                  <Image
                    src={doctor.imageURL}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className="h-8 w-8 text-[#A8C4CF]" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1A2832] line-clamp-1">{doctor.name}</h3>
                <p className="text-xs text-[#7A9BAD] mt-0.5">{doctor.specialty}</p>
                <span className="badge mt-2 rounded-[4px] text-[10px] bg-[#EDF5F8] text-[#4A7D96] border border-[#BAD7E1]">
                  {doctor.gender}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
