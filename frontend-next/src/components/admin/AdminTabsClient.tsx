'use client'

// import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import AnalyticsPage from '@/src/components/admin/AnalyticsPage'
import LeadsTable from '@/src/components/admin/LeadsTable'
import QuizResultsTable from '@/src/components/admin/QuizResultsTable'
import DashboardPage from './DashboardPage'

export function AdminTabsClient() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'dashboard'  // ← по умолчанию dashboard

  return (
    <div>
      {activeTab === 'dashboard' && <DashboardPage />}
      {activeTab === 'leads' && <LeadsTable />}
      {activeTab === 'quiz' && <QuizResultsTable />}
      {activeTab === 'analytics' && <AnalyticsPage />}
    </div>
  )
}
