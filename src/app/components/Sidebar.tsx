'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useGlobalContext } from '@/app/context/store'

import logo from '/public/logo.gif'
import profile from '/public/profile.png'

export default function Sidebar() {
  const { user } = useGlobalContext()
  const sidebarContainerStyle = user
    ? 'flex flex-col items-center w-[90px] h-screen fixed left-0 top-0 border-r border-[#fff] bg-[#fff] shadow pb-[60px]'
    : 'flex flex-col items-center w-[90px] h-screen fixed left-0 top-0 border-r border-[#fff] bg-[#fff] shadow pb-[80px]'

  return (
    <div className={sidebarContainerStyle}>
      <Link href='/' className='mb-[80px]'>
        <Image src={logo} alt='logo' className='cursor-pointer' />
      </Link>
      <div className='flex flex-col gap-y-[50px] items-center mb-auto'>
        <Link href='/dashboard/property' className='text-textColor'>
          資產
        </Link>
        <Link
          href='/dashboard/receipts-income-category'
          className='text-textColor'
        >
          明細
        </Link>
        <Link href='/dashboard/category-expense' className='text-textColor'>
          分類
        </Link>
        <Link href='/dashboard/analysis' className='text-textColor'>
          分析
        </Link>
        <Link href='/dashboard/budget' className='text-textColor'>
          預算
        </Link>
      </div>
      <div>
        {user ? (
          <div className='flex flex-col items-center gap-y-[10px]'>
            <div className='border border-[#fff] rounded-full'>
              <Image
                className='rounded-full'
                src={user.photoURL}
                alt='profile'
                priority={false}
                width={35}
                height={35}
              />
            </div>
            <p className='text-textColor text-xs'>{user.displayName}</p>
          </div>
        ) : (
          <div className='border border-[#fff] rounded-full'>
            <Image
              src={profile}
              alt='profile'
              priority={false}
              width={35}
              height={35}
            />
          </div>
        )}
      </div>
    </div>
  )
}
