'use client'

import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { id: 'leads', label: 'Заявки', icon: '📋' },
    { id: 'quiz', label: 'Результаты тестов', icon: '✅' },
    { id: 'analytics', label: 'Аналитика', icon: '📊' },
  ]

  const handleTabClick = (tabId: string) => {
    router.push(`/admin?tab=${tabId}`)
  }

  return (
    <aside className="admin-sidebar">
      <div style={{ marginBottom: 'var(--admin-spacing-xl)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--admin-spacing-md)',
            marginBottom: 'var(--admin-spacing-lg)',
          }}
        >
          <Image
            src="/logo/logo-icon.svg"
            alt="NV"
            width={32}
            height={32}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span
            style={{
              fontSize: 'var(--admin-font-size-lg)',
              fontWeight: 'var(--admin-font-weight-semibold)',
            }}
          >
            Admin
          </span>
        </div>
      </div>

      <nav className="admin-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`admin-nav-item ${
              pathname.includes(tab.id) ? 'active' : ''
            }`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--admin-spacing-md)',
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <div
        style={{
          marginTop: 'var(--admin-spacing-2xl)',
          paddingTop: 'var(--admin-spacing-xl)',
          borderTop: `1px solid var(--admin-dark-border)`,
          fontSize: 'var(--admin-font-size-xs)',
          color: 'var(--admin-dark-text)',
          opacity: 0.7,
        }}
      >
        v1.0 Beta
      </div>
    </aside>
  )
}
