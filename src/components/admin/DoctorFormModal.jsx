'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateDoctor, useUpdateDoctor } from '@/hooks/useDoctors'
import { Loader2 } from 'lucide-react'

const doctorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  specialty: z.string().min(1, 'Please select a specialty'),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: 'Please select gender' }),
  }),
  imageURL: z.string().url('Please enter a valid image URL'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

export default function DoctorFormModal({ isOpen, onClose, doctor }) {
  const isEditMode = !!doctor
  const createMutation = useCreateDoctor()
  const updateMutation = useUpdateDoctor()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: '',
      email: '',
      specialty: '',
      gender: 'MALE',
      imageURL: '',
      bio: '',
    },
  })

  // Set form values when doctor changes (edit mode)
  useEffect(() => {
    if (doctor) {
      reset({
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty,
        gender: doctor.gender,
        imageURL: doctor.imageURL,
        bio: doctor.bio || '',
      })
    } else {
      reset({
        name: '',
        email: '',
        specialty: '',
        gender: 'MALE',
        imageURL: '',
        bio: '',
      })
    }
  }, [doctor, reset])

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: doctor.id, formData: data })
      } else {
        await createMutation.mutateAsync(data)
      }
      onClose()
      reset()
    } catch (error) {
      // Error handling is managed by TanStack Query onError, 
      // but we catch here to prevent crash
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending
  const mutationError = createMutation.error?.message || updateMutation.error?.message

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Dr. John Doe" {...register('name')} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select 
                onValueChange={(val) => setValue('specialty', val)} 
                value={watch('specialty')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Dentistry">General Dentistry</SelectItem>
                  <SelectItem value="Orthodontics">Orthodontics</SelectItem>
                  <SelectItem value="Pediatric Dentistry">Pediatric Dentistry</SelectItem>
                  <SelectItem value="Dental Implants">Dental Implants</SelectItem>
                  <SelectItem value="Teeth Whitening">Teeth Whitening</SelectItem>
                  <SelectItem value="Emergency Care">Emergency Care</SelectItem>
                  <SelectItem value="Oral Surgery">Oral Surgery</SelectItem>
                </SelectContent>
              </Select>
              {errors.specialty && <p className="text-xs text-red-500">{errors.specialty.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                onValueChange={(val) => setValue('gender', val)} 
                value={watch('gender')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageURL">Doctor Photo URL</Label>
            <Input id="imageURL" placeholder="https://..." {...register('imageURL')} />
            {errors.imageURL && <p className="text-xs text-red-500">{errors.imageURL.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biography (Optional)</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about the doctor..."
              className="resize-none h-24"
              {...register('bio')}
            />
            {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
          </div>

          {mutationError && (
            <p className="text-sm border border-red-200 bg-red-50 p-2 rounded text-red-600">
              {mutationError}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="gradient-primary text-white border-0">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? 'Save Changes' : 'Create Doctor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
