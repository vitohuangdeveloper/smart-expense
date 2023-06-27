import Image from 'next/image'
import accountIcon from '/public/account-icon.png'

interface DetailSummaryProps {
  category: string
}

export default function ReceiptSummary(props: DetailSummaryProps) {
  return (
    <div className='px-[20px] w-full mb-[20px] last:mb-0'>
      <div className='bg-[#F4F4F4] flex gap-x-[20px] rounded-[20px] px-[20px] py-[10px]'>
        <div className='flex items-center gap-x-[10px]'>
          <div>
            <Image src={accountIcon} alt='account icon' />
          </div>
          <div>
            <p>6月</p>
            <p className='whitespace-nowrap'>12日</p>
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-[5px]'>
          <div className='flex justify-between'>
            <p>薪資</p>
            <p>$50,000</p>
          </div>
          <div>五月薪資</div>
          <div className='flex gap-x-[15px]'>
            <p className='bg-gray px-[5px] rounded-[10px]'>手動</p>
            <p>需求帳戶</p>
          </div>
        </div>
      </div>
    </div>
  )
}
