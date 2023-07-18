'use client'

import { useState, useEffect } from 'react'
import { useGlobalContext } from '@/app/context/store'
import { useRouter, redirect } from 'next/navigation'

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!user && !loading) {
      redirect('/')
    } else if (user) {
      redirect('/dashboard/property')
    }
  }, [user, loading, router])

  return <div></div>
}
