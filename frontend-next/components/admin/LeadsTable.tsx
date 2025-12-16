'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bookmark, BookOpen } from 'lucide-react'

interface Lead {
  id: string
  createdAt: string
  name: string
  phone: string
  email: string
  source: 'landing_contact' | 'quiz_result'
  status: 'new' | 'viewed' | 'processed'
  flagged: boolean
  message?: string
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [flaggedOnly, setFlaggedOnly] = useState(false)
  const PAGE_SIZE = 10

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

  const fetchLeads = useCallback(async (page: number = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        search: search.trim() || '',
        status: statusFilter,
        source: sourceFilter,
        flagged: flaggedOnly.toString(),
        page: page.toString(),
        limit: PAGE_SIZE.toString(),
      })

      const res = await fetch(`${API_URL}/api/admin/leads?${params}`, {
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        setLeads(data.leads || [])
        setTotal(data.total || 0)
        setCurrentPage(data.page || 1)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter, sourceFilter, flaggedOnly, API_URL])

  // Изначальная загрузка
  useEffect(() => {
    fetchLeads(1)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLeads(1)
  }

  const handlePageChange = (page: number) => {
    fetchLeads(page)
  }

  const toggleFlag = async (id: string) => {
    const lead = leads.find(l => l.id === id)
    if (!lead) return

    try {
      await fetch(`${API_URL}/api/admin/leads/${id}/flag`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flagged: !lead.flagged }),
        credentials: 'include',
      })
      fetchLeads(currentPage)
    } catch (error) {
      console.error('Failed to update flag:', error)
    }
  }

  const updateStatus = async (id: string, status: Lead['status']) => {
    try {
      await fetch(`${API_URL}/api/admin/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
      })
      fetchLeads(currentPage)
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        <p className="mt-2 text-sm text-gray-800">Загрузка заявок...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        {/* Поиск */}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Имя, телефон, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 pl-10 pr-4 py-3 bg-gray-800/80 border-r-0 border border-gray-600/50 rounded-l-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500/50 transition-all hover:border-gray-500/70"
            />
            <button
              type="submit"
              className="btn btn-primary px-6 py-3 text-white font-medium rounded-r-lg"
              disabled={loading}
            >
              Поиск
            </button>
          </div>
        </form>
        
        {/* Фильтры */}
        <div className='flex items-center gap-4 flex-wrap'>
          <select 
            value={statusFilter} 
            onChange={(e) => {
              setStatusFilter(e.target.value)
              fetchLeads(1)
            }}
            className="px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500/50 backdrop-blur-sm transition-all hover:border-gray-500/70"
          >
            <option value="all">Все статусы</option>
            <option value="new">Новая</option>
            <option value="viewed">Просмотрена</option>
            <option value="processed">Обработана</option>
          </select>

          <select 
            value={sourceFilter} 
            onChange={(e) => {
              setSourceFilter(e.target.value)
              fetchLeads(1)
            }}
            className="px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500/50 backdrop-blur-sm transition-all hover:border-gray-500/70"
          >
            <option value="all">Все источники</option>
            <option value="landing_contact">Форма</option>
            <option value="quiz_result">Тест</option>
          </select>

          <label className="flex items-center gap-3 p-3 bg-white border border-gray-300/50 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
            <input
              type="checkbox"
              checked={flaggedOnly}
              onChange={(e) => {
                setFlaggedOnly(e.target.checked)
                fetchLeads(1)
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-sm text-gray-900 font-medium">Только с флагом</span>
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/50 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-2xl">
        <table className="w-full">
          <thead className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <tr>
              <th className="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-12">Флаг</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Дата</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Имя</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Телефон</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px]">Сообщение</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Источник</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors h-20">
                <td className="px-1 py-4 text-center">
                  <button
                    onClick={() => toggleFlag(lead.id)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 shadow-sm ${
                      lead.flagged
                        ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-md border border-yellow-500/50'
                        : 'bg-white text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-400 shadow-sm'
                    }`}
                    title={lead.flagged ? 'Снять флаг' : 'Установить флаг'}
                  >
                    {lead.flagged ? <Bookmark className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </button>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-mono font-medium">
                  {new Date(lead.createdAt).toLocaleString('ru-RU', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-900 max-w-xs truncate">{lead.name}</td>
                <td className="px-4 py-4 text-sm text-gray-700 font-mono">{lead.phone}</td>
                <td className="px-4 py-4 text-sm text-gray-700 max-w-xs truncate">{lead.email}</td>
                <td className="px-4 py-4 max-w-md">
                  {lead.message ? (
                    <div className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                      {lead.message}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    lead.source === 'landing_contact' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'bg-green-100 text-green-800 border border-green-200'
                  }`}>
                    {lead.source === 'landing_contact' ? 'Форма' : 'Тест'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="new">Новая</option>
                    <option value="viewed">Просмотрена</option>
                    <option value="processed">Обработана</option>
                  </select>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
          <div className="text-sm text-gray-700">
            Показано {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, total)} из {total} заявок
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 rounded-lg hover:shadow-sm transition-all"
            >
              ← Назад
            </button>
            <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
              Страница {currentPage} из {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 rounded-lg hover:shadow-sm transition-all"
            >
              Вперед →
            </button>
          </div>
        </div>
      )}

      {leads.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4 opacity-40">📭</div>
          <p className="text-gray-800 text-lg font-medium">Заявок пока нет</p>
          {search.trim() && (
            <p className="text-sm text-gray-400 mt-2">Ничего не найдено по запросу</p>
          )}
        </div>
      )}
    </div>
  )
}
