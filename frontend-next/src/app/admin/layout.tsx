'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSidebar from '../../components/admin/AdminSidebar'
import '../../styles/admin-globals.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    // Проверяем только localStorage (access_token)
    if (!localStorage.getItem('access_token')) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <AdminHeader />
      <main className="admin-main">{children}</main>
    </div>
  )
}
