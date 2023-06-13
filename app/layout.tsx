import './globals.css'
import Navbar from '@/components/layout/Navbar/Navbar';
import { Karma } from 'next/font/google';

const karma = Karma({ subsets: ['latin'], weight: ['400', '600', '700']})

export const metadata = {
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
      <body className={karma.className}>
        <Navbar />  
        {children}
      </body>
    </html>
  )
}
