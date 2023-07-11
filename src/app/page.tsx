'use client'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useGlobalContext } from './context/store'
import Header from '@/app/components/Header'
import Sidebar from './components/Sidebar'
import Spinner from './components/Spinner'

export default function Home() {
  const { user } = useGlobalContext()

  useEffect(() => {
    if (user) {
      redirect('/dashboard/property')
    }
  }, [user])

  const HOMEPAGE_TITLE = '首頁'

  return (
    <div>
      <Header title={HOMEPAGE_TITLE} />
      <Sidebar />
      <div className='w-full h-screen flex items-center justify-center'>
        {/* {loading ? (
          <Spinner />
        ) : user ? (
          <p>
            Welcome, {user.displayName} - you are logged in to the profile - a
            protected route{' '}
          </p>
        ) : (
          <p>You must be logged in to view this page - protected route</p>
        )} */}
      </div>
    </div>
  )
}
