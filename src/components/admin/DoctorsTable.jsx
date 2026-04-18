'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
  useGetDoctors,
  useToggleDoctorStatus,
} from '@/hooks/useDoctors'
import DoctorFormModal from './DoctorFormModal'
import { Edit, RefreshCcw, UserMinus, UserCheck, AlertCircle, UserX } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'

export default function DoctorsTable({ onAddDoctor }) {
  const { data: doctors, isLoading, error, refetch } = useGetDoctors()
  const toggleMutation = useToggleDoctorStatus()
  
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleToggleStatus = (id) => {
    toggleMutation.mutate(id)
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
                      <AvatarFallback className="bg-cyan-50 text-cyan-600">
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
                  <Badge variant={doctor.isActive ? 'success' : 'secondary'} className="rounded-full px-2.5">
                    {doctor.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1 px-6">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEdit(doctor)}
                    className="h-8 w-8 text-muted-foreground hover:text-cyan-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleToggleStatus(doctor.id)}
                    disabled={toggleMutation.isPending}
                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                  >
                    {doctor.isActive ? <UserMinus className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
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
