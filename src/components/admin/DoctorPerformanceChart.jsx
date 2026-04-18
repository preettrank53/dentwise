'use client'

import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts'

import ErrorState from '@/components/ui/ErrorState'

export default function DoctorPerformanceChart({ data }) {
  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
         <ErrorState />
      </div>
    )
  }

  const topDoctors = data.slice(0, 5)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Doctor Performance</h3>
        <p className="text-sm text-gray-500">Top 5 by appointments</p>
      </div>

      {topDoctors.length === 0 ? (
        <div className="h-[280px] flex items-center justify-center text-sm text-gray-500">
          No doctor data available.
        </div>
      ) : (
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={topDoctors}
              margin={{ top: 0, right: 20, bottom: 0, left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis 
                type="number"
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false} 
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis 
                type="category" 
                dataKey="name"
                tick={{ fontSize: 12, fill: '#374151' }}
                axisLine={false} 
                tickLine={false}
                width={75}
              />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ fontWeight: 600, color: '#111827' }}
              />
              <Bar 
                dataKey="totalAppointments" 
                name="Total" 
                fill="#06b6d4" 
                radius={[0, 4, 4, 0]} 
                barSize={10} 
              />
              <Bar 
                dataKey="completed" 
                name="Completed" 
                fill="#10b981" 
                radius={[0, 4, 4, 0]} 
                barSize={10} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
