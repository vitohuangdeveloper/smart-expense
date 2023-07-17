'use client'
import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import { VscCircleLargeFilled } from 'react-icons/vsc'
import { BiDollarCircle, BiPencil } from 'react-icons/bi'
import { FaCalendarDays } from 'react-icons/fa6'
import { MdAccountBalance } from 'react-icons/md'
import { collection, setDoc, doc, DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { useGlobalContext } from '@/app/context/store'

const categories = {
  bank: '銀行',
  eTicket: '電子票證',
  manual: '自訂',
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
    <div className='pl-[150px]'>
      <div className='flex flex-col items-center max-w-[600px] min-h-[500px] m-auto mb-[40px] bg-white shadow-md rounded-[20px] pt-[40px] pb-[60px] mt-[180px] relative'>
        <Link
          href='/dashboard/receipts-expense-categories'
          className='absolute top-[20px] right-[20px]'
        >
          <RxCross2 className='text-[20px] font-medium cursor-pointer' />
        </Link>
        <div className='mb-[30px]'>
          <h2 className='text-[24px] font-medium'>新增支出</h2>
        </div>
        <div className='w-[500px]'>
          <div className='flex gap-x-[50px] items-center pb-[15px] mb-[30px]'>
            <div>
              <VscCircleLargeFilled className='w-[45px] h-auto text-dark' />
            </div>
            <div className='border-b w-full flex flex-col'>
              <label
                htmlFor='category'
                className='text-[20px] text-primary font-medium'
              >
                類別
              </label>
              <select
                required
                id='category'
                name='category'
                className='outline-0 bg-[transparent] invalid:text-gray text-[18px] appearance-none cursor-pointer'
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
              <BiDollarCircle className='text-dark w-[45px] h-auto' />
            </div>
            <div className='border-b w-full flex flex-col'>
              <label
                htmlFor='amounts'
                className='text-[20px] text-primary font-medium'
              >
                金額
              </label>
              <input
                className='outline-0 bg-[transparent] text-[18px] placeholder:text-gray'
                id='amounts'
                name='amounts'
                value={expenseReceipt.amounts}
                onChange={handleChange}
                placeholder='0'
              />
            </div>
          </div>
          <div className='flex items-center gap-x-[50px] pb-[15px] mb-[30px]'>
            <div>
              <BiPencil className='w-[45px] h-auto text-dark' />
            </div>
            <div className='flex flex-col w-full'>
              <label
                htmlFor='description'
                className='text-[20px] text-primary font-medium'
              >
                明細描述
              </label>
              <input
                className='border-b outline-0 bg-[transparent] text-[18px] placeholder:text-gray'
                id='description'
                name='description'
                value={expenseReceipt.description}
                onChange={handleChange}
                placeholder='請輸入明細描述'
              />
            </div>
          </div>
          <div className='flex items-center gap-x-[50px] pb-[15px] mb-[30px]'>
            <div>
              <FaCalendarDays className='w-[45px] h-auto text-dark' />
            </div>
            <div className='flex flex-col w-full'>
              <label
                htmlFor='createdTime'
                className='text-[20px] text-primary font-medium'
              >
                日期
              </label>
              <input
                type='date'
                className='border-b outline-0 bg-[transparent] text-[18px]'
                id='createdTime'
                name='createdTime'
                value={expenseReceipt.createdTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex items-center gap-x-[50px] pb-[15px]'>
            <div>
              <MdAccountBalance className='w-[45px] h-auto text-dark' />
            </div>
            <div className='flex flex-col w-full border-b'>
              <label
                htmlFor='account'
                className='text-[20px] text-primary font-medium'
              >
                帳戶
              </label>
              <div className='relative inline-block'>
                <select
                  required
                  className='outline-0 bg-[transparent] invalid:text-gray text-[18px] appearance-none cursor-pointer'
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
      </div>
      <div className='text-center'>
        <button
          className='bg-primary text-white text-[20px] rounded-full w-[150px] py-[10px]'
          onClick={() => {
            addNewReceipt(accountID)
            updateAccountBalance(allAccounts)
            updateDBAccountBalance(accountID)
            syncExpenseReceiptDisplayed()
            popUpNotification(budgetDetails)
            resetReceiptField()
          }}
        >
          新增
        </button>
      </div>
    </div>
  )
}
