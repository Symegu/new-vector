'use client';

import { useState, useEffect, useCallback } from 'react';

interface QuizResultRow {
  id: string;
  createdAt: string;
  level: 'low' | 'medium' | 'high';
  title: string | null;
  message: string | null;
  answers: string[];
  leadName: string | null;
}

export default function QuizResultsTable() {
  const [items, setItems] = useState<QuizResultRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const PAGE_SIZE = 10;
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

  const fetchResults = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: PAGE_SIZE.toString(),
        });

        if (search.trim()) {
          params.set('search', search.trim());
        }

        const res = await fetch(`${API_URL}/api/admin/quiz-results?${params}`, {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setItems(data.results || []);
          setTotal(data.total || 0);
          setCurrentPage(data.page || 1);
        }
      } catch (error) {
        console.error('Failed to fetch quiz results:', error);
      } finally {
        setLoading(false);
      }
    },
    [search, API_URL],
  );

  useEffect(() => {
    fetchResults(1);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResults(1);
  };

  const handlePageChange = (page: number) => {
    fetchResults(page);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400" />
        <p className="mt-2 text-sm text-gray-800">Загрузка результатов теста...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h2 className='pb-5'>
        Результаты теста
      </h2>
      {/* Поиск только по имени лида */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Поиск по имени клиента..."
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

      {/* Таблица */}
      <div className="overflow-x-auto bg-white/50 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-2xl">
        <table className="w-full">
          <thead className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Дата
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Имя
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Результат
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Ответы
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((qr) => (
              <tr key={qr.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-mono font-medium">
                  {new Date(qr.createdAt).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>

                <td className="px-4 py-4 text-sm text-gray-900">
                  {qr.leadName ? (
                    qr.leadName
                  ) : (
                    <span className="text-xs text-gray-400 italic">— анонимно</span>
                  )}
                </td>

                <td className="px-4 py-4 text-sm text-gray-900 max-w-md">
                  <div className="font-semibold">
                    {qr.level === 'low'
                      ? 'Низкий риск'
                      : qr.level === 'medium'
                      ? 'Средний риск'
                      : 'Высокий риск'}
                  </div>
                  {qr.title && (
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {qr.title}
                    </div>
                  )}
                  {qr.message && (
                    <div className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                      {qr.message}
                    </div>
                  )}
                </td>

                <td className="px-4 py-4 text-sm text-gray-700 max-w-xl">
                  {qr.answers && qr.answers.length > 0 ? (
                    <div className="text-xs text-gray-700 line-clamp-2">
                      {qr.answers.join(' • ')}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">—</span>
                  )}
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
            Показано {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, total)} из {total} результатов
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

      {items.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4 opacity-40">📭</div>
          <p className="text-gray-800 text-lg font-medium">Результатов теста пока нет</p>
          {search.trim() && (
            <p className="text-sm text-gray-400 mt-2">Ничего не найдено по запросу</p>
          )}
        </div>
      )}
    </div>
  );
}
