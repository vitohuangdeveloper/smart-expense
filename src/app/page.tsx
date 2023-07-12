'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useGlobalContext } from './context/store'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import checkIcon from '/public/check.png'
import personalFiance from '/public/personal-finance.svg'
import financialManagement from 'public/financial-management.svg'
import holdCoin from 'public/hold-coin.svg'
import capital from 'public/capital.svg'
import cash from 'public/cash.svg'

export default function Home() {
  const { user } = useGlobalContext()

  useEffect(() => {
    if (user) {
      redirect('/dashboard/property')
    }
  }, [user])

  const HOMEPAGE_TITLE = '首頁'

  return (
    <div>
      <div>
        <Header title={HOMEPAGE_TITLE} />
        <Sidebar />
      </div>
      <div className='pt-[145px] pl-[150px] pr-[60px]'>
        <div className='flex justify-between mb-[100px]'>
          <div>
            <h2 className='text-[48px]'>
              <span className='text-primary font-bold'>Smart Expense</span>{' '}
              helps you
            </h2>
            <p className='text-[48px] mb-[30px]'>
              stop living paycheck to paycheck.
            </p>
            <p className='text-textColor mb-[40px]'>
              培養良好的記帳習慣，成為智慧金錢好管家。
            </p>
            <ul className='flex flex-col gap-y-[30px]'>
              <li className='flex items-center gap-x-[30px]'>
                <Image src={checkIcon} alt='check icon' />
                <p className='text-textColor'>聰明記帳不會遺漏。</p>
              </li>
              <li className='flex items-center gap-x-[30px]'>
                <Image src={checkIcon} alt='check icon' />
                <p className='text-textColor'>查詢明細迅速方便。</p>
              </li>
              <li className='flex items-center gap-x-[30px]'>
                <Image src={checkIcon} alt='check icon' />
                <p className='text-textColor'>分析當月收支結餘。</p>
              </li>
              <li className='flex items-center gap-x-[30px]'>
                <Image src={checkIcon} alt='check icon' />
                <p className='text-textColor'>資產趨勢一目了然。</p>
              </li>
            </ul>
          </div>
          <div className='w-[500px] h-auto object-cover'>
            <Image src={financialManagement} alt='business' />
          </div>
        </div>
        <div className='bg-primary flex justify-around items-center rounded-[20px] py-[50px]'>
          <div>
            <p className='text-[32px] text-[#fff] mb-[10px]'>
              Take your finances to the next level!
            </p>
            <p className='text-textColor mb-[30px]'>
              Don&apos;t hesitate, money matters.
            </p>
            <div className='flex gap-x-[15px]'>
              <Image src={capital} alt='capital' />
              <Image src={holdCoin} alt='hold coin' />
              <Image src={cash} alt='cash' />
            </div>
          </div>
          <div className='w-[300px] h-auto object-cover'>
            <Image src={personalFiance} alt='personal finance' />
          </div>
        </div>
      </div>
    </div>
  )
}
