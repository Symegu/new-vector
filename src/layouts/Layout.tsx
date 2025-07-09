// src/layouts/Layout.tsx

// Метаданные страницы (используются в Next.js 13+)
export const metadata = {
  title: 'Юридическая помощь по банкротству физических лиц',
  description: 'Профессиональная помощь в банкротстве физлиц. Законное списание долгов. Первая консультация бесплатно!',
};

// Основной layout для всего приложения
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        {/* Можно вставить глобальные компоненты, например, навигацию */}
        {children}
    </div>
  );
}