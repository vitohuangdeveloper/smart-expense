'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { UID } from '@/app/utils/uid'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'

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
import { Line, Bar } from 'react-chartjs-2'

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

const PROPERTY_TITLE = '資產'

export default function Page() {
  const [allReceipts, setAllReceipts] = useState<DocumentData[]>([])

  const getNewCreatedTimeArray = (allReceipts: DocumentData[]) => {
    if (!allReceipts.length) return
    const createdTimeArray = allReceipts.map(allReceipt => {
      const { createdTime } = allReceipt
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

  const refinedAllReceipts = refineAllReceipts(allReceipts)
  const createdTimeArray = getNewCreatedTimeArray(allReceipts)

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

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '資產長條圖',
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

  useEffect(() => {
    const getAllReceipts = async () => {
      const querySnapshot = await getDocs(
        collection(
          db,
          'users',
          UID,
          'accounts',
          '1PGHC5Omw07rIS5qusUe',
          'receipts'
        )
      )
      const receiptsArray: DocumentData[] = []

      querySnapshot.forEach(doc => {
        receiptsArray.push(doc.data())
      })
      setAllReceipts(receiptsArray)
    }
    getAllReceipts()
  }, [])

  return (
    <div>
      <Header title={PROPERTY_TITLE} />
      <Sidebar />
      <div className='w-[600px] m-[auto] mt-[150px]'>
        <Line options={lineChartOptions} data={data} className='mb-[60px]' />
        <Bar options={barChartOptions} data={data} />
      </div>
    </div>
  )
}
