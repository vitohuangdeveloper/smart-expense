import Image from 'next/image'
import accountIcon from '/public/account-icon.png'

interface ReceiptSummaryProps {
  category: string
}

export default function ReceiptSummary(props: ReceiptSummaryProps) {
  return (
    <div className='px-[20px] w-full mb-[20px] last:mb-0'>
      <div className='bg-[#F4F4F4] flex gap-x-[20px] rounded-[20px] px-[20px] py-[10px]'>
        <div className='flex items-center gap-x-[10px]'>
          <div>
            <Image src={accountIcon} alt='account icon' />
          </div>
          <div>
            <p className='whitespace-nowrap'>{props.category}</p>
            <p>98.2%</p>
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-[5px]'>
          <div className='flex justify-between'>
            <p>3筆明細</p>
            <p>$50,000</p>
          </div>
          <div className='bg-gray h-[20px] rounded-[20px]'></div>
        </div>
      </div>
    </div>
  )
}
