import { useState, useEffect } from 'react'
import Link from 'next/link'
import Category from './Category'
import categoryIcon from '/public/category-icon.png'
import categoryAddIcon from '/public/category-add-icon.png'
import { getReceiptCategoriesSnap } from '@/app/utils/getDocSnap'

interface TransactionCategoriesObject {
  name?: string
  type?: string
}

export default function Result() {
  const [transactionCategories, setTransactionCategories] = useState<
    TransactionCategoriesObject[]
  >([])

  useEffect(() => {
    getReceiptCategoriesSnap().then(res =>
      setTransactionCategories(res.filter(doc => doc.type === '移轉'))
    )
  }, [])

  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px] mt-[209px]'>
      <div className='flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]'>
        <Link
          href='/dashboard/category-expense'
          className='w-full bg-[#F4F4F4] rounded-tl-[20px] rounded-r-[20px] py-[5px] text-center'
        >
          <button>支出</button>
        </Link>
        <Link
          href='/dashboard/category-income'
          className='w-full bg-[#F4F4F4] py-[5px] text-center border-l'
        >
          <button>收入</button>
        </Link>
        <Link
          href='/dashboard/category-transaction'
          className='w-full bg-[#A8A8A8] rounded-tr-[20px] rounded-l-[20px] py-[5px] text-center'
        >
          <button>移轉</button>
        </Link>
      </div>
      <div className='self-start pl-[20px] mb-[50px]'>
        <h2>移轉分類</h2>
      </div>
      <div className='grid w-full grid-cols-3 gap-y-[90px]'>
        {transactionCategories &&
          transactionCategories.map((transactionCategory, index) => (
            <Category
              key={index}
              src={categoryIcon}
              categoryName={transactionCategory.name}
            />
          ))}
        {transactionCategories.length !== 0 && (
          <Category src={categoryAddIcon} categoryName='新增' />
        )}
      </div>
    </div>
  )
}
