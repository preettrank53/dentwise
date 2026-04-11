'use client'

import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

export default function AppointmentTrendsChart({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Appointment Trends</h3>
        <p className="text-sm text-gray-500">Last 6 months</p>
      </div>

      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-sm text-gray-500">
          No trend data available.
        </div>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false} 
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ fontWeight: 600, color: '#111827' }}
              />
              <Legend 
                verticalAlign="bottom" 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: 16, fontSize: '12px' }}
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Total" 
                stroke="#06b6d4" 
                strokeWidth={2.5} 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="confirmed" 
                name="Confirmed" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                name="Completed" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
