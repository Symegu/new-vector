import { Suspense } from 'react'
import { AdminLoginClient } from '../../../components/admin/AdminLoginClient'

export const dynamic = 'force-dynamic'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginClient />
    </Suspense>
  )
}