'use client'

import { useState } from 'react'
import { DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import Balance from './components/Balance'
import Category from './components/Category'
import Trend from './components/Trend'

const ANALYSIS_TITLE = '分析'

const getCurrentYearMonth = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = String(date.getMonth() + 1).padStart(2, '0')
  const currentYearMonth = `${currentYear}-${currentMonth}`
  return currentYearMonth
}

const filterData = (allAccountsReceipts: DocumentData[]) => {
  const filteredData = allAccountsReceipts.filter(allAccountsReceipt => {
    const { createdTime } = allAccountsReceipt
    const newCreatedTime = createdTime.substring(0, 7)
    const currentTime = getCurrentYearMonth()
    return newCreatedTime === currentTime
  })
  return filteredData
}

const filterTransferData = (allAccountsReceipts: DocumentData[]) => {
  const filteredTransferData = allAccountsReceipts.filter(
    allAccountsReceipt => allAccountsReceipt.type !== '轉帳'
  )
  return filteredTransferData
}

const getBalanceData = (data: DocumentData[]) => {
  const balanceData = data.reduce(
    (acc, item) => {
      if (item.type === '收入') {
        acc.income += item.amounts
      } else if (item.type === '支出') {
        acc.expense += item.amounts
      }
      acc.balance = acc.income + acc.expense
      return acc
    },
    { income: 0, expense: 0, balance: 0 }
  )
  return balanceData
}

const combineData = (data: DocumentData[]) => {
  const combinedData = data.reduce((acc: [] | DocumentData[], item) => {
    const existingItem = acc.find((i: DocumentData) => {
      return i.category === item.category
    })

    if (existingItem) {
      existingItem.amounts += item.amounts
      return acc
    }

    return [...acc, item]
  }, [])
  return combinedData
}

const getExpenseData = (data: DocumentData[]) => {
  const combinedData = combineData(data)
  const expenseData = combinedData.filter(datum => datum.type === '支出')
  return expenseData
}

const getIncomeData = (data: DocumentData[]) => {
  const combinedData = combineData(data)
  const incomeData = combinedData.filter(datum => datum.type === '收入')
  return incomeData
}

export default function Page() {
  const { allAccountsReceipts } = useGlobalContext()
  const flattenedAllAccountsReceipts: DocumentData[] =
    allAccountsReceipts.flat(2)
  const allIncomeExpenseReceipts = filterTransferData(
    flattenedAllAccountsReceipts
  )

  const [isIncome, setIsIncome] = useState<boolean>(true)
  const [isIncomeBar, setIsIncomeBar] = useState<boolean>(true)
  const [isBalanceLine, setIsBalanceLine] = useState<boolean>(false)
  const filteredData = filterData(allIncomeExpenseReceipts)
  const balanceData = getBalanceData(filteredData)
  const expenseData = getExpenseData(filteredData)
  const incomeData = getIncomeData(filteredData)

  return (
    <div>
      <Header title={ANALYSIS_TITLE} />
      <Sidebar />
      <div className='max-w-[1200px] m-auto mt-[200px] grid grid-cols-3 gap-x-[100px]'>
        <Balance balanceData={balanceData} />
        <Category
          incomeData={incomeData}
          expenseData={expenseData}
          isIncome={isIncome}
          setIsIncome={setIsIncome}
        />
        <Trend
          allIncomeExpenseReceipts={allIncomeExpenseReceipts}
          isIncomeBar={isIncomeBar}
          setIsIncomeBar={setIsIncomeBar}
          isBalanceLine={isBalanceLine}
          setIsBalanceLine={setIsBalanceLine}
        />
      </div>
    </div>
  )
}
