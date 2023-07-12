'use client'
import Image from 'next/image'
import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import Wallet from './Wallet'
import { useGlobalContext } from '@/app/context/store'

import addIcon from '/public/add-icon.png'

const categories = {
  bank: '銀行',
  eTicket: '電子票證',
  manual: '手動新增',
}

function Account() {
  const { allAccounts } = useGlobalContext()

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-y-[30px] bg-[#fff] shadow-md p-[20px] rounded-[20px]'>
          <p className='text-[24px] text-primary font-medium'>
            {categories.bank}
          </p>
          <div className='flex flex-col gap-y-[20px]'>
            {allAccounts &&
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.bank
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet key={index} account={account} />
                ))}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-[#fff] shadow-md p-[20px] rounded-[20px]'>
          <p className='text-[24px] text-primary font-medium'>
            {categories.eTicket}
          </p>
          <div className='flex flex-col gap-y-[20px]'>
            {allAccounts &&
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.eTicket
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet key={index} account={account} />
                ))}
          </div>
        </div>
        <div className='flex flex-col gap-y-[30px] bg-[#fff] shadow-md p-[20px] rounded-[20px]'>
          <p className='text-[24px] text-primary font-medium'>
            {categories.manual}
          </p>
          <div className='flex flex-col gap-y-[20px]'>
            {allAccounts &&
              allAccounts
                .filter(
                  (account: DocumentData) =>
                    account.category === categories.manual
                )
                .map((account: DocumentData, index: number) => (
                  <Wallet key={index} account={account} />
                ))}
          </div>
        </div>
        <div className='w-[30px]'>
          {allAccounts.length ? (
            <Link href='/dashboard/property/account-add'>
              <Image
                src={addIcon}
                alt='add icon'
                className='w-full cursor-pointer'
              />
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Account
