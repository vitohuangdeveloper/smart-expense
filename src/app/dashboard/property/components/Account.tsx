'use client'

import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import Wallet from './Wallet'
import { useGlobalContext } from '@/app/context/store'
import { GrAddCircle } from 'react-icons/gr'

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
      <div className='flex justify-between'>
        <div className='flex flex-col gap-y-[30px] bg-[#fff] shadow-md p-[20px] rounded-[20px]'>
          <p className='text-[24px] font-medium'>{categories.bank}</p>
          <div className='flex flex-col gap-y-[20px] max-h-[300px] overflow-auto'>
            {allAccounts &&
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
                ))}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-[#fff] shadow-md p-[20px] rounded-[20px]'>
          <p className='text-[24px] font-medium'>{categories.eTicket}</p>
          <div className='flex flex-col gap-y-[20px]'>
            {allAccounts &&
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
                ))}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-[#fff] shadow-md p-[20px] rounded-[20px]'>
          <p className='text-[24px] font-medium'>{categories.manual}</p>
          <div className='flex flex-col gap-y-[20px]'>
            {allAccounts &&
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
                ))}
          </div>
        </div>
        <div className='w-[30px] self-start'>
          <Link href='/dashboard/property/account-add'>
            <GrAddCircle className='w-[30px] h-auto' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Account
