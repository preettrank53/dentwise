'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import DoctorFormModal from '@/components/admin/DoctorFormModal'

export default function DoctorManagementHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#1A2832]">Doctor Management</h1>
          <p className="text-sm text-[#7A9BAD]">Manage your dental team</p>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center bg-[#619BB6] text-white rounded-[6px] px-4 py-2.5 text-sm font-medium hover:bg-[#4A7D96] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Doctor
        </button>
      </div>

      <DoctorFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        doctor={null}
      />
    </>
  )
}
