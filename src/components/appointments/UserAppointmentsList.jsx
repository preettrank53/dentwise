'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGetUserAppointments, useCancelAppointment } from '@/hooks/useAppointments'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar, Clock, Timer, FileText, Loader2, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'

export default function UserAppointmentsList() {
  const { data: appointments, isLoading, isError, refetch } = useGetUserAppointments()
  const cancelMutation = useCancelAppointment()
  const [cancellingId, setCancellingId] = useState(null)
  const [dialogOpenId, setDialogOpenId] = useState(null)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-white space-y-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <Card className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-white flex justify-center">
        <ErrorState onRetry={() => refetch()} />
      </Card>
    )
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Card className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-white flex justify-center py-10">
        <EmptyState
          icon={Calendar}
          title="No Appointments Yet"
          description="You have not booked any appointments. Schedule your first visit with one of our dentists."
          actionLabel="Book Appointment"
          actionHref="/appointments"
          size="md"
        />
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map(appointment => (
        <Card 
          key={appointment.id} 
          className="rounded-2xl border border-gray-100 shadow-sm p-6 bg-white hover:shadow-md transition-all duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left: Doctor Info */}
            <div className="flex items-center gap-4 min-w-[200px]">
              <Avatar className="h-12 w-12 border border-gray-100 shadow-sm">
                <AvatarImage src={appointment.doctor.imageURL} alt={appointment.doctor.name} />
                <AvatarFallback><User className="h-5 w-5 text-gray-400" /></AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-base font-semibold text-gray-900">{appointment.doctor.name}</h4>
                <p className="text-sm text-gray-500">{appointment.doctor.specialty}</p>
              </div>
            </div>

            {/* Middle: Appointment Details */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(appointment.dateTime).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(appointment.dateTime).toLocaleTimeString('en-US', {
                    hour: 'numeric', minute: '2-digit', hour12: true
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Timer className="h-4 w-4 text-gray-400" />
                <span>30 min</span>
              </div>
              {appointment.reason && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="truncate max-w-[120px]" title={appointment.reason}>
                    {appointment.reason}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Status & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-6 min-w-[140px]">
              <Badge className={cn(
                "rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider",
                appointment.status === 'CONFIRMED' && "bg-cyan-50 text-cyan-700 hover:bg-cyan-50 border-0",
                appointment.status === 'COMPLETED' && "bg-green-50 text-green-700 hover:bg-green-50 border-0",
                appointment.status === 'CANCELLED' && "bg-gray-100 text-gray-500 hover:bg-gray-100 border-0"
              )}>
                {appointment.status}
              </Badge>

              {appointment.status === 'CONFIRMED' && (
                <AlertDialog
                  open={dialogOpenId === appointment.id}
                  onOpenChange={(open) => setDialogOpenId(open ? appointment.id : null)}
                >
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl"
                      disabled={cancellingId === appointment.id}
                    >
                      {cancellingId === appointment.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Cancel'
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white sm:rounded-2xl p-6 shadow-xl max-w-md border-gray-100">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-bold">Cancel Appointment?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-500">
                        This action cannot be undone. Your slot will be released.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4 flex gap-3 sm:justify-end">
                      <AlertDialogCancel className="rounded-xl border-gray-200 m-0 hover:bg-gray-50">Keep Appointment</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={async (e) => {
                          e.preventDefault()
                          setCancellingId(appointment.id)
                          try {
                            await cancelMutation.mutateAsync(appointment.id)
                            setDialogOpenId(null)
                          } catch (error) {
                            setDialogOpenId(null)
                          } finally {
                            setCancellingId(null)
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl border-0 m-0"
                        disabled={cancellingId === appointment.id}
                      >
                        {cancellingId === appointment.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            "Yes, Cancel"
                          )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            
          </div>
        </Card>
      ))}
    </div>
  )
}
