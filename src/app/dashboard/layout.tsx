'use client'
import { useEffect } from 'react'
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
  const isLogoStyle = 'hidden'

  const { user, loading } = useGlobalContext()

  useEffect(() => {
    if (loading) return
    if (!user) {
      redirect('/')
    }
  }, [user, loading])

  return (
    <div>
      <Header positionStyle={positionStyle} isLogoStyle={isLogoStyle} />
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
