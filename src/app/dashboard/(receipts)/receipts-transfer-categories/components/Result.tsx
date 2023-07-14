import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import { GrAddCircle } from 'react-icons/gr'
import CategorySummary from './CategorySummary'
import { useGlobalContext } from '@/app/context/store'

type NumberObject = {
  [key: string]: number
}

const getTransactionReceipts = (allReceipts: DocumentData[]) => {
  const transactionReceipts = allReceipts.filter(item => item.type === '轉帳')
  return transactionReceipts
}

const getTotalAmountsForEachCategory = (data: DocumentData[]) => {
  const categoryTotals: NumberObject = {}
  const categoryCounts: NumberObject = {}
  for (let i = 0; i < data.length; i++) {
    const record = data[i]
    const { category, amounts } = record
    if (category in categoryTotals) {
      categoryTotals[category] += amounts
      categoryCounts[category] += 1
    } else {
      categoryTotals[category] = amounts
      categoryCounts[category] = 1
    }
  }

  return [categoryTotals, categoryCounts]
}

const getResults = (
  categoryTotals: NumberObject,
  categoryCounts: NumberObject
) => {
  const totalAmounts = Object.values(categoryTotals).reduce(
    (acc, cur) => acc + cur,
    0
  )
  const results = []
  for (const category in categoryTotals) {
    const amounts = categoryTotals[category]
    const count = categoryCounts[category]
    const percentage = ((amounts / totalAmounts) * 100).toFixed(0) + '%'
    results.push({
      category,
      percentage,
      count,
      amounts,
    })
  }
  return results
}

export default function Result() {
  const { allAccountsReceipts } = useGlobalContext()
  const flattenedAllAccountsReceipts = allAccountsReceipts.flat(2)
  const transactionReceipts = getTransactionReceipts(
    flattenedAllAccountsReceipts
  )
  const [categoryTotals, categoryCounts] =
    getTotalAmountsForEachCategory(transactionReceipts)
  const results = getResults(categoryTotals, categoryCounts)
  return (
    <div className='pl-[150px]'>
      <div className='flex flex-col items-center max-w-[900px] min-h-[500px] m-auto bg-white rounded-[20px] pb-[30px] relative shadow-md'>
        <Link
          href='/dashboard/receipts-transfer-add-item'
          className=' absolute top-[75px] right-[20px]'
        >
          <GrAddCircle className='w-[30px] h-auto' />
        </Link>
        <div className='flex bg-secondGray rounded-t-[20px] w-full mb-[25px]'>
          <Link
            href='/dashboard/receipts-transfer-categories'
            className='w-full bg-primary text-[#fff] text-[20px] rounded-tl-[20px] rounded-r-[20px] py-[10px] text-center'
          >
            <button>分類</button>
          </Link>
          <Link
            href='/dashboard/receipts-transfer-details'
            className='w-full bg-secondGray text-[20px] rounded-tr-[20px] py-[10px] text-center'
          >
            <button>明細</button>
          </Link>
        </div>
        <div className='mb-[25px]'>
          <h2 className='text-[18px] font-medium'>轉帳分類</h2>
        </div>
        <div className='flex flex-col gap-y-[25px] w-full max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg pb-[5px]'>
          {results.length
            ? results.map((result, index) => (
                <CategorySummary key={index} result={result} />
              ))
            : ''}
        </div>
      </div>
    </div>
  )
}
