'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useGetAllDoctors,
  useToggleDoctorStatus,
} from '@/hooks/useDoctors'
import DoctorFormModal from './DoctorFormModal'
import { Edit, Loader2, UserCheck, UserMinus, UserX } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'

export default function DoctorsTable({ onAddDoctor }) {
  const { data: doctors, isLoading, error, refetch } = useGetAllDoctors()
  const toggleMutation = useToggleDoctorStatus()
  
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleToggleStatus = (id) => {
    setTogglingId(id)
    toggleMutation.mutate(id, {
      onSettled: () => setTogglingId(null),
    })
  }

  if (isLoading) {
    return (
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4].map((i) => (
              <TableRow key={i}>
                <TableCell className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="py-12 flex justify-center bg-gray-50/50 rounded-xl border border-gray-100">
        <EmptyState
          icon={UserX}
          title="No Doctors Found"
          description="Your doctor roster is empty. Add your first doctor to start accepting appointments."
          actionLabel="Add First Doctor"
          actionOnClick={() => {
            if (onAddDoctor) onAddDoctor();
            else {
              setSelectedDoctor(null);
              setIsModalOpen(true);
            }
          }}
          size="md"
        />
      </div>
    )
  }

  return (
    <>
      <div className="rounded-xl border bg-white shadow-sm overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={doctor.imageURL} alt={doctor.name} />
                      <AvatarFallback className="bg-[#EDF5F8] text-[#619BB6]">
                        {doctor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{doctor.name}</span>
                  </div>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell className="text-muted-foreground lowercase hidden lg:table-cell">{doctor.email}</TableCell>
                <TableCell className="capitalize text-xs hidden md:table-cell">{doctor.gender.toLowerCase()}</TableCell>
                <TableCell>
                  <Badge
                    className={doctor.isActive
                      ? 'rounded-full px-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                      : 'rounded-full px-2.5 bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-100'}
                  >
                    {doctor.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(doctor)}
                    className="h-8 text-muted-foreground hover:text-[#619BB6]"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="ml-1">Edit</span>
                  </Button>
                  <Button 
                    variant={doctor.isActive ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleToggleStatus(doctor.id)}
                    disabled={toggleMutation.isPending && togglingId === doctor.id}
                    className={doctor.isActive
                      ? 'h-8 ml-2 text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700'
                      : 'h-8 ml-2 bg-emerald-600 hover:bg-emerald-700 text-white'}
                  >
                    {toggleMutation.isPending && togglingId === doctor.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : doctor.isActive ? (
                      <UserMinus className="h-4 w-4" />
                    ) : (
                      <UserCheck className="h-4 w-4" />
                    )}
                    <span className="ml-1">{doctor.isActive ? 'Deactivate' : 'Activate'}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DoctorFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        doctor={selectedDoctor} 
      />
    </>
  )
}
