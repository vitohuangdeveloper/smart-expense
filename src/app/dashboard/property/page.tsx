'use client'

import { useState, useEffect } from 'react'
import { DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Account from './components/Account'

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
)

interface RefinedReceiptsType {
  createdTime: string
  amounts: number
}

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true)
  const { allAccountsReceipts, allAccounts } = useGlobalContext()
  const flattenedAllAccountsReceipts = allAccountsReceipts.flat(2)

  const getNewCreatedTimeArray = (allAccountsReceipts: DocumentData[]) => {
    if (!allAccountsReceipts.length) return
    const createdTimeArray = allAccountsReceipts.map(allAccountsReceipt => {
      const { createdTime } = allAccountsReceipt
      const newCreatedTime = createdTime.substring(0, 7)
      return newCreatedTime
    })

    const dedupedCreatedTimeArray = createdTimeArray.reduce(
      (accumulator, element) => {
        if (!accumulator.includes(element)) {
          accumulator.push(element)
        }
        return accumulator
      },
      []
    )
    const sortedCreatedTimeArray = dedupedCreatedTimeArray.sort(
      (a: string, b: string) => (a > b ? 1 : -1)
    )

    return sortedCreatedTimeArray
  }

  const refineAllReceipts = (allAccountsReceipts: DocumentData[]) => {
    if (!allAccountsReceipts.length) return
    const sumsByTime = allAccountsReceipts.reduce((acc, item) => {
      const { createdTime, amounts } = item
      const newCreatedTime: string = createdTime.substring(0, 7)

      return {
        ...acc,
        [newCreatedTime]: (acc[newCreatedTime] || 0) + amounts,
      }
    }, {})

    const refinedData: RefinedReceiptsType[] = Object.entries(sumsByTime).map(
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

  const updateAmounts = (
    data: RefinedReceiptsType[],
    currentProperty: number
  ) => {
    if (!allAccountsReceipts.length) return
    const reversedData = [...data].reverse()
    const updatedData = reversedData
      .reduce((acc, cur, index) => {
        if (index === 0) {
          acc.push({ ...cur, amounts: currentProperty })
        } else {
          const prevAmount = acc[acc.length - 1].amounts
          const newAmount = prevAmount - cur.amounts
          acc.push({ ...cur, amounts: newAmount })
        }
        return acc
      }, [] as RefinedReceiptsType[])
      .reverse()

    return updatedData
  }

  const extractHighestAmounts = (data: RefinedReceiptsType[] | undefined) => {
    const highestAmountsObj = data?.reduce((maxAmount, entry) => {
      return entry.amounts > maxAmount.amounts ? entry : maxAmount
    })
    const highestAmounts = highestAmountsObj?.amounts
    return highestAmounts
  }

  const getColourArray = (data: RefinedReceiptsType[] | undefined) => {
    if (!data) return
    const highestAmounts = extractHighestAmounts(data) as number
    const colourArray = data.map(datum => {
      const { amounts } = datum
      const ratio = Number((amounts / highestAmounts).toFixed(2))
      const rgbCode = `rgb(36, 48, 208, ${ratio})`
      return rgbCode
    })
    return colourArray
  }

  const refinedAllReceipts = refineAllReceipts(flattenedAllAccountsReceipts)
  const createdTimeArray = getNewCreatedTimeArray(flattenedAllAccountsReceipts)
  const currentProperty = allAccounts.reduce(
    (acc: number, cur: DocumentData) => acc + cur.balance,
    0
  )
  const updatedAmountsArray =
    refinedAllReceipts && updateAmounts(refinedAllReceipts, currentProperty)

  const colourArray = getColourArray(updatedAmountsArray)

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          color: '#282F4B',
          font: {
            weight: '500',
            size: 24, // Adjust the font size here
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          lineWidth: 2,
        },
        ticks: {
          color: '#282F4B',
          font: {
            size: 20, // Adjust the font size here
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          lineWidth: 2,
        },
        ticks: {
          color: '#282F4B',
          font: {
            size: 20, // Adjust the font size here
          },
        },
      },
    },
    maintainAspectRatio: true,
  }

  const labels = createdTimeArray

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: '資產折線圖',

        data: updatedAmountsArray?.map(item => item.amounts),
        borderColor: 'rgb(40, 47, 75)',
        backgroundColor: 'rgb(40, 47, 75, 0.5)',
        borderWidth: 3,
        pointStyle: 'circle',
      },
      {
        type: 'bar' as const,
        label: '資產長條圖',
        data: updatedAmountsArray?.map(item => item.amounts),
        borderColor: colourArray,
        backgroundColor: colourArray,
        borderWidth: 2,
        barThickness: 40,
        borderRadius: 5,
        pointStyle: 'rectRounded',
      },
    ],
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className='pb-[40px]'>
      <div className='max-w-[1200px] m-[auto] mt-[180px] pl-[150px]'>
        <div className='bg-white shadow-md mb-[100px] rounded-[20px] h-[505px] relative p-[20px] pt-[5px]'>
          {loading ? (
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
            </div>
          ) : (
            <Chart
              type='bar'
              options={chartOptions}
              data={data}
              className='m-[20px] mt-0'
            />
          )}
        </div>
        <Account />
      </div>
    </div>
  )
}
