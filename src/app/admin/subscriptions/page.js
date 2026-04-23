import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllSubscriptions, getRevenueStats } from '@/actions/admin.actions'
import { DollarSign, Users, CreditCard, ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PlanBadge from '@/components/billing/PlanBadge'
import EmptyState from '@/components/ui/EmptyState'

export const metadata = {
  title: 'Subscriptions — Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminSubscriptionsPage() {
  const session = await auth()
  
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  const [subscriptions, revenueStats] = await Promise.all([
    getAllSubscriptions(),
    getRevenueStats(),
  ])

  // Split paid vs free
  const paidSubscriptions = subscriptions.filter(sub => sub.plan !== 'FREE')
  const freeUsersCount = subscriptions.filter(sub => sub.plan === 'FREE').length

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="inline-flex bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide">ACTIVE</span>
      case 'PAST_DUE':
        return <span className="inline-flex bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide">PAST DUE</span>
      case 'CANCELLED':
        return <span className="inline-flex bg-red-50 text-red-700 border border-red-200 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide">CANCELLED</span>
      default:
        return <span className="inline-flex bg-gray-100 text-gray-500 rounded-full px-2.5 py-0.5 text-xs tracking-wide">{status}</span>
    }
  }

  return (
    <div className="space-y-8">
      {/* SECTION 1 - PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
        <p className="text-sm text-gray-500 mt-1">Manage subscriber plans and billing</p>
      </div>

      {/* SECTION 2 - REVENUE SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Monthly Revenue</h3>
            <div className="h-10 w-10 bg-[#EDF5F8] rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#619BB6]" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">${revenueStats.totalRevenue}</p>
            <p className="text-sm text-gray-500 mt-1">Estimated monthly</p>
          </div>
        </div>

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Total Subscribers</h3>
            <div className="h-10 w-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{revenueStats.totalPaidSubscribers}</p>
            <p className="text-sm text-gray-500 mt-1">Paying subscribers</p>
          </div>
        </div>

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Plan Breakdown</h3>
            <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="space-y-2 mt-auto">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Basic <span className="font-medium text-gray-900">({revenueStats.basicCount} × $9)</span></span>
              <span className="font-bold text-gray-900">${revenueStats.basicRevenue}/mo</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">AI Pro <span className="font-medium text-gray-900">({revenueStats.proCount} × $19)</span></span>
              <span className="font-bold text-purple-600">${revenueStats.proRevenue}/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 - SUBSCRIBERS TABLE */}
      <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {paidSubscriptions.length === 0 ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <EmptyState
                icon={CreditCard}
                title="No Subscribers Yet"
                description="No patients have upgraded to a paid plan. Share the pricing page to get started."
                actionLabel="View Pricing Page"
                actionHref="/billing"
                size="lg"
              />
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Subscriber</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Period End</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe ID</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paidSubscriptions.map((sub) => (
                  <tr key={sub.subscriptionId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-gray-100">
                          <AvatarImage src={sub.userImage} />
                          <AvatarFallback className="bg-[#EDF5F8] text-[#619BB6] font-bold text-xs">
                            {sub.userName ? sub.userName.charAt(0).toUpperCase() : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-gray-900">{sub.userName || 'Unknown User'}</span>
                          <span className="text-xs text-gray-500">{sub.userEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <PlanBadge plan={sub.plan} className="border-0 shadow-none bg-opacity-80" />
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(sub.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">
                        {sub.currentPeriodEnd 
                          ? new Date(sub.currentPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {sub.stripeCustomerId ? (
                        <span className="text-xs font-mono text-gray-400" title={sub.stripeCustomerId}>
                          {sub.stripeCustomerId.substring(0, 20)}...
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {sub.stripeCustomerId && (
                        <a 
                          href={`https://dashboard.stripe.com/customers/${sub.stripeCustomerId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View in Stripe
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* FREE USERS SUMMARY */}
      {freeUsersCount > 0 && (
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">Free Plan Users</span>
          <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-sm">
            {freeUsersCount}
          </span>
        </div>
      )}

    </div>
  )
}
