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
import { Edit, RefreshCcw, UserMinus, UserCheck, AlertCircle } from 'lucide-react'

export default function DoctorsTable() {
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
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-bold">Failed to load doctors</h3>
        <p className="text-muted-foreground mb-4">{error.message}</p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </div>
    )
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl bg-gray-50/50">
        <p className="text-muted-foreground mb-4">No doctors found. Add your first doctor.</p>
        <Button 
          onClick={() => {
            setSelectedDoctor(null)
            setIsModalOpen(true)
          }} 
          className="gradient-primary text-white border-0"
        >
          Add First Doctor
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
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
                <TableCell className="text-muted-foreground lowercase">{doctor.email}</TableCell>
                <TableCell className="capitalize text-xs">{doctor.gender.toLowerCase()}</TableCell>
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
