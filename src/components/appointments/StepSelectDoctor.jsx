'use client'

import React from 'react'
import Image from 'next/image'
import { useGetDoctors } from '@/hooks/useDoctors'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle2, User } from 'lucide-react'
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-40 sm:h-48 w-full" />
            <CardContent className="p-4 sm:p-5 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
        <p className="text-destructive font-medium mb-4">Failed to load doctors.</p>
        <button 
          onClick={() => refetch()}
          className="text-sm px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
        <p className="text-muted-foreground">No active doctors available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <Card
          key={doctor.id}
          className={cn(
            "group card-hover cursor-pointer border-2 transition-all relative overflow-hidden",
            selectedDoctorId === doctor.id 
              ? "border-primary ring-1 ring-primary" 
              : "border-border hover:border-primary/50"
          )}
          onClick={() => onSelect(doctor.id)}
        >
          {/* Selected Indicator Overlay */}
          {selectedDoctorId === doctor.id && (
            <div className="absolute top-3 right-3 z-10 shadow-lg rounded-full bg-white flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-white fill-cyan-600" />
            </div>
          )}

          <div className="relative h-40 sm:h-48 w-full bg-muted">
            {doctor.imageURL ? (
              <Image
                src={doctor.imageURL}
                alt={doctor.name}
                fill
                className="object-cover object-top transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <User className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
          </div>

          <CardContent className="p-4 sm:p-5 bg-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg leading-tight line-clamp-1 text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-background shadow-sm -mt-8 bg-white">
                <AvatarImage src={doctor.imageURL} />
                <AvatarFallback className="gradient-primary text-white text-xs">
                  {doctor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <Badge variant="secondary" className="mt-2 font-normal text-[10px] uppercase tracking-wider">
              {doctor.gender}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
