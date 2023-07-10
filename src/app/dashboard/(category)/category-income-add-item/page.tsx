'use client'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { setDoc, doc, collection, DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import { db } from '@/app/lib/firebase'
import Header from '@/app/components/Header'
import Link from 'next/link'

const CATEGORY_TITLE = '分類'

export default function Page() {
  const { uid, setReceiptCategories } = useGlobalContext()
  const [category, setCategory] = useState({
    name: '',
    type: '收入',
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
    <div>
      <Header title={CATEGORY_TITLE} />
      <form className='flex flex-col w-[500px] min-h-[500px] m-auto bg-gray rounded-[20px] justify-center px-[20px] mt-[209px]'>
        <div className='flex flex-col gap-y-[5px] mb-[20px] justify-center '>
          <label htmlFor='name' className='whitespace-nowrap'>
            分類名稱
          </label>
          <input
            id='name'
            name='name'
            value={category.name}
            onChange={handleChange}
            className='bg-[transparent] border-b outline-none'
            placeholder='請輸入分類名稱'
          />
        </div>
        <div className='flex flex-col gap-y-[5px] mb-[40px] justify-center border-b'>
          <label htmlFor='type'>帳戶類別</label>
          <select
            required
            id='type'
            name='type'
            value={category.type}
            onChange={handleChange}
            className='invalid:text-[#aaa] outline-none bg-[transparent]'
          >
            <option>{category.type}</option>
          </select>
        </div>
        <div className='flex justify-center gap-x-[20px]'>
          <Link href='/dashboard/category-income'>
            <button className='bg-[#aaa] rounded-[15px] px-[5px] py-[10px] w-[100px]'>
              取消
            </button>
          </Link>
          <button
            className='bg-[#aaa] rounded-[15px] px-[5px] py-[10px] w-[100px]'
            onClick={event => {
              handleClick(event)
              addCategory()
              syncCategoryDisplayed()
              resetCategoryField()
            }}
          >
            完成
          </button>
        </div>
      </form>
    </div>
  )
}
