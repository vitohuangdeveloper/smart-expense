'use client'

import { DocumentData } from 'firebase/firestore'

interface WalletProps {
  account: DocumentData
  hexCode: string
}

export default function Wallet(props: WalletProps) {
  const { account, hexCode } = props
  return (
    <div className='flex items-center gap-x-[15px]'>
      <div className={`w-[30px] h-[30px] ${hexCode} rounded-full`}></div>
      <div className='border-b border-dark w-[160px] flex justify-between items-center'>
        <div>
          <p className='text-[18px] whitespace-nowrap'>{account.name}</p>
        </div>
        <p className='text-[18px] whitespace-nowrap'>$ {account.balance}</p>
      </div>
    </div>
  )
}
