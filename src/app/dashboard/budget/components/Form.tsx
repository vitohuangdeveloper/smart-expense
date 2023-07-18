'use client'
import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { setDoc, doc, collection } from 'firebase/firestore'
import { DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import Link from 'next/link'
import { useGlobalContext } from '@/app/context/store'
import { RxCross2 } from 'react-icons/rx'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'

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
  manual: '自訂',
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

  return (
    <div className='pt-[180px] pl-[150px]'>
      <form className='max-w-[600px] m-auto '>
        <div className='flex flex-col bg-white shadow-md rounded-[20px] w-full pt-[40px] pb-[60px] px-[50px] mb-[40px] relative'>
          <Link
            href='/dashboard/property'
            className='absolute top-[20px] right-[20px] '
          >
            <RxCross2 className='text-[20px] font-medium cursor-pointer' />
          </Link>
          <div className='mb-[30px]'>
            <h2 className='text-[24px] font-medium text-center'>新增預算</h2>
          </div>
          <div className='flex flex-col border-b mb-[45px]'>
            <label
              htmlFor='name'
              className='text-[20px] text-primary font-medium'
            >
              預算名稱
            </label>
            <input
              placeholder='請輸入預算名稱'
              name='name'
              id='name'
              value={budgetDetail.name}
              onChange={handleChange}
              className='outline-0 bg-[transparent] text-[18px] placeholder:text-gray'
            />
          </div>
          <div className='mb-[45px]'>
            <p className='text-[20px] text-primary font-medium '>
              篩選統計範圍
            </p>
            <div className='flex justify-between border-b border-b-gray py-[5px]'>
              <label htmlFor='account' className='font-medium text-[18px]'>
                帳戶
              </label>
              <select
                required
                className='rounded-[20px] pr-[3px] invalid:text-gray cursor-pointer text-right outline-none bg-[transparent] text-[18px]'
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
                        (item: DocumentData) =>
                          item.category === categories.bank
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
            <div className='flex justify-between border-b py-[5px]'>
              <label
                htmlFor='expenseCategory'
                className='font-medium text-[18px]'
              >
                分類
              </label>
              <select
                required
                className='rounded-[20px] pr-[3px] invalid:text-gray cursor-pointer text-right outline-none bg-[transparent] text-[18px]'
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
          <div className='flex flex-col border-b mb-[45px]'>
            <label
              htmlFor='amounts'
              className='text-primary text-[20px] font-medium'
            >
              預算金額
            </label>
            <input
              className='outline-0 bg-[transparent] text-[18px] placeholder:text-gray'
              placeholder='請輸入預算金額'
              id='amounts'
              name='amounts'
              value={budgetDetail.amounts}
              onChange={handleChange}
            />
          </div>
          <div className='mb-[45px]'>
            <p className='text-primary font-medium text-[20px]'>日期區間</p>
            <div className='flex justify-between border-b border-b-gray'>
              <label
                htmlFor='startTime'
                className='font-medium text-[18px] py-[5px]'
              >
                起始日
              </label>
              <input
                type='date'
                name='startTime'
                id='startTime'
                value={budgetDetail.startTime}
                onChange={handleChange}
                className='bg-[transparent] text-[18px] text-right'
              />
            </div>
            <div className='flex justify-between border-b py-[5px]'>
              <label htmlFor='endTime' className='font-medium text-[18px]'>
                結束日
              </label>
              <input
                type='date'
                name='endTime'
                id='endTime'
                value={budgetDetail.endTime}
                onChange={handleChange}
                className='bg-[transparent] text-[18px] text-right'
              />
            </div>
          </div>
          <div className='flex justify-between items-center border-b'>
            <p className='text-[18px] font-medium'>提醒</p>
            {isToggled ? (
              <BsToggleOn
                className='text-[25px] cursor-pointer'
                onClick={toggleReminder}
              />
            ) : (
              <BsToggleOff
                className='text-[25px] cursor-pointer'
                onClick={toggleReminder}
              />
            )}
          </div>
        </div>
        <div className='text-center'>
          <button
            className='bg-primary text-white text-[20px] rounded-full w-[150px] py-[10px]'
            onClick={event => {
              addNewBudget(event)
              syncBudgetDetails()
              resetBudgetDetailField()
            }}
          >
            新增
          </button>
        </div>
      </form>
    </div>
  )
}
