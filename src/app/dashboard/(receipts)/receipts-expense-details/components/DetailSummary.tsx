import { DocumentData } from 'firebase/firestore'

interface DetailSummaryProps {
  item: DocumentData
}

export default function ReceiptSummary(props: DetailSummaryProps) {
  const { createdTime, category, amounts, description, account } = props.item
  return (
    <div className='px-[20px] w-full'>
      <div className='bg-secondary flex rounded-[20px] px-[20px] py-[10px]'>
        <div className='flex items-center gap-x-[8px] mr-[130px]'>
          <div className='w-[30px] h-[30px] bg-red rounded-full'></div>
          <div>
            <p className='whitespace-nowrap'>
              <span className='font-medium text-primary'>明細時間</span>：
              {createdTime}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-y-[10px] items-start mr-auto'>
          <div>
            <p>
              <span className='font-medium text-primary'>類別</span>：{category}
            </p>
          </div>
          <div>
            <span className='font-medium text-primary'>明細描述</span>：
            {description}
          </div>
          <div className='flex gap-x-[15px]'>
            <p>
              <span className='font-medium text-primary'>帳戶</span>：{account}
            </p>
          </div>
        </div>
        <p className='whitespace-nowrap'>
          <span className='font-medium text-primary'>金額</span>：$ {amounts}
        </p>
      </div>
    </div>
  )
}
