'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useGlobalContext } from './context/store'
import Header from './components/Header'
import checkIcon from '/public/check.png'
import personalFiance from '/public/personal-finance.svg'
import financialManagement from 'public/financial-management.svg'
import holdCoin from 'public/hold-coin.svg'
import capital from 'public/capital.svg'
import cash from 'public/cash.svg'

export default function Home() {
  const { user, loading } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (user) {
      router.push('/dashboard/property')
    }
  }, [user, loading, router])

  return (
    !loading && (
      <div>
        <Header />
        <div className='pt-[155px] px-[100px] pb-[40px] sm:px-[4.1666666667%] sm:pt-[70px] sm:pb-[20px]'>
          <div className='flex justify-between mb-[100px] sm:flex-col sm:justify-normal sm:gap-y-[20px] sm:mb-[50px]'>
            <div>
              <h2 className='text-[52px] text-dark sm:text-[24px]'>
                <span className='text-primary font-bold'>Smart Expense</span>{' '}
                helps you
              </h2>
              <p className='text-[52px] mb-[30px] text-dark sm:text-[24px] sm:mb-[20px]'>
                stop living paycheck to paycheck.
              </p>
              <p className='text-primary font-bold text-[30px] mb-[40px] sm:text-base sm:mb-[25px]'>
                培養良好的記帳習慣，成為智慧金錢好管家。
              </p>
              <ul className='flex flex-col gap-y-[25px] sm:gap-y-[15px]'>
                <li className='flex items-center gap-x-[30px] sm:gap-x-[15px]'>
                  <Image src={checkIcon} alt='check icon' className='sm:w-[15px] sm:h-auto sm:object-cover'/>
                  <p className='text-dark text-[24px] sm:text-sm'>聰明記帳不會遺漏。</p>
                </li>
                <li className='flex items-center gap-x-[30px] sm:gap-x-[15px]'>
                  <Image src={checkIcon} alt='check icon' className='sm:w-[15px] sm:h-auto sm:object-cover'/>
                  <p className='text-dark text-[24px] sm:text-sm'>查詢明細迅速方便。</p>
                </li>
                <li className='flex items-center gap-x-[30px] sm:gap-x-[15px]'>
                  <Image src={checkIcon} alt='check icon' className='sm:w-[15px] sm:h-auto sm:object-cover'/>
                  <p className='text-dark text-[24px] sm:text-sm'>分析當月收支結餘。</p>
                </li>
                <li className='flex items-center gap-x-[30px] sm:gap-x-[15px]'>
                  <Image src={checkIcon} alt='check icon' className='sm:w-[15px] sm:h-auto sm:object-cover'/>
                  <p className='text-dark text-[24px] sm:text-sm'>資產趨勢一目了然。</p>
                </li>
              </ul>
            </div>
            <div className='w-[500px] h-auto object-cover sm:w-full '>
              <Image src={financialManagement} alt='business' />
            </div>
          </div>
          <div className='bg-[#576bac] flex justify-around items-center rounded-[20px] py-[50px] sm:flex-col sm:justify-normal sm:py-6 sm:px-4 sm:gap-y-2'>
            <div className='sm:flex sm:flex-col'>
              <p className='text-[40px] text-[#fff] mb-[10px] sm:text-lg sm:font-medium sm:mb-2 sm:whitespace-nowrap'>
                Take your finances to the next level!
              </p>
              <p className='text-[#fff] mb-[30px] sm:text-sm sm:mb-5'>
                Don&apos;t hesitate, money matters.
              </p>
              <div className='flex gap-x-[15px] sm:self-center'>
                <Image src={capital} alt='capital' className='sm:w-5 sm:h-auto sm:object-cover'/>
                <Image src={holdCoin} alt='hold coin' className='sm:w-5 sm:h-auto sm:object-cover'/>
                <Image src={cash} alt='cash' className='sm:w-5 sm:h-auto sm:object-cover'/>
              </div>
            </div>
            <div className='w-[300px] h-auto object-cover sm:w-60 sm:h-auto'>
              <Image src={personalFiance} alt='personal finance' />
            </div>
          </div>
        </div>
      </div>
    )
  )
}
