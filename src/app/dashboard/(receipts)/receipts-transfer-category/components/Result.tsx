import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import CategorySummary from './CategorySummary'
import { useGlobalContext } from '../../context/store'

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
    const category: string = record.category
    const amounts: number = record.amounts
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
      length: count,
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
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px]'>
      <div className='flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]'>
        <Link
          href='/dashboard/receipts-transfer-category'
          className='w-full bg-[#A8A8A8] rounded-tl-[20px] rounded-r-[20px] py-[5px] text-center'
        >
          <button>分類</button>
        </Link>
        <Link
          href='/dashboard/receipts-transfer-details'
          className='w-full bg-[#F4F4F4] rounded-tr-[20px] py-[5px] text-center'
        >
          <button>明細</button>
        </Link>
      </div>
      <div className='self-start pl-[20px] mb-[20px]'>
        <h2>轉帳分類</h2>
      </div>
      {results.length &&
        results.map((result, index) => (
          <CategorySummary key={index} result={result} />
        ))}
    </div>
  )
}