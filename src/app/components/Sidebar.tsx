'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'

import logo from '/public/logo.gif'
import profile from '/public/profile.png'
import property from '/public/property.svg'
import propertySelected from '/public/property-selected.svg'
import receipts from '/public/receipts.svg'
import receiptsSelected from '/public/receipts-selected.svg'
import category from '/public/category.svg'
import categorySelected from '/public/category-selected.svg'
import analysis from '/public/analysis.svg'
import analysisSelected from '/public/analysis-selected.svg'
import budget from '/public/budget.svg'
import budgetSelected from '/public/budget-selected.svg'

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
  const tabStyle = {
    selected: 'text-primary text-[20px] font-medium',
    deselected: 'text-[20px]',
  }
  const sidebarContainerStyle = user
    ? 'flex flex-col items-center w-[150px] h-screen fixed left-0 top-0 border-r border-[#fff] bg-[#fff] shadow pb-[60px]'
    : 'flex flex-col items-center w-[150px] h-screen fixed left-0 top-0 border-r border-[#fff] bg-[#fff] shadow pb-[80px]'

  return (
    <div className={sidebarContainerStyle}>
      <Link href='/' className='mb-[80px]'>
        <Image src={logo} alt='logo' className='cursor-pointer' />
      </Link>
      <div className='flex flex-col gap-y-[50px] items-center mb-auto'>
        <div className='flex items-center gap-x-[20px]'>
          <Image
            src={
              pathname.includes(pathnameObj.property)
                ? propertySelected
                : property
            }
            alt='property'
            className='w-[20px] h-auto'
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
          <Image
            src={
              pathname.includes(pathnameObj.receipts)
                ? receiptsSelected
                : receipts
            }
            alt='receipts'
            className='w-[20px] h-auto'
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
          <Image
            src={
              pathname.includes(pathnameObj.category)
                ? categorySelected
                : category
            }
            alt='category'
            className='w-[20px] h-auto'
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
          <Image
            src={
              pathname.includes(pathnameObj.analysis)
                ? analysisSelected
                : analysis
            }
            alt='analysis'
            className='w-[20px] h-auto'
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
          <Image
            src={
              pathname.includes(pathnameObj.budget) ? budgetSelected : budget
            }
            alt='budget'
            className='w-[20px] h-auto'
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
