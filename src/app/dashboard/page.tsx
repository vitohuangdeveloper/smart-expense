'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import Header from '../components/Header'
import { useGlobalContext } from '../context/store'

const DASHBOARD_TITLE = '儀表板'

export default function Page() {
  const { user } = useGlobalContext()

  useEffect(() => {
    if (user) {
      redirect('/dashboard/property')
    }
  }, [user])

  return (
    <div>
      <Header title={DASHBOARD_TITLE} />
    </div>
  )
}
