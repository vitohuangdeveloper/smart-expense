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

interface IncomeReceiptObject {
  category: string
  amounts: number | string
  description: string
  createdTime: number | string
  account: string
}

export default function NewItem() {
  const [incomeReceipt, setIncomeReceipt] = useState<IncomeReceiptObject>({
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
    setAllAccountsReceipts,
    receiptCategories,
  } = useGlobalContext()

  const incomeCategories = receiptCategories.filter(
    (receiptCategory: DocumentData) => receiptCategory.type === '收入'
  )

  const selectedAccount = getAccountData()
  const accountID = getAccountData()?.id

  function getAccountData() {
    const selectedAccount = allAccounts.filter(
      (item: DocumentData) => item.name === incomeReceipt.account
    )
    return selectedAccount[0]
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setIncomeReceipt(prev => ({ ...prev, [name]: value }))
  }

  const addNewReceipt = async (accountID: string) => {
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
        collection(db, 'users', uid, 'accounts', accountID, 'receipts')
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
  }

  const updateAccountBalance = (allAccounts: DocumentData[]) => {
    const updatedAccountBalance = allAccounts.map(
      (allAccount: DocumentData) => {
        if (allAccount.name === selectedAccount.name) {
          const newBalance = allAccount.balance + Number(incomeReceipt.amounts)
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
      !incomeReceipt.category ||
      !incomeReceipt.amounts ||
      !incomeReceipt.description ||
      !incomeReceipt.createdTime ||
      !incomeReceipt.account
    )
      return
    try {
      const accountRef = doc(db, 'users', uid, 'accounts', accountID)

      await setDoc(accountRef, {
        balance: selectedAccount.balance + Number(incomeReceipt.amounts),
        category: selectedAccount.category,
        name: selectedAccount.name,
      })
    } catch (error) {
      console.log('Error setting a document', error)
    }
  }

  const syncIncomeReceiptDisplayed = () => {
    if (
      !incomeReceipt.category ||
      !incomeReceipt.amounts ||
      !incomeReceipt.description ||
      !incomeReceipt.createdTime ||
      !incomeReceipt.account
    )
      return
    setAllAccountsReceipts((prev: DocumentData[]) => [
      ...prev,
      {
        category: incomeReceipt.category,
        amounts: Number(incomeReceipt.amounts),
        description: incomeReceipt.description,
        createdTime: incomeReceipt.createdTime,
        account: incomeReceipt.account,
        type: '收入',
      },
    ])
  }

  const resetReceiptField = () => {
    if (
      !incomeReceipt.category ||
      !incomeReceipt.amounts ||
      !incomeReceipt.description ||
      !incomeReceipt.createdTime ||
      !incomeReceipt.account
    )
      return
    setIncomeReceipt({
      category: '',
      amounts: '',
      description: '',
      createdTime: '',
      account: '',
    })
  }

  return (
    <div className='pl-[150px]'>
      <div className='flex flex-col items-center max-w-[600px] min-h-[500px] m-auto mb-[40px] bg-white shadow-md rounded-[20px] pt-[40px] pb-[70px] mt-[180px] relative'>
        <Link href='/dashboard/receipts-income-categories'>
          <RxCross2 className='absolute top-[20px] right-[20px] text-[20px] font-medium cursor-pointer' />
        </Link>
        <div className='mb-[30px]'>
          <h1 className='text-[24px] font-medium'>新增收入</h1>
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
                value={incomeReceipt.category}
                onChange={handleChange}
              >
                <option disabled value=''>
                  選擇類別
                </option>
                {incomeCategories &&
                  incomeCategories.map((incomeCategory: DocumentData) => (
                    <option
                      key={incomeCategory.name}
                      value={incomeCategory.name}
                    >
                      {incomeCategory.name}
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
                value={incomeReceipt.amounts}
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
                value={incomeReceipt.description}
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
                value={incomeReceipt.createdTime}
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
              <select
                required
                className='outline-0 bg-[transparent] invalid:text-gray text-[18px] appearance-none cursor-pointer'
                id='account'
                name='account'
                value={incomeReceipt.account}
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
      <div className='text-center'>
        <button
          className='bg-primary text-[#fff] text-[20px] rounded-full w-[150px] py-[10px]'
          onClick={() => {
            addNewReceipt(accountID)
            updateAccountBalance(allAccounts)
            updateDBAccountBalance(accountID)
            syncIncomeReceiptDisplayed()
            resetReceiptField()
          }}
        >
          新增
        </button>
      </div>
    </div>
  )
}
