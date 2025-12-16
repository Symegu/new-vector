'use client'

import { useState } from 'react'

// Примерный тип данных
interface Lead {
  id: string
  created_at: string
  name: string
  phone: string
  email: string
  source: 'landing_contact' | 'quiz_result'
  status: 'new' | 'viewed' | 'processed'
  flagged: boolean
  message: string
}

// Mock данные
const mockLeads: Lead[] = [
  {
    id: '1',
    created_at: '2025-12-15T08:30:00',
    name: 'Иван Иванов',
    phone: '+7 (999) 123-45-67',
    email: 'ivan@example.com',
    source: 'landing_contact',
    status: 'new',
    flagged: false,
    message: 'Нужна консультация по банкротству',
  },
  {
    id: '2',
    created_at: '2025-12-15T07:15:00',
    name: 'Мария Петрова',
    phone: '+7 (999) 987-65-43',
    email: 'maria@example.com',
    source: 'quiz_result',
    status: 'viewed',
    flagged: true,
    message: 'Результат теста: высокий уровень задолженности',
  },
]

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [flaggedOnly, setFlaggedOnly] = useState(false)

  // Фильтрация
  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      lead.email.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter
    const matchesFlagged = !flaggedOnly || lead.flagged

    return matchesSearch && matchesStatus && matchesSource && matchesFlagged
  })

  // Toggle флага
  const handleToggleFlag = (id: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, flagged: !lead.flagged } : lead
      )
    )
    // TODO: PATCH /api/admin/leads/:id/flag
  }

  // Изменить статус
  const handleChangeStatus = (id: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    )
    // TODO: PATCH /api/admin/leads/:id/status
  }

  const getStatusBadge = (status: Lead['status']) => {
    const badgeClasses = {
      new: 'badge-new',
      viewed: 'badge-viewed',
      processed: 'badge-processed',
    }
    const labels = {
      new: 'Не просмотрена',
      viewed: 'Просмотрена',
      processed: 'Обработана',
    }
    return (
      <span className={`badge ${badgeClasses[status]}`}>{labels[status]}</span>
    )
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString('ru-RU')

  return (
    <div style={{ padding: 'var(--admin-spacing-lg)' }}>
      <h2 style={{ marginBottom: 'var(--admin-spacing-lg)' }}>Заявки</h2>

      {/* Фильтры */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--admin-spacing-md)',
          marginBottom: 'var(--admin-spacing-lg)',
        }}
      >
        <input
          type="text"
          placeholder="Поиск по имени, телефону, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Все статусы</option>
          <option value="new">Не просмотрена</option>
          <option value="viewed">Просмотрена</option>
          <option value="processed">Обработана</option>
        </select>

        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
          <option value="all">Все источники</option>
          <option value="landing_contact">Форма</option>
          <option value="quiz_result">Тест</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--admin-spacing-sm)' }}>
          <input
            type="checkbox"
            checked={flaggedOnly}
            onChange={(e) => setFlaggedOnly(e.target.checked)}
          />
          <span>Только с флагом</span>
        </label>
      </div>

      {/* Таблица */}
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Источник</th>
              <th>Статус</th>
              <th style={{ width: '100px' }}>Флаг</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id}>
                <td>{formatDate(lead.created_at)}</td>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>{lead.source === 'landing_contact' ? 'Форма' : 'Тест'}</td>
                <td>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleChangeStatus(lead.id, e.target.value as Lead['status'])
                    }
                    style={{ padding: 'var(--admin-spacing-sm)' }}
                  >
                    <option value="new">Не просмотрена</option>
                    <option value="viewed">Просмотрена</option>
                    <option value="processed">Обработана</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleFlag(lead.id)}
                    style={{
                      fontSize: '18px',
                      cursor: 'pointer',
                      opacity: lead.flagged ? 1 : 0.5,
                    }}
                  >
                    {lead.flagged ? '🚩' : '🏁'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: 'var(--admin-spacing-xl)', color: 'var(--admin-text-muted)' }}>
          Нет результатов
        </p>
      )}

      <p style={{ marginTop: 'var(--admin-spacing-lg)', fontSize: 'var(--admin-font-size-sm)', color: 'var(--admin-text-muted)' }}>
        Всего: {filtered.length}
      </p>
    </div>
  )
}
