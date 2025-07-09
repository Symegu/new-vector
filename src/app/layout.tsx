import './globals.css';
// import { Inter } from 'next/font/google';

// const inter = Inter({ 
//   subsets: ['latin', 'cyrillic'],
//   weight: ['400', '500', '700'],
// });

export const metadata = {
  title: 'Юридическая помощь по банкротству физических лиц',
  description: 'Профессиональная помощь в банкротстве физлиц. Законное списание долгов. Первая консультация бесплатно!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}