'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useGetUserProfile, useUpdateUserProfile } from '@/hooks/useProfile'
import { useGetUserSubscription } from '@/hooks/useStripe'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, CheckCircle, AlertCircle, Crown } from 'lucide-react'
import SubscriptionActions from '@/components/billing/SubscriptionActions'
import StripeCallback from '@/components/billing/StripeCallback'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
)

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
})

export default function ProfileClient() {
  const { data: user, isLoading, isError } = useGetUserProfile()
  const { data: subscription, isLoading: isSubLoading } = useGetUserSubscription()
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUserProfile()
  
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        phone: user.phone || '',
      })
    }
  }, [user, reset])

  const onSubmit = (data) => {
    setSuccessMsg('')
    setErrorMsg('')
    
    updateUser(data, {
      onSuccess: () => {
        setSuccessMsg('Profile updated successfully')
        reset(data) // Reset form with new data to make isDirty false
        setTimeout(() => setSuccessMsg(''), 5000)
      },
      onError: (error) => {
        setErrorMsg(error.message || 'Failed to update profile')
      }
    })
  }

  if (isLoading || isSubLoading) {
    return (
      <main className="page-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (isError || !user) {
    return (
      <main className="page-container section-padding">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center text-red-500">
          Failed to load profile. Please try again later.
        </div>
      </main>
    )
  }

  return (
    <main className="page-container section-padding animate-in fade-in duration-700">
      <StripeCallback />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section - Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4 text-center h-fit">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage src={user.image} />
            <AvatarFallback className="gradient-primary text-white text-3xl font-bold">
              {user.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          
          <Badge className="bg-cyan-50 text-cyan-700 border-0 rounded-full uppercase tracking-widest font-bold px-3 py-1 mt-1 hover:bg-cyan-50">
            {user.role || 'PATIENT'}
          </Badge>

          <div className="grid grid-cols-2 gap-4 w-full border-t border-gray-100 pt-6 mt-2">
            <div className="text-center space-y-1">
              <p className="text-2xl font-black text-gray-900">
                {user._count?.appointments || 0}
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Appointments</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-2xl font-black text-gray-900">
                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Member Since</p>
            </div>
          </div>

          <div className="w-full pt-6 mt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Profile photo and email are managed by Google.
            </p>
          </div>
        </div>

        {/* Right Section - Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <p className="text-sm text-gray-500 mt-1">Update your details below</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                <Input 
                  id="name" 
                  {...register('name')} 
                  className="rounded-xl border-gray-200 focus-visible:ring-cyan-500/30"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input 
                  id="email" 
                  value={user.email} 
                  disabled
                  className="bg-gray-50 text-gray-400 cursor-not-allowed rounded-xl border-gray-200"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Email is managed by your Google account
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register('phone')} 
                  className="rounded-xl border-gray-200 focus-visible:ring-cyan-500/30"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Account Info display */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-8 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Account Type</span>
                <span className="flex items-center gap-1.5 font-medium text-gray-900 border border-gray-200 bg-white px-2 py-1 rounded-md shadow-sm">
                  <GoogleIcon />
                  Google OAuth
                </span>
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Last Updated</span>
                <span className="font-medium text-gray-900">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 pt-4 border-t border-gray-100">
              {successMsg && (
                <div className="text-sm text-green-600 flex items-center gap-1.5 font-medium mr-auto">
                  <CheckCircle className="h-4 w-4" />
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="text-sm text-red-600 flex items-center gap-1.5 font-medium mr-auto">
                  <AlertCircle className="h-4 w-4" />
                  {errorMsg}
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={!isDirty || isUpdating}
                className="gradient-primary text-white rounded-xl px-8 py-2.5 w-full sm:w-auto h-auto font-bold shadow-md shadow-cyan-100 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none border-0"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </div>
        
      </div>

      {/* Subscription Status Card */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-gray-900">Subscription Plan</h3>
          <div className="flex items-center">
             {subscription?.plan === 'FREE' && <Badge className="bg-gray-100 text-gray-600 border-0 rounded-full uppercase hover:bg-gray-100 font-bold tracking-wider px-3 py-1 text-xs">Free</Badge>}
             {subscription?.plan === 'BASIC' && <Badge className="bg-cyan-50 text-cyan-700 border-0 rounded-full uppercase hover:bg-cyan-50 font-bold tracking-wider px-3 py-1 text-xs">Basic</Badge>}
             {subscription?.plan === 'AI_PRO' && <Badge className="bg-purple-50 text-purple-700 border-0 rounded-full uppercase hover:bg-purple-50 flex items-center px-3 py-1 text-xs font-bold tracking-wider"><Crown className="h-3 w-3 mr-1.5" /> AI Pro</Badge>}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {(!subscription || subscription.plan === 'FREE')
               ? "Free plan — no billing"
               : `Renews on ${new Date(subscription?.currentPeriodEnd).toLocaleDateString()}`}
          </p>
        </div>
        <SubscriptionActions plan={subscription?.plan || 'FREE'} />
      </div>

    </main>
  )
}
