'use client'

import React, { useState, useEffect } from 'react'
import { useGetAllAppointments, useUpdateAppointmentStatus } from '@/hooks/useAdmin'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, ChevronLeft, ChevronRight, Loader2, User, CalendarX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'

export default function AppointmentsTable() {
  const [searchInput, setSearchInput] = useState('')
  const [filters, setFilters] = useState({ search: '', status: 'ALL' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { data: appointments, isLoading, isError } = useGetAllAppointments(filters)
  const { mutate: updateStatus } = useUpdateAppointmentStatus()
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }))
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput])

  const handleStatusChange = (value) => {
    setFilters((prev) => ({ ...prev, status: value }))
    setCurrentPage(1)
  }

  const handleMarkComplete = (id) => {
    setUpdatingId(id)
    updateStatus(
      { id, status: 'COMPLETED' },
      {
        onSuccess: () => {
          toast.success('Appointment marked as completed')
        },
        onError: () => {
          toast.error('Failed to update status')
        },
        onSettled: () => {
          setUpdatingId(null)
        },
      }
    )
  }

  const tableData = appointments || []
  const totalPages = Math.ceil(tableData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = tableData.slice(startIndex, startIndex + itemsPerPage)

  const getStatusClass = (status) => {
    if (status === 'CONFIRMED') return 'badge-confirmed'
    if (status === 'COMPLETED') return 'badge-completed'
    if (status === 'CANCELLED') return 'badge-cancelled'
    return 'badge-cancelled'
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8C4CF]" />
            <label htmlFor="search-input" className="sr-only">
              Search appointments
            </label>
            <Input
              id="search-input"
              placeholder="Search patient or doctor..."
              className="input-field pl-9"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="input-field w-full sm:w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <p className="text-xs text-[#7A9BAD] hidden sm:block self-center ml-auto">
            Showing {tableData.length} appointments
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-header grid grid-cols-12 gap-3 items-center">
          <div className="col-span-3 text-[10px] font-semibold text-[#7A9BAD] uppercase tracking-wider">Patient</div>
          <div className="col-span-3 text-[10px] font-semibold text-[#7A9BAD] uppercase tracking-wider">Doctor</div>
          <div className="col-span-2 text-[10px] font-semibold text-[#7A9BAD] uppercase tracking-wider">Date</div>
          <div className="col-span-2 text-[10px] font-semibold text-[#7A9BAD] uppercase tracking-wider">Status</div>
          <div className="col-span-2 text-[10px] font-semibold text-[#7A9BAD] uppercase tracking-wider text-right">Action</div>
        </div>

        {isLoading &&
          [...Array(6)].map((_, i) => (
            <div key={i} className="table-row grid grid-cols-12 gap-3 items-center">
              <div className="col-span-3"><Skeleton className="h-8 w-40" /></div>
              <div className="col-span-3"><Skeleton className="h-8 w-36" /></div>
              <div className="col-span-2"><Skeleton className="h-6 w-28" /></div>
              <div className="col-span-2"><Skeleton className="h-6 w-20" /></div>
              <div className="col-span-2 flex justify-end"><Skeleton className="h-7 w-24" /></div>
            </div>
          ))}

        {isError && (
          <div className="p-6">
            <ErrorState onRetry={() => window.location.reload()} />
          </div>
        )}

        {!isLoading && !isError && currentData.length === 0 && (
          <div className="p-6">
            {filters.search !== '' || filters.status !== 'ALL' ? (
              <EmptyState
                icon={Search}
                title="No Results Found"
                description="No appointments match your current filters. Try adjusting your search or filter criteria."
                actionLabel="Clear Filters"
                actionOnClick={() => {
                  setSearchInput('')
                  setFilters({ search: '', status: 'ALL' })
                }}
                size="md"
              />
            ) : (
              <EmptyState
                icon={CalendarX}
                title="No Appointments Yet"
                description="No appointments have been booked at the clinic yet."
                size="md"
              />
            )}
          </div>
        )}

        {!isLoading && !isError &&
          currentData.map((apt) => (
            <div key={apt.id} className="table-row grid grid-cols-12 gap-3 items-center">
              <div className="col-span-3 flex items-center gap-3 min-w-0">
                <Avatar className="h-8 w-8 rounded-full border border-[#E2EDF2] shrink-0">
                  <AvatarImage src={apt.user.image} />
                  <AvatarFallback className="rounded-full">
                    <User className="h-3.5 w-3.5 text-[#7A9BAD]" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1A2832] truncate">{apt.user.name}</p>
                  <p className="text-xs text-[#7A9BAD] truncate">{apt.user.email}</p>
                </div>
              </div>

              <div className="col-span-3 flex items-center gap-2 min-w-0">
                <Avatar className="h-7 w-7 rounded-full border border-[#E2EDF2] shrink-0">
                  <AvatarImage src={apt.doctor.imageURL} />
                  <AvatarFallback className="rounded-full text-[10px]">DR</AvatarFallback>
                </Avatar>
                <p className="text-sm text-[#4A6572] truncate">{apt.doctor.name}</p>
              </div>

              <p className="col-span-2 text-sm text-[#4A6572]">
                {new Date(apt.dateTime).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                {', '}
                {new Date(apt.dateTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>

              <div className="col-span-2">
                <span className={cn('badge', getStatusClass(apt.status))}>{apt.status}</span>
              </div>

              <div className="col-span-2 flex justify-end">
                {apt.status === 'CONFIRMED' ? (
                  <button
                    type="button"
                    onClick={() => handleMarkComplete(apt.id)}
                    disabled={updatingId === apt.id}
                    className="text-xs font-medium text-[#619BB6] bg-[#EDF5F8] border border-[#BAD7E1] rounded-[6px] px-3 py-1.5 hover:bg-[#619BB6] hover:text-white transition-colors duration-150 disabled:opacity-40"
                  >
                    {updatingId === apt.id ? (
                      <span className="inline-flex items-center">
                        <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                        Updating
                      </span>
                    ) : (
                      'Mark Complete'
                    )}
                  </button>
                ) : (
                  <span className="text-xs text-[#A8C4CF]">-</span>
                )}
              </div>
            </div>
          ))}

        {tableData.length > 0 && (
          <div className="flex justify-between items-center px-5 py-3 border-t border-[#E2EDF2]">
            <p className="text-xs text-[#7A9BAD]">Page {currentPage} of {totalPages || 1}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border border-[#E2EDF2] text-[#4A6572] rounded-[6px] px-3 py-1.5 text-xs hover:bg-[#EDF5F8] disabled:opacity-40 inline-flex items-center"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="border border-[#E2EDF2] text-[#4A6572] rounded-[6px] px-3 py-1.5 text-xs hover:bg-[#EDF5F8] disabled:opacity-40 inline-flex items-center"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
