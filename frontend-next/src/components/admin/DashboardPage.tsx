'use client'

import { apiFetch } from '@/src/lib/api'
import router from 'next/router'
import { useEffect, useState } from 'react'

interface RealStats {
  totalLeads: number
  newLeads: number
  processedLeads: number
  totalQuizzes: number
  todayLeads: number
  yesterdayLeads: number
  weekLeads: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<RealStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
  setLoading(true)
  try {
    const statsData = await apiFetch('/api/admin/stats') // уже JSON
    setStats(statsData)
  } catch (error: any) {
    console.error('Stats error:', error)
    if (error.message?.includes('Auth failed')) {
      router.push('/admin/login')
    }
  } finally {
    setLoading(false) // Обязательно!
  }
}

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Загружаем статистику...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать!</h1>
        <p className="text-gray-400 text-lg">Панель управления «Новый Вектор»</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-200/50 border border-blue-300 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">Всего заявок</p>
              <p className="text-3xl font-bold text-white">{stats?.totalLeads ?? 0}</p>
              <p className="text-sm font-medium text-emerald-400 mt-1">{stats?.newLeads ?? 0} новых</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              📋
            </div>
          </div>
        </div>

        <div className="bg-green-200/50 border border-green-300 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">Сегодня</p>
              <p className="text-3xl font-bold text-emerald-400">{stats?.todayLeads ?? 0}</p>
              <p className="text-xs text-gray-500 mt-1">{stats?.yesterdayLeads ?? 0} вчера</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              📅
            </div>
          </div>
        </div>

        <div className="bg-violet-200/50 border border-violet-300 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">Тестов всего</p>
              <p className="text-3xl font-bold text-blue-400">{stats?.totalQuizzes ?? 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-amber-200/50 border border-amber-300 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">За неделю</p>
              <p className="text-3xl font-bold text-purple-400">{stats?.weekLeads ?? 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              📈
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
