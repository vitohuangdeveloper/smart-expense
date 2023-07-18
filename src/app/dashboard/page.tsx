'use client'

import { useState, useEffect } from 'react'
import { useGlobalContext } from '@/app/context/store'
import { redirect } from 'next/navigation'

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useGlobalContext()

  useEffect(() => {
    if (loading) return
    if (!user) {
      redirect('/')
    } else if (user) {
      redirect('/dashboard/property')
    }
  }, [user, loading])

  useEffect(() => {
    setLoading(false)
  }, [])

  return <div></div>
}
