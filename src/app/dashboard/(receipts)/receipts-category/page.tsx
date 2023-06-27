'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/Sidebar'
import Header from '@/app/components/Header'
import Buttons from './components/Buttons'
import Result from './components/Result'

const RECEIPTS_TITLE = '明細'

export default function Page() {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('收入分類')

  return (
    <div>
      <Sidebar />
      <Header title={RECEIPTS_TITLE} />
      <Buttons
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        category={category}
        setCategory={setCategory}
      />
      <Result category={category} />
    </div>
  )
}
