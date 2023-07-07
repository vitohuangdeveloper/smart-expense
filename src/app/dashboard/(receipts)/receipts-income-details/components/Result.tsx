import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import DetailSummary from './DetailSummary'
import { useGlobalContext } from '@/app/context/store'

const getIncomeReceipts = (allReceipts: DocumentData[]) => {
  const incomeReceipts = allReceipts.filter(item => item.type === '收入')
  return incomeReceipts
}

const sortIncomeReceipts = (allReceipts: DocumentData[]) => {
  const newAllReceipts = [...allReceipts]
  const sortedNewAllReceipts = newAllReceipts.sort((a, b) =>
    a.createdTime > b.createdTime ? -1 : 1
  )
  return sortedNewAllReceipts
}

export default function Result() {
  const { allAccountsReceipts } = useGlobalContext()
  const flattenedArray = allAccountsReceipts.flat(2)

  const incomeReceipts = getIncomeReceipts(flattenedArray)
  const sortedIncomeReceipts = sortIncomeReceipts(incomeReceipts)

  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] '>
      <div className='flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]'>
        <Link
          href='/dashboard/receipts-income-category'
          className='w-full bg-[#F4F4F4] rounded-tl-[20px] py-[5px] text-center'
        >
          <button>分類</button>
        </Link>
        <Link
          href='/dashboard/receipts-income-details'
          className='w-full bg-[#A8A8A8] rounded-l-[20px] rounded-tr-[20px] py-[5px] text-center'
        >
          <button>明細</button>
        </Link>
      </div>
      <div className='self-start pl-[20px] mb-[20px]'>
        <h2>收入明細</h2>
      </div>
      <div className='w-full max-h-[500px] overflow-auto pb-[30px]'>
        {sortedIncomeReceipts.length &&
          sortedIncomeReceipts.map((item, index) => (
            <DetailSummary key={index} item={item} />
          ))}
      </div>
    </div>
  )
}
