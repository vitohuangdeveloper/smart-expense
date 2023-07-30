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
import { RxCross2 } from 'react-icons/rx'

export default function Sidebar() {
  const { user, isSidebar, setIsSidebar } = useGlobalContext()
  const pathname = usePathname()
  const pathnameObj = {
    property: 'property',
    receipts: 'receipts',
    category: 'category',
    analysis: 'analysis',
    budget: 'budget',
  }

  const iconStyle = {
    selected: 'w-[20px] h-auto text-primary sm:w-4',
    deselected: 'w-[20px] h-auto sm:w-4',
  }

  const tabStyle = {
    selected: 'text-primary text-[20px] font-medium sm:text-base',
    deselected: 'text-[20px] sm:text-base',
  }
  const sidebarContainerStyle = user
    ? 'flex flex-col items-center w-[150px] min-h-screen fixed left-0 top-0 border-r border-white bg-white shadow pb-[60px] pt-[25px] z-20 sm:pt-[12.5px] sm:w-fit sm:p-0 sm:items-center sm:px-8'
    : 'flex flex-col items-center w-[150px] min-h-screen fixed left-0 top-0 border-r border-white bg-white shadow pb-[80px] pt-[25px] z-20 sm:pt-[12.5px] sm:w-fit sm:p-0 sm:items-center sm:px-8'

  const isSidebarStyle = isSidebar ? 'sm:left-0' : 'sm:left-[-100%]'

  const handleClick = () => {
    setIsSidebar(false)
  }

  return (
    <div
      className={`${sidebarContainerStyle} ${isSidebarStyle} transition-all`}
    >
      <RxCross2
        className='hidden sm:block sm:text-sm sm:font-medium sm:cursor-pointer sm:w-fit sm:h-auto sm:absolute sm:top-2 sm:right-2 '
        onClick={handleClick}
      />
      <div className='flex flex-col gap-y-[120px] items-center mb-auto sm:self-start sm:w-full'>
        <div className='sm:self-start'>
          <h1>
            <Link href='/' className='cursor-pointer'>
              <Image src={logo} alt='logo' className='sm:w-[30px] sm:h-auto' />
            </Link>
          </h1>
        </div>
        <div className='flex flex-col gap-y-[50px] sm:w-full'>
          <div>
            <Link
              href='/dashboard/property'
              className='flex items-center gap-x-[25px]'
            >
              <GiReceiveMoney
                className={
                  pathname.includes(pathnameObj.property)
                    ? iconStyle.selected
                    : iconStyle.deselected
                }
              />
              <p
                className={
                  pathname.includes(pathnameObj.property)
                    ? tabStyle.selected
                    : tabStyle.deselected
                }
              >
                資產
              </p>
            </Link>
          </div>
          <div>
            <Link
              href='/dashboard/receipts-expense-categories'
              className='flex items-center gap-x-[25px]'
            >
              <IoReceiptSharp
                className={
                  pathname.includes(pathnameObj.receipts)
                    ? iconStyle.selected
                    : iconStyle.deselected
                }
              />
              <p
                className={
                  pathname.includes(pathnameObj.receipts)
                    ? tabStyle.selected
                    : tabStyle.deselected
                }
              >
                明細
              </p>
            </Link>
          </div>
          <div>
            <Link
              href='/dashboard/category-expense'
              className='flex items-center gap-x-[25px]'
            >
              <BiSolidCategory
                className={
                  pathname.includes(pathnameObj.category)
                    ? iconStyle.selected
                    : iconStyle.deselected
                }
              />
              <p
                className={
                  pathname.includes(pathnameObj.category)
                    ? tabStyle.selected
                    : tabStyle.deselected
                }
              >
                分類
              </p>
            </Link>
          </div>
          <div>
            <Link
              href='/dashboard/analysis'
              className='flex items-center gap-x-[25px]'
            >
              <AiOutlineLineChart
                className={
                  pathname.includes(pathnameObj.analysis)
                    ? iconStyle.selected
                    : iconStyle.deselected
                }
              />
              <p
                className={
                  pathname.includes(pathnameObj.analysis)
                    ? tabStyle.selected
                    : tabStyle.deselected
                }
              >
                分析
              </p>
            </Link>
          </div>
          <div>
            <Link
              href='/dashboard/budget'
              className='flex items-center gap-x-[25px]'
            >
              <RiMoneyEuroCircleFill
                className={
                  pathname.includes(pathnameObj.budget)
                    ? iconStyle.selected
                    : iconStyle.deselected
                }
              />
              <p
                className={
                  pathname.includes(pathnameObj.budget)
                    ? tabStyle.selected
                    : tabStyle.deselected
                }
              >
                預算
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div>
        {user ? (
          <div className='flex flex-col items-center gap-y-[10px]'>
            <div className='border border-[#fff] rounded-full sm:w-6 sm:h-auto sm:object-cover'>
              <Image
                className='rounded-full'
                src={user.photoURL ? user.photoURL : profile}
                alt='profile'
                priority={false}
                width={35}
                height={35}
              />
            </div>
            <p className='text-xs sm:text-center'>{user.displayName}</p>
          </div>
        ) : (
          <div className='border border-[#fff] rounded-full sm:w-6 sm:h-auto sm:object-cover'>
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
