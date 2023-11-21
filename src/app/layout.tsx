import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'normalize.css/normalize.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '台灣歷年總統 都幾?',
  description: '2023 The F2E 總統即時開票全台地圖',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
