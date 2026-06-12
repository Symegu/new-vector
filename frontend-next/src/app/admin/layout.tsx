'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSidebar from '../../components/admin/AdminSidebar'
import '../../styles/admin-globals.css'

async function checkAdminAuth() {
  const res = await fetch(`/api/admin/auth/me`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  })

  console.log('checkAdminAuth status:', res.status)
  return res.ok
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {

    const verifyAuth = async () => {
      try {
        const isAuthorized = await checkAdminAuth()

        if (!isAuthorized) {
          router.push('/auth/login')
          return
        }

        setIsCheckingAuth(false)
      } catch {
        console.error('Auth check failed:')
        router.push('/auth/login')
      }
    }

    // setIsCheckingAuth(true)
    verifyAuth()
    
  }, [pathname, router])

  if (isCheckingAuth) {
    return <div>Проверка авторизации...</div>
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <AdminHeader />
      <main className="admin-main">{children}</main>
    </div>
  )
}
