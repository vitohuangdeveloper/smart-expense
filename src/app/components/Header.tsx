'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGlobalContext } from '@/app/context/store'
import { SiWebmoney } from 'react-icons/si'
import logo from '/public/logo.svg'

interface HeaderProps {
  positionStyle?: string
}

export default function Header(props: HeaderProps) {
  const { positionStyle } = props
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

  return (
    <div className='flex items-center justify-center absolute top-0 right-0 z-10 w-screen h-[80px] border-b border-[#F4F4FC] shadow '>
      <div className='absolute top-[40px] left-[4.1666666667%] translate-y-[-50%]'>
        <Link href='/'>
          <Image src={logo} alt='logo' />
        </Link>
      </div>
      <div className={`flex items-center gap-x-[5px] ${positionStyle}`}>
        <SiWebmoney className='text-primary font-medium' />
        <p className='text-primary text-[20px] font-medium'>Smart Expense</p>
      </div>
      {loading ? (
        <div></div>
      ) : !user ? (
        <div className='absolute top-[40px] right-[4.1666666667%] translate-y-[-50%]'>
          <p className='text-primary cursor-pointer' onClick={handleSignIn}>
            Login
          </p>
        </div>
      ) : (
        <div className='absolute top-[40px] right-[4.1666666667%] translate-y-[-50%]'>
          <p className='cursor-pointer text-primary' onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  )
}
