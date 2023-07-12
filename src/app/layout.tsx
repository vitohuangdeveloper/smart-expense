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
    <html lang='en'>
      <body className={`${inter.className} bg-[#F4F4FC]`}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}
