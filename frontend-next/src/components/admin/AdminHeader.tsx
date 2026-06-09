'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/admin/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      router.push('/auth/login');
    }
  }

  return (
    <header className="admin-header flex items-center justify-between p-6 border-b border-gray-800 bg-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 w-full">
        <Link href="/" className="inline-block">
            <Image
              src="/logo/logo-icon.svg"
              alt="Admin"
              width={48}
              height={48}
              className="mx-auto"
            />
          </Link>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
        >
          Выход
        </button>
      </div>
    </header>
  )
}
