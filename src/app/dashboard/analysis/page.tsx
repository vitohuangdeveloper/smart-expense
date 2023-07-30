'use client'

import { DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import Balance from './components/Balance'
import Category from './components/Category'
import Trend from './components/Trend'

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

const getBalanceData = (transactions: DocumentData[]) => {
  const balanceData = transactions.reduce(
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

const combineTransactions = (data: DocumentData[]) => {
  const combinedData = data.reduce((result: DocumentData[], transaction) => {
    const { category, amounts, type } = transaction
    const existingTransaction = result.find(
      (entry: DocumentData) => entry.category === category
    )
    if (existingTransaction) {
      existingTransaction.amounts += amounts
    } else {
      result.push({ category, amounts, type })
    }
    return result
  }, [])
  return combinedData
}

const getExpenseData = (data: DocumentData[]) => {
  const expenseData = data.filter(datum => datum.type === '支出')
  return expenseData
}

const getIncomeData = (data: DocumentData[]) => {
  const incomeData = data.filter(datum => datum.type === '收入')
  return incomeData
}

export default function Page() {
  const { allAccountsReceipts } = useGlobalContext()
  const flattenedAllAccountsReceipts: DocumentData[] =
    allAccountsReceipts.flat(2)
  const allIncomeExpenseReceipts = filterTransferData(
    flattenedAllAccountsReceipts
  )

  const filteredData = filterData(allIncomeExpenseReceipts)

  const balanceData = getBalanceData(filteredData)

  const combinedTransactionData = combineTransactions(filteredData)
  const expenseData = getExpenseData(combinedTransactionData)
  const incomeData = getIncomeData(combinedTransactionData)

  return (
    <div className='pl-[150px] pt-[180px]'>
      <div className='max-w-[1040px] m-auto grid grid-cols-3 gap-x-[60px]'>
        <Balance balanceData={balanceData} />
        <Category incomeData={incomeData} expenseData={expenseData} />
        <Trend allIncomeExpenseReceipts={allIncomeExpenseReceipts} />
      </div>
    </div>
  )
}
