'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'


export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/admin/login')
  }

  return (
    <header className="admin-header flex items-center justify-between p-6 border-b border-gray-800 bg-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 w-full">
        <Image
            src="/logo/logo-icon.svg"
            alt="NV Admin"
            width={32}
            height={32}
            className="brightness-0 invert"
          />
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
