'use client'

import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSidebar from '../../components/admin/AdminSidebar'
import '../../styles/admin-globals.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <AdminHeader />
      <main className="admin-main">{children}</main>
    </div>
  )
}
