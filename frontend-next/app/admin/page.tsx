'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LeadsTable from '@/components/admin/LeadsTable'
import QuizResultsTable from '@/components/admin/QuizResultsTable'
import AnalyticsPage from '@/components/admin/AnalyticsPage'

export default function AdminPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('leads')

  useEffect(() => {
    const tab = searchParams.get('tab') || 'leads'
    setActiveTab(tab)
  }, [searchParams])

  return (
    <div>
      {activeTab === 'leads' && <LeadsTable />}
      {activeTab === 'quiz' && <QuizResultsTable />}
      {activeTab === 'analytics' && <AnalyticsPage />}
    </div>
  )
}
