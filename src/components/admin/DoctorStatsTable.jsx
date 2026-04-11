'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowUpDown, 
  Users 
} from 'lucide-react'

export default function DoctorStatsTable({ data = [] }) {
  const [sortField, setSortField] = useState('totalAppointments')
  const [sortDirection, setSortDirection] = useState('desc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3.5 w-3.5 text-gray-300" />
    if (sortDirection === 'desc') return <ArrowDown className="h-3.5 w-3.5 text-gray-900" />
    return <ArrowUp className="h-3.5 w-3.5 text-gray-900" />
  }

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === 'completionRate') {
      aValue = parseInt(aValue.replace('%', ''))
      bValue = parseInt(bValue.replace('%', ''))
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th 
                className={`px-6 py-3 text-xs uppercase tracking-wider cursor-pointer transition-colors ${sortField === 'totalAppointments' ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => handleSort('totalAppointments')}
              >
                <div className="flex items-center gap-1">Total <SortIcon field="totalAppointments" /></div>
              </th>
              <th 
                className={`px-6 py-3 text-xs uppercase tracking-wider cursor-pointer transition-colors ${sortField === 'confirmed' ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => handleSort('confirmed')}
              >
                <div className="flex items-center gap-1">Confirmed <SortIcon field="confirmed" /></div>
              </th>
              <th 
                className={`px-6 py-3 text-xs uppercase tracking-wider cursor-pointer transition-colors ${sortField === 'completed' ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => handleSort('completed')}
              >
                <div className="flex items-center gap-1">Completed <SortIcon field="completed" /></div>
              </th>
              <th 
                className={`px-6 py-3 text-xs uppercase tracking-wider cursor-pointer transition-colors ${sortField === 'completionRate' ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => handleSort('completionRate')}
              >
                <div className="flex items-center gap-1">Rate <SortIcon field="completionRate" /></div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {!sortedData || sortedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Users className="h-8 w-8 text-gray-300" />
                    <span className="text-sm text-gray-500">No doctor data available</span>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((doc) => {
                const isActive = doc.totalAppointments > 0 
                return (
                  <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                          {doc.imageURL ? (
                            <Image src={doc.imageURL} alt={doc.name} fill className="object-cover object-top" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-sm">
                              {doc.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                          <span className="text-xs text-gray-500">{doc.specialty}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">{doc.totalAppointments}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">{doc.confirmed}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">{doc.completed}</span>
                    </td>
                    <td className="px-6 py-4 min-w-[120px]">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-cyan-500 h-1.5 rounded-full" 
                            style={{ width: doc.completionRate }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{doc.completionRate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isActive ? (
                        <span className="bg-green-50 text-green-700 rounded-full px-2.5 py-1 text-xs font-medium border-0">
                          Active
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 rounded-full px-2.5 py-1 text-xs font-medium border-0">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
