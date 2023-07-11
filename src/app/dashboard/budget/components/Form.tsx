'use client'
import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { setDoc, doc, collection } from 'firebase/firestore'
import { DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import Image from 'next/image'
import { useGlobalContext } from '@/app/context/store'
import toggleOff from '/public/toggle-off.png'
import toggleOn from '/public/toggle-on.png'

interface BudgetDetails {
  name: string
  account: string
  expenseCategory: string
  amounts: number | string
  startTime: string
  endTime: string
}

const categories = {
  bank: '銀行',
  eTicket: '電子票證',
  manual: '手動新增',
}

export default function Form() {
  const { uid, allAccounts, receiptCategories, setBudgetDetails } =
    useGlobalContext()
  const [isToggled, setIsToggled] = useState<boolean>(false)
  const [budgetDetail, setBudgetDetail] = useState<BudgetDetails>({
    name: '',
    account: '',
    expenseCategory: '',
    amounts: '',
    startTime: '',
    endTime: '',
  })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setBudgetDetail(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleReminder = () => {
    setIsToggled(current => !current)
  }

  const addNewBudget = async (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (
      !budgetDetail.name ||
      !budgetDetail.account ||
      !budgetDetail.expenseCategory ||
      !budgetDetail.amounts ||
      !budgetDetail.startTime ||
      !budgetDetail.endTime
    )
      return
    try {
      const budgetRef = doc(collection(db, 'users', uid, 'budgets'))
      await setDoc(budgetRef, {
        name: budgetDetail.name,
        account: budgetDetail.account,
        expenseCategory: budgetDetail.expenseCategory,
        amounts: Number(budgetDetail.amounts),
        startTime: budgetDetail.startTime,
        endTime: budgetDetail.endTime,
        reminder: isToggled,
      })
      console.log('Document written with ID: ', budgetRef)
    } catch (error) {
      console.log('Error adding document ', error)
    }
  }

  const syncBudgetDetails = () => {
    setBudgetDetails((prev: DocumentData[]) => [
      ...prev,
      {
        name: budgetDetail.name,
        account: budgetDetail.account,
        expenseCategory: budgetDetail.expenseCategory,
        amounts: Number(budgetDetail.amounts),
        startTime: budgetDetail.startTime,
        endTime: budgetDetail.endTime,
        reminder: isToggled,
      },
    ])
  }

  const resetBudgetDetailField = () => {
    setBudgetDetail({
      name: '',
      account: '',
      expenseCategory: '',
      amounts: '',
      startTime: '',
      endTime: '',
    })
  }

  const cancelBudget = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setBudgetDetail({
      name: '',
      account: '',
      expenseCategory: '',
      amounts: '',
      startTime: '',
      endTime: '',
    })
  }
  return (
    <form className='max-w-[500px] m-auto mt-[200px]'>
      <div className='flex flex-col gap-y-[30px] border-2 border-gray rounded-[20px] w-full py-[30px] px-[30px] mb-[20px]'>
        <div className='flex flex-col gap-y-[5px]'>
          <label htmlFor='name'>預算名稱</label>
          <input
            className='border-2 border-gray rounded-[20px] py-[10px] px-[15px]'
            placeholder='請輸入預算名稱'
            name='name'
            id='name'
            value={budgetDetail.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className='mb-[5px]'>篩選統計範圍</p>
          <div className='flex justify-between border-2 border-gray rounded-[20px] px-[15px] py-[10px]'>
            <label htmlFor='account'>帳戶</label>
            <select
              required
              className='rounded-[20px] pr-[3px] invalid:text-gray cursor-pointer text-right outline-none'
              name='account'
              id='account'
              value={budgetDetail.account}
              onChange={handleChange}
            >
              <option disabled value=''>
                所有帳戶
              </option>
              <optgroup label={categories.bank}>
                {allAccounts &&
                  allAccounts
                    .filter(
                      (item: DocumentData) => item.category === categories.bank
                    )
                    .map((item: DocumentData, index: string) => (
                      <option key={index}>{item.name}</option>
                    ))}
              </optgroup>
              <optgroup label={categories.eTicket}>
                {allAccounts &&
                  allAccounts
                    .filter(
                      (item: DocumentData) =>
                        item.category === categories.eTicket
                    )
                    .map((item: DocumentData, index: string) => (
                      <option key={index}>{item.name}</option>
                    ))}
              </optgroup>
              <optgroup label={categories.manual}>
                {allAccounts &&
                  allAccounts
                    .filter(
                      (item: DocumentData) =>
                        item.category === categories.manual
                    )
                    .map((item: DocumentData, index: string) => (
                      <option key={index}>{item.name}</option>
                    ))}
              </optgroup>
            </select>
          </div>
          <div className='flex justify-between border-2 border-gray rounded-[20px] px-[15px] py-[10px]'>
            <label htmlFor='expenseCategory'>分類</label>
            <select
              required
              className='rounded-[20px] pr-[3px] invalid:text-gray cursor-pointer text-right outline-none'
              name='expenseCategory'
              id='expenseCategory'
              value={budgetDetail.expenseCategory}
              onChange={handleChange}
            >
              <option disabled value=''>
                所有分類
              </option>
              {receiptCategories &&
                receiptCategories
                  .filter((item: DocumentData) => item.type === '支出')
                  .map((item: DocumentData, index: string) => (
                    <option key={index}>{item.name}</option>
                  ))}
            </select>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='amounts' className='mb-[5px]'>
            預算金額
          </label>
          <input
            className='border-2 border-gray rounded-[20px] px-[15px] py-[10px]'
            placeholder='請輸入預算金額'
            id='amounts'
            name='amounts'
            value={budgetDetail.amounts}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className='mb-[5px]'>日期區間</p>
          <div className='flex justify-between border-2 border-gray rounded-[20px] px-[15px] py-[10px]'>
            <label htmlFor='startTime'>起始日</label>
            <input
              type='date'
              name='startTime'
              id='startTime'
              value={budgetDetail.startTime}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-between border-2 border-gray rounded-[20px] px-[15px] py-[10px]'>
            <label htmlFor='endTime'>結束日</label>
            <input
              type='date'
              name='endTime'
              id='endTime'
              value={budgetDetail.endTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex justify-between items-center border-2 border-gray rounded-[20px] px-[15px] py-[10px]'>
          <p>提醒</p>
          <Image
            src={isToggled ? toggleOn : toggleOff}
            alt={isToggled ? 'toggle on' : 'toggle off'}
            className='object-cover w-[20px] h-[auto] cursor-pointer'
            onClick={toggleReminder}
          />
        </div>
      </div>
      <div className='px-[30px] flex justify-between'>
        <button
          className='bg-gray px-[5px] py-[10px] rounded-[20px] w-[100px]'
          onClick={event => {
            addNewBudget(event)
            syncBudgetDetails()
            resetBudgetDetailField()
          }}
        >
          新增
        </button>
        <button
          className='bg-gray px-[5px] py-[10px] rounded-[20px] w-[100px]'
          onClick={cancelBudget}
        >
          取消
        </button>
      </div>
    </form>
  )
}
