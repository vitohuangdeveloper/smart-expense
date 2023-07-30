import './globals.css'
import { Inter } from 'next/font/google'
import { GlobalContextProvider } from '@/app/context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Smart Expense',
  description: 'Stop living paycheck to paycheck',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='min-w-screen min-h-screen'>
      <body
        className={`${inter.className} bg-gradient-to-t from-secondary via-third to-fifth text-dark scrollbar-hide`}
      >
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}
