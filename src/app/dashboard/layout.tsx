'use client'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
        theme='light'
        transition={Flip}
        toastClassName={() =>
          'flex bg-white shadow-md rounded-[20px] items-center justify-between w-full'
        }
        bodyClassName={() =>
          'whitespace-nowrap text-dark flex items-center font-medium text-[18px] p-[10px]'
        }
      />
      {children}
    </div>
  )
}
