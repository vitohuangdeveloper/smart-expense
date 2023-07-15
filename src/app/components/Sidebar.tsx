'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import logo from '/public/logo.svg'

import profile from '/public/profile.png'
import { GiReceiveMoney } from 'react-icons/gi'
import { IoReceiptSharp } from 'react-icons/io5'
import { BiSolidCategory } from 'react-icons/bi'
import { AiOutlineLineChart } from 'react-icons/ai'
import { RiMoneyEuroCircleFill } from 'react-icons/ri'

export default function Sidebar() {
  const { user } = useGlobalContext()
  const pathname = usePathname()
  const pathnameObj = {
    property: 'property',
    receipts: 'receipts',
    category: 'category',
    analysis: 'analysis',
    budget: 'budget',
  }

  const iconStyle = {
    selected: 'w-[20px] h-auto text-primary',
    deselected: 'w-[20px] h-auto',
  }

  const tabStyle = {
    selected: 'text-primary text-[20px] font-medium',
    deselected: 'text-[20px]',
  }
  const sidebarContainerStyle = user
    ? 'flex flex-col items-center w-[150px] h-screen fixed left-0 top-0 border-r border-white bg-white shadow pb-[60px] pt-[25px] z-20'
    : 'flex flex-col items-center w-[150px] h-screen fixed left-0 top-0 border-r border-white bg-white shadow pb-[80px] pt-[25px] z-20'

  return (
    <div className={sidebarContainerStyle}>
      <div className='flex flex-col gap-y-[120px] items-center mb-auto'>
        <div>
          <h1>
            <Image src={logo} alt='logo' />
          </h1>
        </div>
        <div className='flex flex-col gap-y-[50px]'>
          <div className='flex items-center gap-x-[20px]'>
            <GiReceiveMoney
              className={
                pathname.includes(pathnameObj.property)
                  ? iconStyle.selected
                  : iconStyle.deselected
              }
            />
            <Link
              href='/dashboard/property'
              className={
                pathname.includes(pathnameObj.property)
                  ? tabStyle.selected
                  : tabStyle.deselected
              }
            >
              資產
            </Link>
          </div>
          <div className='flex items-center gap-x-[20px]'>
            <IoReceiptSharp
              className={
                pathname.includes(pathnameObj.receipts)
                  ? iconStyle.selected
                  : iconStyle.deselected
              }
            />
            <Link
              href='/dashboard/receipts-expense-categories'
              className={
                pathname.includes(pathnameObj.receipts)
                  ? tabStyle.selected
                  : tabStyle.deselected
              }
            >
              明細
            </Link>
          </div>
          <div className='flex items-center gap-x-[20px]'>
            <BiSolidCategory
              className={
                pathname.includes(pathnameObj.category)
                  ? iconStyle.selected
                  : iconStyle.deselected
              }
            />
            <Link
              href='/dashboard/category-expense'
              className={
                pathname.includes(pathnameObj.category)
                  ? tabStyle.selected
                  : tabStyle.deselected
              }
            >
              分類
            </Link>
          </div>
          <div className='flex items-center gap-x-[20px]'>
            <AiOutlineLineChart
              className={
                pathname.includes(pathnameObj.analysis)
                  ? iconStyle.selected
                  : iconStyle.deselected
              }
            />
            <Link
              href='/dashboard/analysis'
              className={
                pathname.includes(pathnameObj.analysis)
                  ? tabStyle.selected
                  : tabStyle.deselected
              }
            >
              分析
            </Link>
          </div>
          <div className='flex items-center gap-x-[20px]'>
            <RiMoneyEuroCircleFill
              className={
                pathname.includes(pathnameObj.budget)
                  ? iconStyle.selected
                  : iconStyle.deselected
              }
            />
            <Link
              href='/dashboard/budget'
              className={
                pathname.includes(pathnameObj.budget)
                  ? tabStyle.selected
                  : tabStyle.deselected
              }
            >
              預算
            </Link>
          </div>
        </div>
      </div>
      <div>
        {user ? (
          <div className='flex flex-col items-center gap-y-[10px]'>
            <div className='border border-[#fff] rounded-full'>
              <Image
                className='rounded-full'
                src={user.photoURL ? user.photoURL : profile}
                alt='profile'
                priority={false}
                width={35}
                height={35}
              />
            </div>
            <p className='text-xs'>{user.displayName}</p>
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
