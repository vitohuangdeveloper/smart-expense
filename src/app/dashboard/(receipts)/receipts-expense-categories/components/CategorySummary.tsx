import Image from 'next/image'

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
    <div className='px-[20px] w-full'>
      <div className='bg-secondary flex gap-x-[20px] rounded-[20px] px-[20px] py-[10px]'>
        <div className='flex items-center gap-x-[10px]'>
          <div className='w-[30px] h-[30px] bg-red rounded-full'></div>
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
          <div className='bg-secondGray h-[20px] rounded-[20px]'></div>
        </div>
      </div>
    </div>
  )
}
