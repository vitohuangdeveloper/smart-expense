'use client'
import Image from 'next/image'
import accountIcon from '/public/account-icon.png'
import { DocumentData } from 'firebase/firestore'

interface WalletProps {
  account: DocumentData
}

export default function Wallet(props: WalletProps) {
  const { account } = props
  return (
    <div className='flex items-center gap-x-[15px]'>
      <div>
        <Image src={accountIcon} alt='account icon' priority />
      </div>
      <div className='border-b border-dark w-[160px] flex justify-between items-center'>
        <div>
          <p className='text-[18px] whitespace-nowrap'>{account.name}</p>
        </div>
        <p className='text-[18px] whitespace-nowrap'>$ {account.balance}</p>
      </div>
    </div>
  )
}
