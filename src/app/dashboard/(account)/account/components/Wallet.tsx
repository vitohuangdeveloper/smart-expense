'use client'
import Image from 'next/image'
import accountIcon from '/public/account-icon.png'

interface WalletProps {
  account: {
    name?: string
    category?: string
    balance?: number
  }
}

export default function Wallet(props: WalletProps) {
  return (
    <div className='flex items-center gap-x-[30px] mb-[10px] last:mb-0'>
      <div>
        <Image src={accountIcon} alt='account icon' priority />
      </div>
      <div className='pb-[15px] border-b border-gray w-[160px]'>
        <p className='text-gray mb-1'>{props.account.category}</p>
        <p>{props.account.name}</p>
      </div>
    </div>
  )
}
