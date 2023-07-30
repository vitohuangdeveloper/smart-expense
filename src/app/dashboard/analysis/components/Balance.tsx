'use client'

import { useState, useEffect } from 'react'
import { DocumentData } from 'firebase/firestore'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface BalanceProps {
  balanceData: DocumentData
}

export default function Balance(props: BalanceProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const { balance, expense, income } = props.balanceData

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className='flex flex-col p-[30px] bg-white shadow-md rounded-[20px] gap-y-[40px] relative'>
      <h2 className='text-[24px] font-medium'>本月總收支</h2>
      {loading ? (
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <AiOutlineLoading3Quarters className='animate-spin w-[30px] h-auto text-dark' />
        </div>
      ) : (
        <div className='flex flex-col gap-y-[50px]'>
          <div className='flex justify-between items-center border-b border-b-dark'>
            <p className='text-[18px] text-primary font-medium'>結餘</p>
            <p className='text-[18px]'>$ {balance}</p>
          </div>
          <div className='flex justify-between items-center border-b border-b-dark'>
            <p className='text-[18px] text-primary font-medium'>收入</p>
            <p className='text-[18px]'>$ {income}</p>
          </div>
          <div className='flex justify-between items-center border-b border-b-dark'>
            <p className='text-[18px] text-primary font-medium'>支出</p>
            <p className='text-[18px]'>$ {expense}</p>
          </div>
        </div>
      )}
    </div>
  )
}
