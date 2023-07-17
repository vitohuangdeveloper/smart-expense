'use client'

import { useState, useEffect } from 'react'
import { DocumentData } from 'firebase/firestore'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface TrendProps {
  allIncomeExpenseReceipts: DocumentData[]
}

const getMonthArray = (data: DocumentData[]) => {
  const monthArray = data.map(datum => {
    const { createdTime } = datum
    const newCreatedTime = createdTime.substring(0, 7)
    return newCreatedTime
  })
  return monthArray
}

const sortMonthArray = (data: string[]) => {
  const newData = [...data]
  const sortedMonthArray = newData.sort()
  return sortedMonthArray
}

const removeDuplicates = (data: string[]) => {
  const dedupedCreatedTimeArray = data.reduce(
    (accumulator: string[], element) => {
      if (!accumulator.includes(element)) {
        accumulator.push(element)
      }
      return accumulator
    },
    []
  )
  return dedupedCreatedTimeArray
}

const getExpenseReceipts = (allIncomeExpenseReceipts: DocumentData[]) => {
  const expenseReceiptsArray = allIncomeExpenseReceipts
    .filter(allIncomeExpenseReceipt => allIncomeExpenseReceipt.type === '支出')
    .map(allIncomeExpenseReceipt => {
      const newAllReceipt = { ...allIncomeExpenseReceipt }
      const { amounts } = allIncomeExpenseReceipt
      const absAmounts = Math.abs(amounts)
      newAllReceipt.amounts = absAmounts
      return newAllReceipt
    })
  return expenseReceiptsArray
}

const getIncomeReceipts = (allIncomeExpenseReceipts: DocumentData[]) => {
  const incomeReceiptsArray = allIncomeExpenseReceipts.filter(
    allIncomeExpenseReceipt => allIncomeExpenseReceipt.type === '收入'
  )
  return incomeReceiptsArray
}

const refineAllReceipts = (allIncomeExpenseReceipts: DocumentData[]) => {
  if (!allIncomeExpenseReceipts.length) return

  const sumsByTime = allIncomeExpenseReceipts.reduce((acc, item) => {
    const { createdTime, amounts } = item
    const newCreatedTime = createdTime.substring(0, 7)

    return {
      ...acc,
      [newCreatedTime]: (acc[newCreatedTime] || 0) + amounts,
    }
  }, {})
  const refinedData = Object.entries(sumsByTime).map(
    ([createdTime, amounts]) => ({
      createdTime,
      amounts,
    })
  )

  const sortedData = [...refinedData].sort((a, b) =>
    a.createdTime > b.createdTime ? 1 : -1
  )
  return sortedData
}

export default function Trend(props: TrendProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isIncomeBar, setIsIncomeBar] = useState<boolean>(true)
  const [isBalanceLine, setIsBalanceLine] = useState<boolean>(true)
  const { allIncomeExpenseReceipts } = props

  const refinedAllReceipts = refineAllReceipts(allIncomeExpenseReceipts)

  const refinedCreatedTimeArray = refinedAllReceipts?.map(
    item => item.createdTime
  )

  const incomeReceiptsArray = refineAllReceipts(
    getIncomeReceipts(allIncomeExpenseReceipts)
  )

  const expenseReceiptsArray = refineAllReceipts(
    getExpenseReceipts(allIncomeExpenseReceipts)
  )
  const incomeCreatedTimeArray = removeDuplicates(
    sortMonthArray(getMonthArray(getIncomeReceipts(allIncomeExpenseReceipts)))
  )
  const expenseCreatedTimeArray = removeDuplicates(
    sortMonthArray(getMonthArray(getExpenseReceipts(allIncomeExpenseReceipts)))
  )

  const titleText = isBalanceLine
    ? '結餘折線圖'
    : isIncomeBar
    ? '收入長條圖'
    : '支出長條圖'

  const backgroundColor = isBalanceLine
    ? 'rgb(8, 158, 145, 0.5)'
    : isIncomeBar
    ? 'rgba(233, 82, 83, 0.5)'
    : 'rgb(233, 195, 43, 0.5)'

  const borderColor = isBalanceLine
    ? 'rgb(8, 158, 145)'
    : isIncomeBar
    ? 'rgba(233, 82, 83)'
    : 'rgb(233, 195, 43)'

  const labels = isBalanceLine
    ? refinedCreatedTimeArray
    : isIncomeBar
    ? incomeCreatedTimeArray
    : expenseCreatedTimeArray

  const pointStyle = isBalanceLine ? 'circle' : 'rectRounded'

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: titleText,
        data: isBalanceLine
          ? refinedAllReceipts?.map(item => item.amounts)
          : isIncomeBar
          ? incomeReceiptsArray?.map(item => item.amounts)
          : expenseReceiptsArray?.map(item => item.amounts),
        backgroundColor,
        borderColor,
        borderRadius: 5,
        borderWidth: 2,
      },
    ],
  }

  const buttonStyle = {
    unclicked: 'w-full bg-secondGray py-[5px] rounded-[10px]',
    clicked: 'w-full bg-primary text-white py-[5px] rounded-[10px]',
  }

  const incomeHandleClick = () => {
    setIsIncomeBar(true)
    setIsBalanceLine(false)
  }

  const expenseHandleClick = () => {
    setIsIncomeBar(false)
    setIsBalanceLine(false)
  }

  const balanceHandleClick = () => {
    setIsBalanceLine(true)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className=' bg-white shadow-md rounded-[20px] p-[30px]'>
      <h2 className='mb-[30px] font-medium text-[24px]'>近半年趨勢</h2>
      <div className='flex bg-secondGray rounded-[10px] mb-[20px]'>
        <button
          className={
            isBalanceLine
              ? buttonStyle.unclicked
              : isIncomeBar
              ? buttonStyle.clicked
              : buttonStyle.unclicked
          }
          onClick={incomeHandleClick}
        >
          收入
        </button>
        <button
          className={
            isBalanceLine
              ? buttonStyle.unclicked
              : isIncomeBar
              ? buttonStyle.unclicked
              : buttonStyle.clicked
          }
          onClick={expenseHandleClick}
        >
          支出
        </button>
        <button
          className={
            isBalanceLine ? buttonStyle.clicked : buttonStyle.unclicked
          }
          onClick={balanceHandleClick}
        >
          結餘
        </button>
      </div>
      <div className='relative h-[246px] w-auto'>
        {loading ? (
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
          </div>
        ) : isBalanceLine ? (
          <Line data={data} options={options} />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  )
}
