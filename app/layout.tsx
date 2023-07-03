import './globals.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import { Karma } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

const karma = Karma({ subsets: ['latin'], weight: ['400', '600', '700']})

export const metadata: Metadata = {
  title: 'Shaynlink\' technoveille',
  description: 'Some technology news watching by shaynlink',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/api/news" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={[karma.className, 'bg-gray-100'].join(' ')}>
        <Navbar />  
        {children}
        <Analytics />
      </body>
    </html>
  )
}
