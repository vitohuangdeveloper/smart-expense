'use client'

import { DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Account from './components/Account'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface RefinedReceiptsType {
  createdTime: string
  amounts: number
}

export default function Page() {
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

  const refinedAllReceipts = refineAllReceipts(flattenedAllAccountsReceipts)
  const createdTimeArray = getNewCreatedTimeArray(flattenedAllAccountsReceipts)
  const currentProperty = allAccounts.reduce(
    (acc: number, cur: DocumentData) => acc + cur.balance,
    0
  )
  const updatedAmountsArray =
    refinedAllReceipts && updateAmounts(refinedAllReceipts, currentProperty)

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 1,
          color: '#282F4B',
          font: {
            weight: '500',
            size: 24, // Adjust the font size here
          },
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
        label: '資產',
        data: updatedAmountsArray?.map(item => item.amounts),
        borderColor: 'rgb(36, 48, 208)',
        backgroundColor: 'rgb(36, 48, 208, 0.5)',
      },
    ],
  }

  return (
    <div className='pb-[40px]'>
      <div className='max-w-[1200px] m-[auto] mt-[180px] pl-[150px]'>
        <div className='bg-white shadow-md mb-[100px] rounded-[20px] h-[505px] relative'>
          {allAccountsReceipts.length ? (
            <Line
              options={lineChartOptions}
              data={data}
              className='m-[20px] mt-0'
            />
          ) : (
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
            </div>
          )}
        </div>
        <Account />
      </div>
    </div>
  )
}
