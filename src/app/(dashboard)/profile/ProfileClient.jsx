'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '@/lib/validations'
import { useGetUserProfile, useUpdateUserProfile } from '@/hooks/useProfile'
import { useGetUserSubscription } from '@/hooks/useStripe'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, AlertCircle, Crown, Lock } from 'lucide-react'
import SubscriptionActions from '@/components/billing/SubscriptionActions'
import StripeCallback from '@/components/billing/StripeCallback'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
)

export default function ProfileClient() {
  const { data: user, isLoading, isError } = useGetUserProfile()
  const { data: subscription, isLoading: isSubLoading } = useGetUserSubscription()
  const mutation = useUpdateUserProfile()

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        phone: user.phone || '',
      })
    }
  }, [user, form])

  const onSubmit = async (validatedData) => {
    mutation.mutate(validatedData)
  }

  if (isLoading || isSubLoading) {
    return (
      <main className="page-container section-padding">
        <div className="space-y-6">
          <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-[12px]" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:w-[280px]">
                <Skeleton className="h-16 w-full rounded-[8px]" />
                <Skeleton className="h-16 w-full rounded-[8px]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6">
              <Skeleton className="h-5 w-28 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-full rounded-[6px]" />
                <Skeleton className="h-10 w-full rounded-[6px]" />
              </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-11 w-full rounded-[6px]" />
                <Skeleton className="h-11 w-full rounded-[6px]" />
                <Skeleton className="h-11 w-full rounded-[6px]" />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (isError || !user) {
    return (
      <main className="page-container section-padding">
        <div className="bg-white rounded-[12px] border border-[#E8A09A] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 text-center text-[#C0392B]">
          Failed to load profile. Please try again later.
        </div>
      </main>
    )
  }

  return (
    <main className="page-container section-padding animate-in fade-in duration-700 space-y-6">
      <StripeCallback />

      <section className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0">
            <Avatar className="h-20 w-20 rounded-full border border-[#E2EDF2] shadow-sm">
              <AvatarImage src={user.image} />
              <AvatarFallback className="bg-[#EDF5F8] text-[#4A7D96] text-2xl font-semibold rounded-full">
                {user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 space-y-1">
              <h1 className="text-xl md:text-2xl font-semibold text-[#1A2832] truncate">{user.name}</h1>
              <p className="text-sm text-[#7A9BAD] truncate">{user.email}</p>
              <Badge className="bg-[#EDF5F8] text-[#4A7D96] border border-[#BAD7E1] rounded-[4px] uppercase tracking-[0.08em] font-medium px-2 py-0.5 mt-1 hover:bg-[#EDF5F8]">
                {user.role || 'PATIENT'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-[320px]">
            <div className="bg-[#F8FAFB] border border-[#E2EDF2] rounded-[8px] px-4 py-3 text-center">
              <p className="text-lg font-semibold text-[#1A2832]">{user._count?.appointments || 0}</p>
              <p className="text-xs text-[#7A9BAD] uppercase tracking-wide">Appointments</p>
            </div>
            <div className="bg-[#F8FAFB] border border-[#E2EDF2] rounded-[8px] px-4 py-3 text-center">
              <p className="text-sm font-semibold text-[#1A2832]">
                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-xs text-[#7A9BAD] uppercase tracking-wide">Member Since</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 h-fit space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1A2832]">Account Access</h2>
            <p className="text-xs text-[#7A9BAD] mt-1">Your sign-in and identity provider details.</p>
          </div>

          <div className="bg-[#F8FAFB] border border-[#E2EDF2] rounded-[8px] p-4 space-y-3">
            <div className="flex justify-between items-center text-sm gap-3">
              <span className="text-[#4A6572] font-medium">Sign-in Method</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#1A2832] border border-[#E2EDF2] bg-white px-2 py-1 rounded-[6px] shadow-sm">
                <GoogleIcon />
                Google OAuth
              </span>
            </div>
            <Separator className="bg-[#E2EDF2]" />
            <div className="flex justify-between items-center text-sm gap-3">
              <span className="text-[#4A6572] font-medium">Last Updated</span>
              <span className="font-medium text-[#1A2832]">
                {new Date(user.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#7A9BAD]">
            Profile photo and email are managed by Google.
          </p>
        </aside>

        <section className="lg:col-span-2 bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#1A2832]">Personal Information</h2>
            <p className="text-sm text-[#7A9BAD] mt-1">Update your details below</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-5">
              <label className="form-label">
                Full Name
              </label>
              <input
                {...form.register('name')}
                className="input-field"
                placeholder="Your full name"
                style={{
                  borderColor: form.formState.errors.name ? '#C0392B' : undefined,
                }}
              />
              {form.formState.errors.name && (
                <p className="form-error">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label className="form-label">
                Email Address
              </label>
              <div className="relative">
                <input
                  value={user?.email || ''}
                  disabled
                  className="input-field pr-9"
                  style={{
                    background: '#F8FAFB',
                    color: '#A8C4CF',
                    cursor: 'not-allowed',
                    borderColor: '#E2EDF2',
                  }}
                />
                <Lock
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A8C4CF]"
                />
              </div>
              <p style={{
                fontSize: '11px',
                color: '#A8C4CF',
                marginTop: '4px',
              }}>
                Managed by Google - cannot be changed
              </p>
            </div>

            <div className="mb-5">
              <label className="form-label">
                Phone Number
                <span style={{
                  color: '#A8C4CF',
                  marginLeft: '4px',
                  fontWeight: 400,
                }}>
                  (optional)
                </span>
              </label>
              <input
                {...form.register('phone')}
                className="input-field"
                placeholder="+1 (555) 000-0000"
                type="tel"
                style={{
                  borderColor: form.formState.errors.phone ? '#C0392B' : undefined,
                }}
              />
              {form.formState.errors.phone && (
                <p className="form-error">
                  <AlertCircle className="h-3 w-3" />
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 pt-4 border-t border-[#E2EDF2]">
              <button
                onClick={form.handleSubmit(onSubmit)}
                disabled={!form.formState.isDirty || mutation.isPending}
                className="btn-primary"
                style={{
                  opacity: !form.formState.isDirty || mutation.isPending ? 0.4 : 1,
                }}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </section>
      </div>

      <section className="bg-white rounded-[12px] border border-[#E2EDF2] shadow-[0_1px_3px_rgba(26,40,50,0.06)] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-[#1A2832]">Subscription Plan</h3>
          <div className="flex items-center">
            {subscription?.plan === 'FREE' && (
              <Badge className="bg-[#F5F5F5] text-[#6B7280] border border-[#D0D0D0] rounded-[4px] uppercase hover:bg-[#F5F5F5] font-medium tracking-wider px-2 py-0.5 text-xs">
                Free
              </Badge>
            )}
            {subscription?.plan === 'BASIC' && (
              <Badge className="bg-[#EDF5F8] text-[#4A7D96] border border-[#BAD7E1] rounded-[4px] uppercase hover:bg-[#EDF5F8] font-medium tracking-wider px-2 py-0.5 text-xs">
                Basic
              </Badge>
            )}
            {subscription?.plan === 'AI_PRO' && (
              <Badge className="bg-[#EDF5F8] text-[#1A2832] border border-[#BAD7E1] rounded-[4px] uppercase hover:bg-[#EDF5F8] flex items-center px-2 py-0.5 text-xs font-medium tracking-wider">
                <Crown className="h-3 w-3 mr-1" /> AI Pro
              </Badge>
            )}
          </div>
          <p className="text-xs text-[#7A9BAD] font-medium">
            {!subscription || subscription.plan === 'FREE'
              ? 'Free plan - no billing'
              : `Renews on ${new Date(subscription?.currentPeriodEnd).toLocaleDateString()}`}
          </p>
        </div>
        <SubscriptionActions plan={subscription?.plan || 'FREE'} />
      </section>
    </main>
  )
}
