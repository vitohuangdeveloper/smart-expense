'use client'

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

const hexCodeObj = {
  bank: 'bg-[#FA4778]',
  eTicket: 'bg-[#2BDE73]',
  manual: 'bg-[#FFE812]',
}

function Account() {
  const { allAccounts } = useGlobalContext()

  return (
    <div>
      <h2 className='text-[30px] font-medium mb-[10px] text-center'>帳戶</h2>
      <div className='flex justify-between p-[20px] border-dashed border border-white rounded-[20px] shadow-sm'>
        <div className='flex flex-col gap-y-[30px] bg-white shadow-md w-[293px] p-[30px] rounded-[20px] relative'>
          <Link
            href='/dashboard/property/bank-account-add'
            className=' absolute top-[35px] right-[22px]'
          >
            <GrAddCircle className='w-[25px] h-auto' />
          </Link>
          <p className='text-[24px] font-medium'>{categories.bank}</p>
          <div className='flex flex-col gap-y-[25px] h-[195px] overflow-auto pr-[15px] scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
            {allAccounts.length ? (
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.bank
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet
                    key={index}
                    account={account}
                    hexCode={hexCodeObj.bank}
                  />
                ))
            ) : (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-white shadow-md w-[293px] p-[30px] rounded-[20px] relative'>
          <Link
            href='/dashboard/property/eTicket-account-add'
            className=' absolute top-[35px] right-[22px]'
          >
            <GrAddCircle className='w-[25px] h-auto' />
          </Link>
          <p className='text-[24px] font-medium'>{categories.eTicket}</p>
          <div className='flex flex-col gap-y-[25px] h-[195px] overflow-auto pr-[15px] scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
            {allAccounts.length ? (
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.eTicket
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet
                    key={index}
                    account={account}
                    hexCode={hexCodeObj.eTicket}
                  />
                ))
            ) : (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-white shadow-md w-[293px] p-[30px] rounded-[20px] relative'>
          <Link
            href='/dashboard/property/manual-account-add'
            className=' absolute top-[35px] right-[22px]'
          >
            <GrAddCircle className='w-[25px] h-auto' />
          </Link>
          <p className='text-[24px] font-medium'>{categories.manual}</p>
          <div className='flex flex-col gap-y-[25px] h-[195px] overflow-auto pr-[15px] scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>
            {allAccounts.length ? (
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.manual
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet
                    key={index}
                    account={account}
                    hexCode={hexCodeObj.manual}
                  />
                ))
            ) : (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
