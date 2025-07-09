// src/layouts/Layout.tsx
import '@/styles/globals.css';
// Метаданные страницы (используются в Next.js 13+)
export const metadata = {
  title: 'Юридическая помощь по банкротству физических лиц',
  description: 'Профессиональная помощь в банкротстве физлиц. Законное списание долгов. Первая консультация бесплатно!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <head>
        {/* Можно добавить дополнительные мета-теги или шрифты */}
      </head>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}