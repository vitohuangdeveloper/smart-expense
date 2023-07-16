'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GrAddCircle } from 'react-icons/gr'
import Category from './Category'

const getBgColor = (index: number) => {
  if ((index + 3) % 3 === 0) {
    return 'bg-red'
  } else if ((index + 3) % 3 === 1) {
    return 'bg-green'
  } else if ((index + 3) % 3 === 2) {
    return 'bg-yellow'
  }
}

export default function Result() {
  const [loading, setLoading] = useState<boolean>(true)
  const { receiptCategories } = useGlobalContext()
  const incomeCategories = receiptCategories.filter(
    (receiptCategory: DocumentData) => receiptCategory.type === '收入'
  )

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className='pl-[150px] pt-[180px]'>
      <div className='flex flex-col items-center max-w-[900px] h-[572px] m-auto bg-white shadow-md rounded-[20px] pb-[50px] relative'>
        <div className='flex bg-secondGray rounded-t-[20px] w-full mb-[50px]'>
          <Link
            href='/dashboard/category-expense'
            className='w-full bg-secondGray py-[10px] text-[20px] text-center rounded-tl-[20px]'
          >
            <button>支出</button>
          </Link>
          <Link
            href='/dashboard/category-income'
            className='w-full bg-primary text-white text-[20px] rounded-[20px] py-[10px] text-center'
          >
            <button>收入</button>
          </Link>
          <Link
            href='/dashboard/category-transfer'
            className='w-full bg-secondGray rounded-tr-[20px] py-[10px] text-[20px] text-center'
          >
            <button>轉帳</button>
          </Link>
        </div>
        <div className='grid w-full grid-cols-3 gap-y-[90px] max-h-[450px] overflow-auto scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg pb-[5px]'>
          {loading ? (
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
            </div>
          ) : incomeCategories.length ? (
            incomeCategories.map(
              (incomeCategory: DocumentData, index: number) => (
                <Category
                  key={index}
                  categoryName={incomeCategory.name}
                  bgColor={getBgColor(index)}
                />
              )
            )
          ) : (
            ''
          )}
          {loading ? (
            ''
          ) : (
            <div className='flex flex-col items-center cursor-pointer'>
              <Link href='/dashboard/category-expense-add-item'>
                <GrAddCircle className='w-[55px] h-auto object-cover text-dark' />
              </Link>
              <p>新增</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
