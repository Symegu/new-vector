'use client'

export default function AnalyticsPage() {
  return (
    <div style={{ padding: 'var(--admin-spacing-lg)' }}>
      <h2 style={{ marginBottom: 'var(--admin-spacing-lg)' }}>Аналитика</h2>

      <div className="card">
        <h3>Здесь будут графики и статистика</h3>
        <p style={{ color: 'var(--admin-text-secondary)', marginTop: 'var(--admin-spacing-md)' }}>
          Место зарезервировано для будущей аналитики:
        </p>
        <ul style={{ marginTop: 'var(--admin-spacing-md)', paddingLeft: 'var(--admin-spacing-lg)' }}>
          <li>Количество заявок по дням</li>
          <li>Конверсия тест → заявка</li>
        </ul>

        {/* <button className="btn btn-primary" style={{ marginTop: 'var(--admin-spacing-lg)' }}>
          Разработка в процессе
        </button> */}
      </div>
    </div>
  )
}
