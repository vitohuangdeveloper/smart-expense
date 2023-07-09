'use client'
import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { DocumentData } from 'firebase/firestore'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CategoryProps {
  incomeData: DocumentData[]
  expenseData: DocumentData[]
}

const getLabels = (data: DocumentData[]) => {
  const labels = data.map(datum => datum.category)
  return labels
}

const getAmountsArray = (data: DocumentData[]) => {
  const newData = data.map(datum => datum.amounts)
  return newData
}

const getBackgroundColorArray = (data: DocumentData[]) => {
  const backgroundColorArray: string[] = []
  const { length } = data
  for (let i = 0; i < length; i++) {
    const rgbaCode = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 1)`
    backgroundColorArray.push(rgbaCode)
  }
  return backgroundColorArray
}

const getBorderColorArray = (data: string[]) => {
  const newData = data.map(datum => datum.replace('1)', '0.2)'))
  return newData
}

export default function Category(props: CategoryProps) {
  const [isIncome, setIsIncome] = useState<boolean>(true)
  const { incomeData, expenseData } = props
  const incomelabels = getLabels(incomeData)
  const incomeAmountsArray = getAmountsArray(incomeData)
  const incomeBackgroundColor = getBackgroundColorArray(incomeData)
  const incomeBorderColor = getBorderColorArray(incomeBackgroundColor)

  const expenselabels = getLabels(expenseData)
  const expenseAmountsArray = getAmountsArray(expenseData)
  const expenseBackgroundColor = getBackgroundColorArray(expenseData)
  const expenseBorderColor = getBorderColorArray(expenseBackgroundColor)

  const incomeHandleClick = () => {
    setIsIncome(true)
  }

  const expenseHandleClick = () => {
    setIsIncome(false)
  }

  const data = {
    labels: isIncome ? incomelabels : expenselabels,
    datasets: [
      {
        label: '# of Votes',
        data: isIncome ? incomeAmountsArray : expenseAmountsArray,
        backgroundColor: isIncome
          ? incomeBackgroundColor
          : expenseBackgroundColor,
        borderColor: isIncome ? incomeBorderColor : expenseBorderColor,
        borderWidth: 1,
      },
    ],
  }

  const buttonStyle = {
    clicked: 'w-full bg-[#8F8F8F] py-[5px] rounded-[10px]',
    unclicked: 'w-full bg-[#F4F4F4] py-[5px] rounded-[10px]',
  }
  return (
    <div className='min-w-[280px] bg-gray rounded-[20px] py-[20px] px-[25px]'>
      <h2 className='mb-[20px]'>本月分類</h2>
      <div className='flex bg-[#F4F4F4] rounded-[10px] mb-[20px]'>
        <button
          className={isIncome ? buttonStyle.clicked : buttonStyle.unclicked}
          onClick={incomeHandleClick}
        >
          收入
        </button>
        <button
          className={isIncome ? buttonStyle.unclicked : buttonStyle.clicked}
          onClick={expenseHandleClick}
        >
          支出
        </button>
      </div>
      <div>
        <Doughnut data={data} />
      </div>
    </div>
  )
}
