'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function AdminLoginClient() {
  const [login, setLogin] = useState('admin')
  const [password, setPassword] = useState('password')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Неверный логин или пароль')
      const data = await res.json();
      localStorage.setItem('access_token', data.accessToken);
      console.log('loh')
      router.push('/admin?tab=dashboard')
      router.refresh();
    } catch {
      setError('Неверный логин или пароль')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute top-0 left-0 z-100 min-w-screen min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/logo/logo-icon.svg"
            alt="Admin"
            width={48}
            height={48}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-on-dark">Админ-панель</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Логин"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          {error && (
            <p className="p-3 mt-0 text-red-400 text-sm bg-red-900/30 border border-red-500/30 rounded-lg"
            style={{color: "red"}}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 btn-nv-gold text-white font-medium rounded-lg transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {isLoading ? '⏳ Вход...' : 'Войти'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          admin / password
        </p>
      </div>
    </div>
  )
}
