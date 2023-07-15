'use client'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { setDoc, doc, collection, DocumentData } from 'firebase/firestore'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import { useGlobalContext } from '@/app/context/store'
import { db } from '@/app/lib/firebase'

export default function Page() {
  const { uid, setReceiptCategories } = useGlobalContext()
  const [category, setCategory] = useState({
    name: '',
    type: '支出',
  })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setCategory(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const addCategory = async () => {
    if (!category.name || !category.type) return
    try {
      const categoryRef = doc(collection(db, 'users', uid, 'receiptCategories'))
      await setDoc(categoryRef, {
        name: category.name,
        type: category.type,
      })
      console.log('Document written with ID: ', categoryRef)
    } catch (error) {
      console.log('Error adding document ', error)
    }
  }

  const syncCategoryDisplayed = () => {
    if (!category.name || !category.type) return
    setReceiptCategories((prev: DocumentData[]) => [
      ...prev,
      {
        name: category.name,
        type: category.type,
      },
    ])
  }

  const resetCategoryField = () => {
    if (!category.name || !category.type) return
    setCategory({
      name: '',
      type: '',
    })
  }

  return (
    <div className='pl-[150px] pt-[180px]'>
      <form className='flex flex-col max-w-[600px] min-h-[500px] m-auto bg-white rounded-[20px] px-[40px] shadow-md pt-[40px] pb-[85px] relative'>
        <div className='px-[20px] flex justify-between w-full mb-[30px]'>
          <Link href='/dashboard/category-expense'>
            <RxCross2 className='absolute top-[20px] right-[20px] text-[20px] font-medium cursor-pointer' />
          </Link>
        </div>
        <div>
          <h2 className='text-center text-[24px] font-medium mb-[30px]'>
            新增支出分類
          </h2>
        </div>
        <div className='flex flex-col justify-center border-b mb-[60px]'>
          <label
            htmlFor='name'
            className='text-[20px] text-primary font-medium'
          >
            分類名稱
          </label>
          <input
            id='name'
            name='name'
            value={category.name}
            onChange={handleChange}
            className='outline-0 bg-[transparent] text-[18px] placeholder:text-gray'
            placeholder='請輸入分類名稱'
          />
        </div>
        <div className='flex flex-col justify-center border-b mb-[100px]'>
          <label
            htmlFor='type'
            className='text-[20px] text-primary font-medium'
          >
            帳戶類別
          </label>
          <select
            id='type'
            name='type'
            value={category.type}
            onChange={handleChange}
            className='outline-none bg-[transparent] text-[18px] appearance-none cursor-pointer'
          >
            <option>{category.type}</option>
          </select>
        </div>
        <div className='text-center'>
          <button
            className='bg-primary text-white text-[20px] rounded-full w-[150px] py-[10px]'
            onClick={event => {
              handleClick(event)
              addCategory()
              syncCategoryDisplayed()
              resetCategoryField()
            }}
          >
            新增
          </button>
        </div>
      </form>
    </div>
  )
}
