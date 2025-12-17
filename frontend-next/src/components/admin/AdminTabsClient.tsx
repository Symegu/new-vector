'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import AnalyticsPage from '@/src/components/admin/AnalyticsPage'
import LeadsTable from '@/src/components/admin/LeadsTable'
import QuizResultsTable from '@/src/components/admin/QuizResultsTable'

export function AdminTabsClient() {
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
