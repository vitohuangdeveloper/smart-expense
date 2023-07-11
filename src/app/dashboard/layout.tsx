'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useGlobalContext } from '../context/store'
import Sidebar from '@/app/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useGlobalContext()
  useEffect(() => {
    if (!user) {
      redirect('/')
    }
  }, [user])
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  )
}
