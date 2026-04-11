'use client'

import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'

export default function RevenueChart({ data }) {
  const hasSubscribers = data && (data.basicCount > 0 || data.proCount > 0)
  
  const pieData = hasSubscribers 
    ? [
        { name: 'Basic ($9/mo)', value: data.basicCount, color: '#06b6d4' },
        { name: 'AI Pro ($19/mo)', value: data.proCount, color: '#8b5cf6' },
      ]
    : [
        { name: 'No subscribers', value: 1, color: '#e5e7eb' }
      ]

  const totalRevenue = data?.totalRevenue || 0
  const basicCount = data?.basicCount || 0
  const proCount = data?.proCount || 0
  const totalPaid = data?.totalPaidSubscribers || 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-gray-900">Revenue Overview</h3>
        <p className="text-sm text-gray-500">Active subscriptions</p>
      </div>

      <div style={{ width: '100%', height: 200 }} className="mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%" 
              cy="50%"
              innerRadius={60} 
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#111827', fontWeight: 500 }}
              formatter={(value, name) => hasSubscribers ? [value, name] : ['0', name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* STATS BELOW CHART */}
      <div className="flex flex-col gap-4 mt-auto">
        {/* Row 1 */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between text-sm bg-gray-50 rounded-xl p-3">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 mb-1">Basic Plans</span>
            <span className="font-semibold text-gray-900">{basicCount} subscribers</span>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-gray-500 mb-1">AI Pro Plans</span>
            <span className="font-semibold text-purple-600">{proCount} subscribers</span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-700">Total Paid</span>
          <div className={`px-2 py-1 rounded-md text-xs font-bold ${
            totalPaid === 0 ? 'bg-gray-100 text-gray-600' :
            totalPaid <= 10 ? 'bg-cyan-100 text-cyan-700' :
            'bg-green-100 text-green-700'
          }`}>
            {totalPaid} subscribers
          </div>
        </div>
      </div>
    </div>
  )
}
