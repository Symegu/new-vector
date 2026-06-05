'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'dashboard'

  const tabs = [
    { id: 'dashboard', label: 'Обзор', icon: '📊' },
    { id: 'leads', label: 'Заявки', icon: '📋' },
    { id: 'quiz', label: 'Результаты теста', icon: '✅' },
    { id: 'analytics', label: 'Аналитика', icon: '📈' },
  ]

  const handleTabClick = (tabId: string) => {
    router.push(`/admin?tab=${tabId}`)
  }

  return (
    <aside className="admin-sidebar w-10 bg-gray-900 border-r border-gray-800 flex flex-col h-screen">

      {/* Navigation */}
      <nav className="flex-1 p-4 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{marginBottom: "16px"}}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden lg:block!">{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
