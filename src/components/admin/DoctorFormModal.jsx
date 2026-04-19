'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { doctorSchema } from '@/lib/validations'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useCreateDoctor, useUpdateDoctor } from '@/hooks/useDoctors'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function DoctorFormModal({ isOpen, onClose, doctor }) {
  const isEdit = !!doctor

  const form = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: '',
      email: '',
      specialty: '',
      gender: '',
      imageURL: '',
      bio: '',
    },
    mode: 'onBlur',
  })

  const { register, handleSubmit, reset, watch, formState } = form

  const createMutation = useCreateDoctor()
  const updateMutation = useUpdateDoctor()
  const mutation = isEdit ? updateMutation : createMutation

  useEffect(() => {
    if (doctor) {
      reset({
        name: doctor.name || '',
        email: doctor.email || '',
        specialty: doctor.specialty || '',
        gender: doctor.gender || '',
        imageURL: doctor.imageURL || '',
        bio: doctor.bio || '',
      })
    } else {
      reset({
        name: '',
        email: '',
        specialty: '',
        gender: '',
        imageURL: '',
        bio: '',
      })
    }
  }, [doctor, isOpen, form])

  useEffect(() => {
    if (mutation.isSuccess) {
      onClose()
      form.reset()
    }
  }, [mutation.isSuccess])

  const onSubmit = (validatedData) => {
    if (isEdit) {
      updateMutation.mutate({
        id: doctor.id,
        formData: validatedData,
      })
    } else {
      createMutation.mutate(validatedData)
    }
  }

  const bioValue = watch('bio')
  const bioLength = bioValue?.length || 0

  let bioCountColor = '#A8C4CF'
  if (bioLength >= 480) {
    bioCountColor = '#C0392B'
  } else if (bioLength >= 400) {
    bioCountColor = '#B7791F'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-[#1A2832]">
            {isEdit ? 'Edit Doctor' : 'Add New Doctor'}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#7A9BAD]">
            {isEdit ? 'Update doctor information' : 'Add a new doctor to the roster'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Dr. Sarah Mitchell"
                {...register('name')}
                style={{
                  borderColor: formState.errors.name ? '#C0392B' : undefined,
                }}
              />
              {formState.errors.name && (
                <p className="form-error">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="doctor@dentwise.com"
                {...register('email')}
                disabled={isEdit}
                style={{
                  borderColor: formState.errors.email ? '#C0392B' : undefined,
                }}
              />
              {formState.errors.email && (
                <p className="form-error">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="form-label">Specialty</label>
              <select
                className="input-field"
                {...register('specialty')}
                style={{
                  borderColor: formState.errors.specialty ? '#C0392B' : undefined,
                }}
              >
                <option value="" disabled>Select a specialty</option>
                <option value="General Dentistry">General Dentistry</option>
                <option value="Orthodontics">Orthodontics</option>
                <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                <option value="Dental Implants">Dental Implants</option>
                <option value="Teeth Whitening">Teeth Whitening</option>
                <option value="Emergency Care">Emergency Care</option>
                <option value="Oral Surgery">Oral Surgery</option>
              </select>
              {formState.errors.specialty && (
                <p className="form-error">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.specialty.message}
                </p>
              )}
            </div>

            <div>
              <label className="form-label">Gender</label>
              <select
                className="input-field"
                {...register('gender')}
                style={{
                  borderColor: formState.errors.gender ? '#C0392B' : undefined,
                }}
              >
                <option value="" disabled>Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {formState.errors.gender && (
                <p className="form-error">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="input-field"
              placeholder="https://images.unsplash.com/..."
              {...register('imageURL')}
              style={{
                borderColor: formState.errors.imageURL ? '#C0392B' : undefined,
              }}
            />
            {formState.errors.imageURL && (
              <p className="form-error">
                <AlertCircle className="h-3 w-3" />
                {formState.errors.imageURL.message}
              </p>
            )}
            <p className="text-xs text-[#A8C4CF] mt-1">
              Use an Unsplash photo URL for best results
            </p>
          </div>

          <div>
            <label className="form-label">Bio</label>
            <textarea
              rows={3}
              className="input-field resize-none"
              placeholder="Brief professional background and expertise..."
              {...register('bio')}
              style={{
                borderColor: formState.errors.bio ? '#C0392B' : undefined,
              }}
            />
            {formState.errors.bio && (
              <p className="form-error">
                <AlertCircle className="h-3 w-3" />
                {formState.errors.bio.message}
              </p>
            )}
            <p className="text-xs mt-1 text-right" style={{ color: bioCountColor }}>
              {bioLength}/500
            </p>
          </div>

          <DialogFooter className="flex justify-end gap-3 pt-4 border-t border-[#E2EDF2]">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={mutation.isPending}
              className="btn-primary"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {isEdit ? 'Saving...' : 'Adding...'}
                </>
              ) : (
                isEdit ? 'Save Changes' : 'Add Doctor'
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
