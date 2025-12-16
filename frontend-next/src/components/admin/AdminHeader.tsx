'use client'

import { useRouter } from 'next/navigation'

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: очистить сессию/токен
    router.push('/admin/login')
  }

  return (
    <header className="admin-header">
      <h1 style={{ margin: 0, fontSize: 'var(--admin-font-size-lg)' }}>
        Панель администратора
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--admin-spacing-lg)' }}>
        <span style={{ fontSize: 'var(--admin-font-size-sm)' }}>
          Администратор
        </span>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm">
          Выход
        </button>
      </div>
    </header>
  )
}
