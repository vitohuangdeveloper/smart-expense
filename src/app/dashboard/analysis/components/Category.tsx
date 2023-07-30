'use client'

import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { DocumentData } from 'firebase/firestore'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

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
  const [loading, setLoading] = useState<boolean>(true)
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
    clicked: 'w-full bg-primary text-white py-[5px] rounded-[10px]',
    unclicked: 'w-full bg-secondGray py-[5px] rounded-[10px]',
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className=' bg-white shadow-md rounded-[20px] p-[30px]'>
      <h2 className='mb-[30px] text-[24px] font-medium'>本月分類</h2>
      <div className='flex bg-secondGray rounded-[10px] mb-[20px]'>
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
      <div className='relative h-[246px]'>
        {loading ? (
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
          </div>
        ) : (
          <Doughnut data={data} />
        )}
      </div>
    </div>
  )
}
