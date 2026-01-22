'use client';

import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Авторедирект через 3 сек
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-md w-full mx-4 text-center p-8 bg-white rounded-2xl shadow-nv-card">
        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center">
          <Home className="w-12 h-12 text-slate-500" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Страница не найдена</h1>
        <p className="text-secondary mb-8">
          Запрашиваемая страница не существует. Перенаправляем на главную...
        </p>
        <Button onClick={() => router.push('/')} className="w-full btn-nv-blue">
          На главную
        </Button>
      </div>
    </div>
  );
}
