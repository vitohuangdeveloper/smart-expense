'use client'
import Image from 'next/image'
import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import Header from '@/app/components/Header'
import Wallet from './components/Wallet'
import { useGlobalContext } from '@/app/context/store'

import addIcon from '/public/add-icon.png'

const ACCOUNT_TITLE = '帳戶'
const categories = {
  bank: '銀行',
  eTicket: '電子票證',
  manual: '手動新增',
}

function Page() {
  const { allAccounts } = useGlobalContext()

  return (
    <div>
      <Header title={ACCOUNT_TITLE} />
      <div className='absolute top-[116px] left-[50%] translate-x-[-50%] flex gap-x-[150px]'>
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
            <Link href='/dashboard/account-add'>
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

export default Page
