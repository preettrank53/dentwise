import React from 'react'
import { PageHeaderSkeleton, AppointmentCardSkeleton } from '@/components/ui/PageSkeleton'

export default function MyAppointmentsLoading() {
  return (
    <main className="page-container section-padding space-y-6">
      <PageHeaderSkeleton />

      <div className="space-y-4">
        <AppointmentCardSkeleton />
        <AppointmentCardSkeleton />
        <AppointmentCardSkeleton />
      </div>
    </main>
  )
}
