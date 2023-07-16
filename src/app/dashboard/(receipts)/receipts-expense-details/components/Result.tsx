'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import { GrAddCircle } from 'react-icons/gr'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useGlobalContext } from '@/app/context/store'
import DetailSummary from './DetailSummary'

const getExpenseReceipts = (allReceipts: DocumentData[]) => {
  const expenseReceipts = allReceipts.filter(item => item.type === '支出')
  return expenseReceipts
}

const sortExpenseReceipts = (allReceipts: DocumentData[]) => {
  const newAllReceipts = [...allReceipts]
  const sortedNewAllReceipts = newAllReceipts.sort((a, b) =>
    a.createdTime > b.createdTime ? -1 : 1
  )
  return sortedNewAllReceipts
}

export default function Result() {
  const [loading, setLoading] = useState<boolean>(true)
  const { allAccountsReceipts } = useGlobalContext()
  const flattenedAllAccountsReceipts = allAccountsReceipts.flat(2)
  const expenseReceipts = getExpenseReceipts(flattenedAllAccountsReceipts)
  const sortedExpenseReceipts = sortExpenseReceipts(expenseReceipts)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className='pl-[150px]'>
      <div className='flex flex-col items-center w-[900px] min-h-[500px] m-auto bg-white shadow-md rounded-[20px] pb-[30px] relative'>
        <Link
          href='/dashboard/receipts-expense-add-item'
          className=' absolute top-[80px] right-[20px]'
        >
          <GrAddCircle className='w-[25px] h-auto' />
        </Link>
        <div className='flex bg-secondGray rounded-t-[20px] w-full mb-[25px]'>
          <Link
            href='/dashboard/receipts-expense-categories'
            className='w-full bg-secondGray text-[20px] rounded-tl-[20px] rounded-r-[20px] py-[10px] text-center'
          >
            <button>分類</button>
          </Link>
          <Link
            href='/dashboard/receipts-expense-details'
            className='w-full bg-primary text-white text-[20px] rounded-l-[20px] rounded-tr-[20px] py-[10px] text-center'
          >
            <button>明細</button>
          </Link>
        </div>
        <div className='mb-[25px]'>
          <h2 className='text-[24px] font-medium'>支出明細</h2>
        </div>
        <div className='flex flex-col gap-y-[25px] w-full h-[450px] overflow-auto scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg pb-[5px]'>
          {loading ? (
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
            </div>
          ) : sortedExpenseReceipts.length ? (
            sortedExpenseReceipts.map((item, index) => (
              <DetailSummary key={index} item={item} />
            ))
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
