'use client'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { collection, setDoc, doc, DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { useGlobalContext } from '@/app/context/store'
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

interface ExpenseReceiptObject {
  category: string
  amounts: number | string
  description: string
  createdTime: number | string
  account: string
}

export default function NewItem() {
  const [expenseReceipt, setExpenseReceipt] = useState<ExpenseReceiptObject>({
    category: '',
    amounts: '',
    description: '',
    createdTime: '',
    account: '',
  })

  const {
    uid,
    allAccounts,
    setAllAccounts,
    allAccountsReceipts,
    setAllAccountsReceipts,
    receiptCategories,
    budgetDetails,
  } = useGlobalContext()

  const flattenedAllAccountsReceipts = allAccountsReceipts.flat(2)

  const expenseCategories = receiptCategories.filter(
    (receiptCategory: DocumentData) => receiptCategory.type === '支出'
  )

  const selectedAccount = getAccountData(allAccounts)
  const accountID = getAccountData(allAccounts)?.id

  function getAccountData(allAccounts: DocumentData[]) {
    const selectedAccount = allAccounts.filter(
      (item: DocumentData) => item.name === expenseReceipt.account
    )
    return selectedAccount[0]
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setExpenseReceipt(prev => ({ ...prev, [name]: value }))
  }

  const addNewReceipt = async (accountID: string) => {
    if (
      !expenseReceipt.category ||
      !expenseReceipt.amounts ||
      !expenseReceipt.description ||
      !expenseReceipt.createdTime ||
      !expenseReceipt.account
    )
      return
    try {
      const receiptsRef = doc(
        collection(db, 'users', uid, 'accounts', accountID, 'receipts')
      )
      await setDoc(receiptsRef, {
        category: expenseReceipt.category,
        amounts: Number(-expenseReceipt.amounts),
        description: expenseReceipt.description,
        createdTime: expenseReceipt.createdTime,
        account: expenseReceipt.account,
        type: '支出',
      })
      console.log('Document written with ID: ', receiptsRef)
    } catch (error) {
      console.log('Error adding document ', error)
    }
  }

  const syncExpenseReceiptDisplayed = () => {
    if (
      !expenseReceipt.category ||
      !expenseReceipt.amounts ||
      !expenseReceipt.description ||
      !expenseReceipt.createdTime ||
      !expenseReceipt.account
    )
      return
    setAllAccountsReceipts((prev: DocumentData[]) => [
      ...prev,
      {
        category: expenseReceipt.category,
        amounts: -Number(expenseReceipt.amounts),
        description: expenseReceipt.description,
        createdTime: expenseReceipt.createdTime,
        account: expenseReceipt.account,
        type: '支出',
      },
    ])
  }

  const popUpNotification = (budgetDetails: DocumentData[]) => {
    budgetDetails.forEach((budgetDetail: DocumentData) => {
      const filteredReceipts = flattenedAllAccountsReceipts.filter(
        (flattenedAllAccountsReceipt: DocumentData) =>
          flattenedAllAccountsReceipt.account === budgetDetail.account &&
          flattenedAllAccountsReceipt.category ===
            budgetDetail.expenseCategory &&
          flattenedAllAccountsReceipt.type === '支出' &&
          flattenedAllAccountsReceipt.createdTime > budgetDetail.startTime &&
          flattenedAllAccountsReceipt.createdTime < budgetDetail.endTime
      )
      const amounts = filteredReceipts.reduce(
        (acc: number, cur: DocumentData) => acc + Math.abs(cur.amounts),
        0
      )

      if (
        expenseReceipt.account === budgetDetail.account &&
        expenseReceipt.category === budgetDetail.expenseCategory &&
        expenseReceipt.createdTime > budgetDetail.startTime &&
        expenseReceipt.createdTime < budgetDetail.endTime &&
        Number(expenseReceipt.amounts) + amounts > budgetDetail.amounts / 2 &&
        Number(expenseReceipt.amounts) + amounts < budgetDetail.amounts
      ) {
        alert('該筆支出已超過預算的一半')
      } else if (
        expenseReceipt.account === budgetDetail.account &&
        expenseReceipt.category === budgetDetail.expenseCategory &&
        expenseReceipt.createdTime > budgetDetail.startTime &&
        expenseReceipt.createdTime < budgetDetail.endTime &&
        Number(expenseReceipt.amounts) + amounts > budgetDetail.amounts
      ) {
        alert('該筆支出已超過預算')
      }
    })
  }

  const updateAccountBalance = (allAccounts: DocumentData[]) => {
    const updatedAccountBalance = allAccounts.map(
      (allAccount: DocumentData) => {
        if (allAccount.name === selectedAccount.name) {
          const newBalance = allAccount.balance - Number(expenseReceipt.amounts)
          const newAllAccount = { ...allAccount, balance: newBalance }
          return newAllAccount
        }
        return allAccount
      }
    )
    setAllAccounts(updatedAccountBalance)
  }

  const updateDBAccountBalance = async (accountID: string) => {
    if (
      !expenseReceipt.category ||
      !expenseReceipt.amounts ||
      !expenseReceipt.description ||
      !expenseReceipt.createdTime ||
      !expenseReceipt.account
    )
      return
    try {
      const accountRef = doc(db, 'users', uid, 'accounts', accountID)

      await setDoc(accountRef, {
        balance: selectedAccount.balance - Number(expenseReceipt.amounts),
        category: selectedAccount.category,
        name: selectedAccount.name,
      })
    } catch (error) {
      console.log('Error setting a document', error)
    }
  }

  const resetReceiptField = () => {
    if (
      !expenseReceipt.category ||
      !expenseReceipt.amounts ||
      !expenseReceipt.description ||
      !expenseReceipt.createdTime ||
      !expenseReceipt.account
    )
      return
    setExpenseReceipt({
      category: '',
      amounts: '',
      description: '',
      createdTime: '',
      account: '',
    })
  }

  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px] mt-[209px] pt-[30px]'>
      <div className='px-[20px] flex justify-between w-full mb-[30px]'>
        <Link href='/dashboard/receipts-expense-categories'>
          <Image src={cancelIcon} alt='cancel' className='object-cover' />
        </Link>
        <button
          onClick={() => {
            addNewReceipt(accountID)
            updateAccountBalance(allAccounts)
            updateDBAccountBalance(accountID)
            syncExpenseReceiptDisplayed()
            popUpNotification(budgetDetails)
            resetReceiptField()
          }}
        >
          完成
        </button>
      </div>
      <div className='self-start pl-[80px] mb-[30px]'>
        <h1>新增支出</h1>
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
              required
              id='category'
              name='category'
              className='outline-0 bg-[transparent] invalid:text-[#a4a4a4]'
              value={expenseReceipt.category}
              onChange={handleChange}
            >
              <option disabled value=''>
                選擇類別
              </option>
              {expenseCategories &&
                expenseCategories.map((expenseCategory: DocumentData) => (
                  <option
                    key={expenseCategory.name}
                    value={expenseCategory.name}
                  >
                    {expenseCategory.name}
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
            <label htmlFor='createdTime'>日期</label>
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
          <div className='flex flex-col w-full gap-y-[5px] border-b '>
            <label htmlFor='account'>帳戶</label>
            <select
              required
              className='outline-0 bg-[transparent] invalid:text-[#a4a4a4]'
              id='account'
              name='account'
              value={expenseReceipt.account}
              onChange={handleChange}
            >
              <option disabled value=''>
                選擇帳戶
              </option>
              <optgroup label={categories.bank}>
                {allAccounts &&
                  allAccounts
                    .filter(
                      (account: DocumentData) =>
                        account.category === categories.bank
                    )
                    .map((account: DocumentData) => (
                      <option key={account.name}>{account.name}</option>
                    ))}
              </optgroup>
              <optgroup label={categories.eTicket}>
                {allAccounts &&
                  allAccounts
                    .filter(
                      (account: DocumentData) =>
                        account.category === categories.eTicket
                    )
                    .map((account: DocumentData) => (
                      <option key={account.name}>{account.name}</option>
                    ))}
              </optgroup>
              <optgroup label={categories.manual}>
                {allAccounts &&
                  allAccounts
                    .filter(
                      (account: DocumentData) =>
                        account.category === categories.manual
                    )
                    .map((account: DocumentData) => (
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
