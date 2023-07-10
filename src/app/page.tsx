'use client'
import { useState, useEffect } from 'react'
import { useGlobalContext } from './context/store'
import Header from '@/app/components/Header'
import Spinner from './components/Spinner'

export default function Home() {
  const { user } = useGlobalContext()
  const [loading, setLoading] = useState(true)

  const HOMEPAGE_TITLE = '首頁'

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
      setLoading(false)
    }
    checkAuthentication()
  }, [user])
  return (
    <div>
      <Header title={HOMEPAGE_TITLE} />
      <div className='w-full h-screen flex items-center justify-center'>
        {loading ? (
          <Spinner />
        ) : user ? (
          <p>
            Welcome, {user.displayName} - you are logged in to the profile - a
            protected route{' '}
          </p>
        ) : (
          <p>You must be logged in to view this page - protected route</p>
        )}
      </div>
    </div>
  )
}
