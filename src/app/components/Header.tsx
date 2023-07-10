'use client'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '@/app/context/store'
import Image from 'next/image'
import profile from '/public/profile.png'

interface HeaderProps {
  title: string
}

export default function Header(props: HeaderProps) {
  const { user, googleSignIn, logOut } = useGlobalContext()
  const [loading, setLoading] = useState(true)

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
      setLoading(false)
    }
    checkAuthentication()
  }, [user])

  console.log(user)
  return (
    <div className='flex items-center absolute top-0 right-0 z-10 w-[calc(100vw_-_90px)] h-[80px] px-[30px] border-b border-[#D9D9D9]'>
      <h1 className='mr-auto'>{props.title}</h1>
      {loading ? null : !user ? (
        <div className='cursor-pointer' onClick={handleSignIn}>
          <Image
            className='rounded-full'
            src={profile}
            alt='profile'
            priority={false}
            width={50}
            height={50}
          />
        </div>
      ) : (
        <div className='flex items-center gap-x-[10px]'>
          <div className='cursor-pointer' onClick={handleSignIn}>
            <Image
              className='rounded-full'
              src={user.photoURL}
              alt='profile'
              priority={false}
              width={50}
              height={50}
            />
          </div>
          <p className='cursor-pointer' onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  )
}
