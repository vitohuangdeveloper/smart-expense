'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import Wallet from './Wallet'
import { useGlobalContext } from '@/app/context/store'
import { GrAddCircle } from 'react-icons/gr'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const categories = {
  bank: '銀行',
  eTicket: '電子票證',
  manual: '自訂',
}

function Account() {
  const [loading, setLoading] = useState<boolean>(true)
  const { allAccounts } = useGlobalContext()

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div>
      <h2 className='text-[24px] font-medium mb-[10px] text-center'>帳戶</h2>
      <div className='flex justify-between p-[20px] border-dashed border border-white rounded-[20px] shadow-sm'>
        <div className='flex flex-col gap-y-[30px] bg-white shadow-md w-[293px] p-[30px] rounded-[20px] relative'>
          <Link
            href='/dashboard/property/bank-account-add'
            className=' absolute top-[33px] right-[22px]'
          >
            <GrAddCircle className='w-[25px] h-auto' />
          </Link>
          <div className='flex items-center gap-x-[20px]'>
            <div className='w-[30px] h-[30px] bg-red rounded-full'></div>
            <p className='text-[20px] font-medium'>{categories.bank}</p>
          </div>
          <div className='flex flex-col gap-y-[25px] h-[195px] overflow-auto pr-[15px] scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
            {loading ? (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
              </div>
            ) : allAccounts.length ? (
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.bank
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet key={index} account={account} />
                ))
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-white shadow-md w-[293px] p-[30px] rounded-[20px] relative'>
          <Link
            href='/dashboard/property/eTicket-account-add'
            className=' absolute top-[33px] right-[22px]'
          >
            <GrAddCircle className='w-[25px] h-auto' />
          </Link>
          <div className='flex items-center gap-x-[20px]'>
            <div className='w-[30px] h-[30px] bg-green rounded-full'></div>
            <p className='text-[20px] font-medium'>{categories.eTicket}</p>
          </div>
          <div className='flex flex-col gap-y-[25px] h-[195px] overflow-auto pr-[15px] scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
            {loading ? (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
              </div>
            ) : allAccounts.length ? (
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.eTicket
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet key={index} account={account} />
                ))
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-white shadow-md w-[293px] p-[30px] rounded-[20px] relative'>
          <Link
            href='/dashboard/property/manual-account-add'
            className=' absolute top-[33px] right-[22px]'
          >
            <GrAddCircle className='w-[25px] h-auto' />
          </Link>
          <div className='flex items-center gap-x-[20px]'>
            <div className='w-[30px] h-[30px] bg-yellow rounded-full'></div>
            <p className='text-[20px] font-medium'>{categories.manual}</p>
          </div>
          <div className='flex flex-col gap-y-[25px] h-[195px] overflow-auto pr-[15px] scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
            {loading ? (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
              </div>
            ) : allAccounts.length ? (
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.manual
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet key={index} account={account} />
                ))
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
