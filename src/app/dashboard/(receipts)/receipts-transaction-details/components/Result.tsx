import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import DetailSummary from './DetailSummary'
import { useGlobalContext } from '../../context/store'

const getTransactionReceipts = (allReceipts: DocumentData[]) => {
  const transactionReceipts = allReceipts.filter(item => item.type === '移轉')
  return transactionReceipts
}

const sortTransactionReceipts = (allReceipts: DocumentData[]) => {
  const newAllReceipts = [...allReceipts]
  const sortedNewAllReceipts = newAllReceipts.sort((a, b) =>
    a.createdTime > b.createdTime ? -1 : 1
  )
  return sortedNewAllReceipts
}

export default function Result() {
  const { allReceipts } = useGlobalContext()
  const transactionReceipts = getTransactionReceipts(allReceipts)
  const sortedTransactionReceipts = sortTransactionReceipts(transactionReceipts)

  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px]'>
      <div className='flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]'>
        <Link
          href='/dashboard/receipts-transaction-category'
          className='w-full bg-[#F4F4F4] rounded-tl-[20px] py-[5px] text-center'
        >
          <button>分類</button>
        </Link>
        <Link
          href='/dashboard/receipts-transaction-details'
          className='w-full bg-[#A8A8A8] rounded-l-[20px] rounded-tr-[20px] py-[5px] text-center'
        >
          <button>明細</button>
        </Link>
      </div>
      <div className='self-start pl-[20px] mb-[20px]'>
        <h2>移轉明細</h2>
      </div>
      <div className='w-full max-h-[500px] overflow-auto pb-[30px]'>
        {sortedTransactionReceipts.length &&
          sortedTransactionReceipts.map((item, index) => (
            <DetailSummary key={index} item={item} />
          ))}
      </div>
    </div>
  )
}
