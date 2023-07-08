import Image from 'next/image'
import { DocumentData } from 'firebase/firestore'
import accountIcon from '/public/account-icon.png'

interface DetailSummaryProps {
  item: DocumentData
}

export default function ReceiptSummary(props: DetailSummaryProps) {
  const { createdTime, category, amounts, description, account } = props.item
  const splittedCreatedTimeArray = createdTime.split('-')
  const year = splittedCreatedTimeArray[0]
  const month = splittedCreatedTimeArray[1]
  const date = splittedCreatedTimeArray[2]
  return (
    <div className='px-[20px] w-full mb-[20px] last:mb-0'>
      <div className='bg-[#F4F4F4] flex gap-x-[20px] rounded-[20px] px-[20px] py-[10px]'>
        <div className='flex items-center gap-x-[10px]'>
          <div>
            <Image src={accountIcon} alt='account icon' />
          </div>
          <div className='flex flex-col items-center'>
            <p>{year}</p>
            <p>{month}月</p>
            <p className='whitespace-nowrap'>{date}日</p>
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-[5px]'>
          <div className='flex justify-between'>
            <p>{category}</p>
            <p>$ {amounts}</p>
          </div>
          <div>{description}</div>
          <div className='flex gap-x-[15px]'>
            <p>{account}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
