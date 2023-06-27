'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import Wallet from './components/Wallet'

import addIcon from '/public/add-icon.png'

const ACCOUNT_TITLE = '帳戶'
const UID = 'pUcfmReSPATGfLoDVt1xqSEVoqB2'
const categories = {
  bank: '銀行',
  eTicket: '電子票證',
  manual: '手動新增',
}

function Page() {
  interface MyObject {
    name?: string
    category?: string
    balance?: number
  }
  const [accounts, setAccounts] = useState<MyObject[]>([])

  useEffect(() => {
    const getDocSnap = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', UID, 'accounts')
      )

      const dataArray: MyObject[] = []
      querySnapshot.forEach(doc => {
        dataArray.push(doc.data())
      })
      setAccounts(dataArray)
    }
    getDocSnap()
  }, [])
  return (
    <div>
      <Header title={ACCOUNT_TITLE} />
      <Sidebar />
      <div className='absolute top-[116px] left-[50%] translate-x-[-50%] flex gap-x-[150px]'>
        <div>
          {accounts &&
            accounts
              .filter(account => account.category === categories.bank)
              .map(account => <Wallet key={account.name} account={account} />)}
        </div>
        <div>
          {accounts &&
            accounts
              .filter(account => account.category === categories.eTicket)
              .map(account => <Wallet key={account.name} account={account} />)}
        </div>
        <div>
          {accounts &&
            accounts
              .filter(account => account.category === categories.manual)
              .map(account => <Wallet key={account.name} account={account} />)}
        </div>
        <div className='w-[30px]'>
          {accounts.length ? (
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
