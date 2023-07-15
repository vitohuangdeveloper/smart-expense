import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import { GrAddCircle } from 'react-icons/gr'
import DetailSummary from './DetailSummary'
import { useGlobalContext } from '@/app/context/store'

const getTransactionReceipts = (allReceipts: DocumentData[]) => {
  const transactionReceipts = allReceipts.filter(item => item.type === '轉帳')
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
  const { allAccountsReceipts } = useGlobalContext()
  const flattenedAllAccountsReceipts = allAccountsReceipts.flat(2)
  const transactionReceipts = getTransactionReceipts(
    flattenedAllAccountsReceipts
  )
  const sortedTransactionReceipts = sortTransactionReceipts(transactionReceipts)

  return (
    <div className='pl-[150px]'>
      <div className='flex flex-col items-center w-[900px] min-h-[500px] m-auto bg-white shadow-md rounded-[20px] pb-[30px] relative'>
        <Link
          href='/dashboard/receipts-transfer-add-item'
          className=' absolute top-[75px] right-[20px]'
        >
          <GrAddCircle className='w-[30px] h-auto' />
        </Link>
        <div className='flex bg-secondGray rounded-t-[20px] w-full mb-[25px]'>
          <Link
            href='/dashboard/receipts-transfer-categories'
            className='w-full bg-secondGray text-[20px] rounded-tl-[20px] rounded-r-[20px] py-[10px] text-center'
          >
            <button>分類</button>
          </Link>
          <Link
            href='/dashboard/receipts-transfer-details'
            className='w-full bg-primary text-white text-[20px] rounded-l-[20px] rounded-tr-[20px] py-[10px] text-center'
          >
            <button>明細</button>
          </Link>
        </div>
        <div className='mb-[25px]'>
          <h2 className='text-[18px] font-medium'>轉帳明細</h2>
        </div>
        <div className='flex flex-col gap-y-[25px] w-full max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg pb-[5px]'>
          {sortedTransactionReceipts.length
            ? sortedTransactionReceipts.map((item, index) => (
                <DetailSummary key={index} item={item} />
              ))
            : ''}
        </div>
      </div>
    </div>
  )
}
