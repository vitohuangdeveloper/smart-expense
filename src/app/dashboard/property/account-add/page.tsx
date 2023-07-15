'use client'
import { useState } from 'react'
import Modal from './components/Modal'

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
      <Modal addAccount={addAccount} setAddAccount={setAddAccount} />
    </div>
  )
}

export default Page
