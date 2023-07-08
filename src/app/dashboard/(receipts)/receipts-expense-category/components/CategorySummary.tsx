import Image from 'next/image'
import accountIcon from '/public/account-icon.png'

interface ReceiptSummaryProps {
  result: {
    category: string
    percentage: string
    count: number
    amounts: number
  }
}

export default function ReceiptSummary(props: ReceiptSummaryProps) {
  const { category, percentage, count, amounts } = props.result
  return (
    <div className='px-[20px] w-full mb-[20px] last:mb-0'>
      <div className='bg-[#F4F4F4] flex gap-x-[20px] rounded-[20px] px-[20px] py-[10px]'>
        <div className='flex items-center gap-x-[10px]'>
          <div>
            <Image src={accountIcon} alt='account icon' />
          </div>
          <div>
            <p className='whitespace-nowrap'>{category}</p>
            <p>{percentage}</p>
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-[5px]'>
          <div className='flex justify-between'>
            <p>{count}筆明細</p>
            <p>$ {amounts}</p>
          </div>
          <div className='bg-gray h-[20px] rounded-[20px]'></div>
        </div>
      </div>
    </div>
  )
}
