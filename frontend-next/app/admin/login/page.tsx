'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // TODO: POST /api/admin/auth/login
      // Пока что заглушка
      if (login === 'admin' && password === 'admin') {
        // Сохранить токен / сессию
        localStorage.setItem('admin_token', 'mock_token')
        router.push('/admin')
      } else {
        setError('Неверный логин или пароль')
      }
    } catch (err) {
      setError('Ошибка при входе')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--admin-bg-light)',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--admin-spacing-xl)' }}>
          <Image
            src="/logo/logo-icon.svg"
            alt="NV"
            width={48}
            height={48}
            style={{ margin: '0 auto' }}
          />
          <h1 style={{ marginTop: 'var(--admin-spacing-md)', fontSize: 'var(--admin-font-size-lg)' }}>
            Админ-панель
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-spacing-md)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--admin-spacing-sm)', fontWeight: 'var(--admin-font-weight-medium)' }}>
              Логин
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 'var(--admin-spacing-sm)', fontWeight: 'var(--admin-font-weight-medium)' }}>
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          {error && (
            <p style={{ color: 'var(--admin-error)', fontSize: 'var(--admin-font-size-sm)' }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Войти
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--admin-spacing-lg)', fontSize: 'var(--admin-font-size-xs)', color: 'var(--admin-text-muted)' }}>
          Тестовые учетные данные: admin / admin
        </p>
      </div>
    </div>
  )
}
