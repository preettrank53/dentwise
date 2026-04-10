'use client'

import React, { useState, useEffect } from 'react'
import { useGetAllAppointments, useUpdateAppointmentStatus } from '@/hooks/useAdmin'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Search, ChevronLeft, ChevronRight, Loader2, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function AppointmentsTable() {
  const [searchInput, setSearchInput] = useState('')
  const [filters, setFilters] = useState({ search: '', status: 'ALL' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { data: appointments, isLoading, isError } = useGetAllAppointments(filters)
  const { mutate: updateStatus } = useUpdateAppointmentStatus()
  const [updatingId, setUpdatingId] = useState(null)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput }))
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput])

  const handleStatusChange = (value) => {
    setFilters(prev => ({ ...prev, status: value }))
    setCurrentPage(1)
  }

  const handleMarkComplete = (id) => {
    setUpdatingId(id)
    updateStatus({ id, status: 'COMPLETED' }, {
      onSuccess: () => {
        toast.success("Appointment marked as completed")
      },
      onError: () => {
        toast.error("Failed to update status")
      },
      onSettled: () => {
        setUpdatingId(null)
      }
    })
  }

  const getFilteredData = () => {
    if (!appointments) return []
    return appointments
  }

  let tableData = getFilteredData()
  const totalPages = Math.ceil(tableData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = tableData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search patient or doctor..." 
            className="pl-10 rounded-xl border-gray-200 focus:ring-2 focus:ring-cyan-500/20"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px] rounded-xl border-gray-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-500 font-medium px-2 whitespace-nowrap">
          Showing {tableData.length} appointments
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="bg-white">
                    <td className="px-6 py-4"><Skeleton className="h-10 w-40" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-10 w-40" /></td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-24 ml-auto rounded-xl" /></td>
                  </tr>
                ))
              )}

              {isError && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-red-500">
                    Error loading appointments data.
                  </td>
                </tr>
              )}

              {!isLoading && !isError && currentData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 bg-white">
                    <p className="mb-4">No appointments found.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchInput('')
                        setFilters({ search: '', status: 'ALL' })
                      }}
                      className="rounded-xl border-gray-200"
                    >
                      Clear filters
                    </Button>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && currentData.map(apt => (
                <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={apt.user.image} />
                        <AvatarFallback><User className="h-4 w-4 text-gray-400" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 leading-tight">{apt.user.name}</p>
                        <p className="text-xs text-gray-500 max-w-[150px] truncate">{apt.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={apt.doctor.imageURL} />
                        <AvatarFallback>DR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 leading-tight">{apt.doctor.name}</p>
                        <p className="text-xs text-gray-500 max-w-[150px] truncate">{apt.doctor.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-900">
                      {new Date(apt.dateTime).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(apt.dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                      {' • 30 min'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {apt.reason ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help inline-block max-w-[150px] truncate text-gray-600 font-medium border-b border-dashed border-gray-300 pb-0.5">
                              {apt.reason}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p>{apt.reason}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="text-gray-400 font-medium">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider",
                      apt.status === 'CONFIRMED' && "bg-cyan-50 text-cyan-700 hover:bg-cyan-50 border-0",
                      apt.status === 'COMPLETED' && "bg-green-50 text-green-700 hover:bg-green-50 border-0",
                      apt.status === 'CANCELLED' && "bg-gray-100 text-gray-500 hover:bg-gray-100 border-0"
                    )}>
                      {apt.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {apt.status === 'CONFIRMED' ? (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleMarkComplete(apt.id)}
                        disabled={updatingId === apt.id}
                        className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 rounded-xl text-xs px-3 py-1.5 h-auto transition-colors font-medium border-0"
                      >
                        {updatingId === apt.id ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                            Updating
                          </>
                        ) : (
                          "Mark Complete"
                        )}
                      </Button>
                    ) : (
                      <span className="text-gray-400 text-xs italic pr-2">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Container */}
        {tableData.length > 0 && (
          <div className="flex justify-between items-center bg-white border-t border-gray-100 p-4 text-sm text-gray-500">
            <div>
              Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + itemsPerPage, tableData.length)}</span> of <span className="font-medium text-gray-900">{tableData.length}</span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg h-8 px-3 border-gray-200 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
              <div className="font-medium px-2 text-gray-900">
                Page {currentPage} of {totalPages || 1}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="rounded-lg h-8 px-3 border-gray-200 text-gray-600 hover:text-gray-900"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
