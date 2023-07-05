'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  collection,
  getDocs,
  setDoc,
  doc,
  DocumentData,
} from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { getReceiptCategoriesSnap } from '@/app/utils/getDocSnap'
import { UID } from '@/app/utils/uid'
import cancelIcon from '/public/cancel.png'
import categoryIcon from '/public/category-icon.png'
import dollarSign from '/public/dollar-sign.png'
import descriptionIcon from '/public/description-icon.png'
import calendar from '/public/calendar.png'
import necessityIcon from '/public/necessity-icon.png'

const categories = {
  bank: '銀行',
  eTicket: '電子票證',
  manual: '手動新增',
}

interface MyObject {
  name?: string
  category?: string
  balance?: number
}

interface IncomeReceiptObject {
  category: string
  amounts: number | string
  description: string
  createdTime: number | string
  account: string
}

export default function NewItem() {
  const [accounts, setAccounts] = useState<MyObject[]>([])
  const [incomeReceipt, setIncomeReceipt] = useState<IncomeReceiptObject>({
    category: '',
    amounts: '',
    description: '',
    createdTime: '',
    account: '',
  })

  const [incomeCategories, setIncomeCategories] = useState<DocumentData[]>([])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setIncomeReceipt(prev => ({ ...prev, [name]: value }))
  }

  const addNewReceipt = async () => {
    if (
      !incomeReceipt.category ||
      !incomeReceipt.amounts ||
      !incomeReceipt.description ||
      !incomeReceipt.createdTime ||
      !incomeReceipt.account
    )
      return
    try {
      const receiptsRef = doc(
        collection(
          db,
          'users',
          UID,
          'accounts',
          '1PGHC5Omw07rIS5qusUe',
          'receipts'
        )
      )
      await setDoc(receiptsRef, {
        category: incomeReceipt.category,
        amounts: Number(incomeReceipt.amounts),
        description: incomeReceipt.description,
        createdTime: incomeReceipt.createdTime,
        account: incomeReceipt.account,
        type: '收入',
      })
      console.log('Document written with ID: ', receiptsRef)
    } catch (error) {
      console.log('Error adding document ', error)
    }
    setIncomeReceipt({
      category: '',
      amounts: '',
      description: '',
      createdTime: '',
      account: '',
    })
  }

  useEffect(() => {
    const getAccountsDocSnap = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', UID, 'accounts')
      )

      const dataArray: MyObject[] = []
      querySnapshot.forEach(doc => {
        dataArray.push(doc.data())
      })
      setAccounts(dataArray)
    }
    getAccountsDocSnap()
  }, [])

  useEffect(() => {
    getReceiptCategoriesSnap().then(res => {
      setIncomeCategories(res.filter(doc => doc.type === '收入'))
    })
  }, [])

  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px] mt-[209px] pt-[30px]'>
      <div className='px-[20px] flex justify-between w-full mb-[30px]'>
        <Link href='/dashboard/receipts-income-category'>
          <Image src={cancelIcon} alt='cancel' className='object-cover' />
        </Link>
        <button onClick={addNewReceipt}>完成</button>
      </div>
      <div className='self-start pl-[80px] mb-[30px]'>
        <h1>新增收入</h1>
      </div>
      <div className='w-[500px]'>
        <div className='flex gap-x-[50px] items-center pb-[15px] mb-[30px]'>
          <div>
            <Image
              src={categoryIcon}
              alt='category icon'
              className='w-[45px] h-auto'
            />
          </div>
          <div className='border-b w-full flex flex-col gap-y-[5px]'>
            <label htmlFor='category'>類別</label>
            <select
              id='category'
              name='category'
              className='outline-0 bg-[transparent]'
              value={incomeReceipt.category}
              onChange={handleChange}
            >
              {incomeCategories &&
                incomeCategories.map(incomeCategory => (
                  <option key={incomeCategory.name} value={incomeCategory.name}>
                    {incomeCategory.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className='flex gap-x-[50px] items-center pb-[15px] mb-[30px]'>
          <div>
            <Image
              src={dollarSign}
              alt='dollar sign'
              className='w-[45px] h-auto'
            />
          </div>
          <div className='border-b w-full flex flex-col'>
            <label htmlFor='amounts'>金額</label>
            <input
              className='outline-0 bg-[transparent]'
              id='amounts'
              name='amounts'
              value={incomeReceipt.amounts}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex items-center gap-x-[50px] pb-[15px] mb-[30px]'>
          <div>
            <Image
              src={descriptionIcon}
              alt='description icon'
              className='w-[45px] h-auto'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='description'>明細描述</label>
            <input
              className='border-b outline-0 bg-[transparent]'
              id='description'
              name='description'
              value={incomeReceipt.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex items-center gap-x-[50px] pb-[15px] mb-[30px]'>
          <div>
            <Image
              src={calendar}
              alt='calendar icon'
              className='w-[45px] h-auto'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='createdTime'>日期</label>
            <input
              type='date'
              className='border-b outline-0 bg-[transparent]'
              id='createdTime'
              name='createdTime'
              value={incomeReceipt.createdTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex items-center gap-x-[50px] pb-[15px] mb-[30px]'>
          <div>
            <Image
              src={necessityIcon}
              alt='necessity icon'
              className='w-[45px] h-auto'
            />
          </div>
          <div className='flex flex-col w-full gap-y-[5px]'>
            <label htmlFor='account'>帳戶</label>
            <select
              className='border-b outline-0 bg-[transparent]'
              id='account'
              name='account'
              value={incomeReceipt.account}
              onChange={handleChange}
            >
              <optgroup label={categories.bank}>
                {accounts &&
                  accounts
                    .filter(account => account.category === categories.bank)
                    .map(account => (
                      <option key={account.name}>{account.name}</option>
                    ))}
              </optgroup>
              <optgroup label={categories.eTicket}>
                {accounts &&
                  accounts
                    .filter(account => account.category === categories.eTicket)
                    .map(account => (
                      <option key={account.name}>{account.name}</option>
                    ))}
              </optgroup>
              <optgroup label={categories.manual}>
                {accounts &&
                  accounts
                    .filter(account => account.category === categories.manual)
                    .map(account => (
                      <option key={account.name}>{account.name}</option>
                    ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
