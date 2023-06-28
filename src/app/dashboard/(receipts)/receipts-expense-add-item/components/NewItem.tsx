'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import cancelIcon from '/public/cancel.png'
import categoryIcon from '/public/category-icon.png'
import dollarSign from '/public/dollar-sign.png'
import descriptionIcon from '/public/description-icon.png'
import calendar from '/public/calendar.png'
import necessityIcon from '/public/necessity-icon.png'
import accountsReceivable from 'public/accounts-receivable.png'

const UID = 'pUcfmReSPATGfLoDVt1xqSEVoqB2'
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

interface ExpenseReceiptObject {
  amounts: number | string
  description: string
  createdTime: number | string
}

export default function NewItem() {
  const [accounts, setAccounts] = useState<MyObject[]>([])
  const [expenseReceipt, setExpenseReceipt] = useState<ExpenseReceiptObject>({
    amounts: '',
    description: '',
    createdTime: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setExpenseReceipt(prev => ({ ...prev, [name]: value }))
  }

  const addNewReceipt = async () => {
    if (
      !expenseReceipt.amounts ||
      !expenseReceipt.description ||
      !expenseReceipt.createdTime
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
        amounts: Number(expenseReceipt.amounts),
        description: expenseReceipt.description,
        createdTime: expenseReceipt.createdTime,
      })
      console.log('Document written with ID: ', receiptsRef)
    } catch (error) {
      console.log('Error adding document ', error)
    }
    setExpenseReceipt({
      amounts: '',
      description: '',
      createdTime: '',
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

  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px] mt-[209px] pt-[30px]'>
      <div className='px-[20px] flex justify-between w-full mb-[30px]'>
        <Link href='/dashboard/receipts-income-category'>
          <Image src={cancelIcon} alt='cancel' className='object-cover' />
        </Link>
        <button onClick={addNewReceipt}>完成</button>
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
          <div className='w-full self-start'>
            <p>交通</p>
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
              value={expenseReceipt.amounts}
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
              value={expenseReceipt.description}
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
            <label htmlFor='createdTime'>消費日期</label>
            <input
              type='date'
              className='border-b outline-0 bg-[transparent]'
              id='createdTime'
              name='createdTime'
              value={expenseReceipt.createdTime}
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
        <div className='flex items-center gap-x-[50px] pb-[15px] mb-[30px]'>
          <div>
            <Image
              src={accountsReceivable}
              alt='account receivable icon'
              className='w-[45px] h-auto'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='accountsReceivable'>應收帳款</label>
            <input
              className='border-b outline-0 bg-[transparent]'
              id='accountsReceivable'
              name='accountsReceivable'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
