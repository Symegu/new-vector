// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
// import { DefaultSeo } from 'next-seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Юридическое сопровождение банкротства физических лиц | СПб',
  description: 'Профессиональная помощь в банкротстве физлиц. Законное списание долгов. Первая консультация бесплатно!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* <DefaultSeo
          title={metadata.title}
          description={metadata.description}
          openGraph={{
            type: 'website',
            locale: 'ru_RU',
            url: process.env.NEXT_PUBLIC_SITE_URL,
            siteName: 'Юридическая помощь по банкротству',
            images: [{
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: 'Банкротство физических лиц',
            }]
          }}
          twitter={{
            cardType: 'summary_large_image',
          }}
        /> */}
        <link rel="icon" href="/favicon-law.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {/* Простой хедер */}
        <header className="bg-blue-800 text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">ЮрБанкрот</h1>
              <p className="text-sm opacity-80">Помощь в банкротстве физлиц</p>
            </div>
            <div>
              <a href="tel:+78121234567" className="text-lg font-semibold">
                +7 (812) 123-45-67
              </a>
            </div>
          </div>
        </header>
        
        {children}
        
        {/* Футер */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">ЮрБанкрот</h3>
                <p>Профессиональное юридическое сопровождение процедуры банкротства физических лиц</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Контакты</h3>
                <p>СПб, Невский пр-т, д. 100</p>
                <p>+7 (812) 123-45-67</p>
                <p>info@ur-bankrot.ru</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Часы работы</h3>
                <p>Пн-Пт: 9:00 - 20:00</p>
                <p>Сб: 10:00 - 18:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-400">
              © {new Date().getFullYear()} ЮрБанкрот. Все права защищены.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}