'use client'

import { DocumentData } from 'firebase/firestore'

interface WalletProps {
  account: DocumentData
}

export default function Wallet(props: WalletProps) {
  const { account } = props
  return (
    <div className='flex items-center gap-x-[20px]'>
      <div className='w-[30px] h-[30px] bg-secondGray shadow-md rounded-full'></div>
      <div className='border-b border-dark w-[160px] flex justify-between items-center'>
        <div>
          <p className='text-[18px] whitespace-nowrap'>{account.name}</p>
        </div>
        <p className='text-[18px] whitespace-nowrap'>$ {account.balance}</p>
      </div>
    </div>
  )
}
