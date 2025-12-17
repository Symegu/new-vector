import { Suspense } from 'react'
import { AdminTabsClient } from '../../components/admin/AdminTabsClient'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminTabsClient />
    </Suspense>
  )
}