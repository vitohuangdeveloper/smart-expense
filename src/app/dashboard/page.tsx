'use client'

import { useEffect } from 'react'
import { useGlobalContext } from '@/app/context/store'
import { redirect } from 'next/navigation'

export default function Page() {
  const { user, loading } = useGlobalContext()

  useEffect(() => {
    if (loading) return
    if (!user) {
      redirect('/')
    } else if (user) {
      redirect('/dashboard/property')
    }
  }, [user, loading])

  return <div></div>
}
