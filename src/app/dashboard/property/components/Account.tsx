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
        <div>
          {allAccounts &&
            allAccounts
              .filter(
                (account: DocumentData) => account.category === categories.bank
              )
              .map((account: DocumentData, index: number) => (
                <Wallet key={index} account={account} />
              ))}
        </div>
        <div>
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
        <div>
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
