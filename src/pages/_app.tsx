// pages/_app.tsx
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/layouts/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  // Можно обернуть все страницы в Layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}