'use client'
import { useState, useEffect } from 'react'
import { Flip, ToastContainer } from 'react-toastify'
import { redirect } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from '@/app/components/Sidebar'
import Header from '../components/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const positionStyle = 'pl-[150px]'
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useGlobalContext()

  useEffect(() => {
    if (!user && !loading) {
      redirect('/')
    }
  }, [user, loading])

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div>
      <Header positionStyle={positionStyle} />
      <Sidebar />
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Flip}
      />
      {children}
    </div>
  )
}
