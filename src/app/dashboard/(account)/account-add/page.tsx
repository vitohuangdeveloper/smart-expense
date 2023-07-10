'use client'
import { useState } from 'react'
import Header from '@/app/components/Header'
import Modal from './components/Modal'

const ACCOUNT_ADD_TITLE = '新增帳戶'

function Page() {
  const [addAccount, setAddAccount] = useState<{
    accountName: string
    accountCategory: string
    balance: number | string
  }>({
    accountName: '',
    accountCategory: '',
    balance: '',
  })
  return (
    <div>
      <Header title={ACCOUNT_ADD_TITLE} />
      <Modal addAccount={addAccount} setAddAccount={setAddAccount} />
    </div>
  )
}

export default Page
