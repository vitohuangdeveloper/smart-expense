'use client'

import { DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import Header from '@/app/components/Header'
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

const PROPERTY_TITLE = '資產'

export default function Page() {
  const { allAccountsReceipts } = useGlobalContext()
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

  const refineAllReceipts = (allReceipts: DocumentData[]) => {
    if (!allReceipts.length) return
    const sumsByTime = allReceipts.reduce((acc, item) => {
      const { createdTime, amounts } = item
      const newCreatedTime = createdTime.substring(0, 7)

      return {
        ...acc,
        [newCreatedTime]: (acc[newCreatedTime] || 0) + amounts,
      }
    }, {})

    const refinedData = Object.entries(sumsByTime).map(
      ([createdTime, amounts]) => ({
        createdTime: createdTime,
        amounts: amounts,
      })
    )

    const sortedData = [...refinedData].sort((a, b) =>
      a.createdTime > b.createdTime ? 1 : -1
    )
    return sortedData
  }

  const refinedAllReceipts = refineAllReceipts(flattenedAllAccountsReceipts)
  const createdTimeArray = getNewCreatedTimeArray(flattenedAllAccountsReceipts)

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '資產折線圖',
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
        data: refinedAllReceipts
          ? refinedAllReceipts.map(
              refinedAllReceipt => refinedAllReceipt.amounts
            )
          : '',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div>
      <Header title={PROPERTY_TITLE} />
      <div className='max-w-[960px] m-[auto] mt-[150px]'>
        <Line options={lineChartOptions} data={data} className='mb-[60px]' />
        <Account />
      </div>
    </div>
  )
}
