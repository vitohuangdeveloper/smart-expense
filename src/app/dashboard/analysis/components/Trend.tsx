import { DocumentData } from 'firebase/firestore'
import { Dispatch, SetStateAction } from 'react'
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
  isIncomeBar: boolean
  setIsIncomeBar: Dispatch<SetStateAction<boolean>>
  isBalanceLine: boolean
  setIsBalanceLine: Dispatch<SetStateAction<boolean>>
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
  const {
    allIncomeExpenseReceipts,
    isIncomeBar,
    setIsIncomeBar,
    isBalanceLine,
    setIsBalanceLine,
  } = props

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
    ? 'rgb(98,60,68, 0.5)'
    : isIncomeBar
    ? 'rgba(255, 99, 132, 0.5)'
    : 'rgb(122,143,207, 0.5)'
  const borderColor = isBalanceLine
    ? 'rgb(98,60,68)'
    : isIncomeBar
    ? 'rgba(255, 99, 132)'
    : 'rgb(122,143,207)'
  const labels = isBalanceLine
    ? refinedCreatedTimeArray
    : isIncomeBar
    ? incomeCreatedTimeArray
    : expenseCreatedTimeArray

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: isBalanceLine
          ? refinedAllReceipts?.map(item => item.amounts)
          : isIncomeBar
          ? incomeReceiptsArray?.map(item => item.amounts)
          : expenseReceiptsArray?.map(item => item.amounts),
        backgroundColor,
        borderColor,
      },
    ],
  }

  const buttonStyle = {
    unclicked: 'w-full py-[5px] rounded-l-[10px] cursor-pointer',
    clicked: 'w-full py-[5px] rounded-[10px] bg-[#8F8F8F] cursor-pointer',
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

  return (
    <div className='min-w-[280px] bg-gray rounded-[20px] pt-[20px] px-[25px]'>
      <h2 className='mb-[20px]'>近半年趨勢</h2>
      <div className='flex bg-[#F4F4F4] rounded-[10px] mb-[20px]'>
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
      <div>
        {isBalanceLine ? (
          <Line data={data} options={options} />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  )
}
