'use client'
import Sidebar from '@/app/components/Sidebar'
import Header from '../components/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const positionStyle = 'pl-[150px]'

  return (
    <div>
      <Header positionStyle={positionStyle} />
      <Sidebar />
      {children}
    </div>
  )
}
