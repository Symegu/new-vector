'use client'

import { useState } from 'react'

interface QuizResult {
  id: string
  created_at: string
  score: number
  level: 'low' | 'medium' | 'high'
  title: string
  message: string
  lead_id?: string
  flagged: boolean
}

const mockResults: QuizResult[] = [
  {
    id: '1',
    created_at: '2025-12-15T08:00:00',
    score: 3,
    level: 'low',
    title: 'Пока рано говорить о банкротстве',
    message: 'По ответам не видно выраженных признаков неплатёжеспособности',
    lead_id: undefined,
    flagged: false,
  },
  {
    id: '2',
    created_at: '2025-12-15T07:30:00',
    score: 6,
    level: 'high',
    title: 'Банкротство может быть актуальным',
    message: 'Ваша ситуация близка к критериям банкротства',
    lead_id: '2',
    flagged: true,
  },
]

export default function QuizResultsTable() {
  const [results, setResults] = useState<QuizResult[]>(mockResults)
  const [levelFilter, setLevelFilter] = useState('all')
  const [withLeadOnly, setWithLeadOnly] = useState(false)

  const filtered = results.filter((result) => {
    const matchesLevel = levelFilter === 'all' || result.level === levelFilter
    const matchesLead = !withLeadOnly || !!result.lead_id
    return matchesLevel && matchesLead
  })

  const handleToggleFlag = (id: string) => {
    setResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, flagged: !r.flagged } : r))
    )
    // TODO: PATCH /api/admin/quiz-results/:id/flag
  }

  const getLevelBadge = (level: QuizResult['level']) => {
    const badgeClasses = {
      low: 'badge-low',
      medium: 'badge-medium',
      high: 'badge-high',
    }
    const labels = {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
    }
    return <span className={`badge ${badgeClasses[level]}`}>{labels[level]}</span>
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString('ru-RU')

  return (
    <div style={{ padding: 'var(--admin-spacing-lg)' }}>
      <h2 style={{ marginBottom: 'var(--admin-spacing-lg)' }}>Результаты тестов</h2>

      {/* Фильтры */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--admin-spacing-md)',
          marginBottom: 'var(--admin-spacing-lg)',
        }}
      >
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="all">Все уровни</option>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--admin-spacing-sm)' }}>
          <input
            type="checkbox"
            checked={withLeadOnly}
            onChange={(e) => setWithLeadOnly(e.target.checked)}
          />
          <span>Только со связанной заявкой</span>
        </label>
      </div>

      {/* Таблица */}
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Уровень</th>
              <th>Результат</th>
              <th>Связь с заявкой</th>
              <th style={{ width: '100px' }}>Флаг</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((result) => (
              <tr key={result.id}>
                <td>{formatDate(result.created_at)}</td>
                <td>{getLevelBadge(result.level)}</td>
                <td>
                  <div style={{ fontSize: 'var(--admin-font-size-sm)' }}>
                    <strong>{result.title}</strong>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--admin-text-secondary)' }}>
                      {result.message}
                    </p>
                  </div>
                </td>
                <td>{result.lead_id ? '✅ Есть' : '❌ Нет'}</td>
                <td>
                  <button
                    onClick={() => handleToggleFlag(result.id)}
                    style={{
                      fontSize: '18px',
                      cursor: 'pointer',
                      opacity: result.flagged ? 1 : 0.5,
                    }}
                  >
                    {result.flagged ? '🚩' : '🏁'}
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
