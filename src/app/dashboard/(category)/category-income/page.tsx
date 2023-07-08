'use client'

import Sidebar from '@/app/components/Sidebar'
import Header from '@/app/components/Header'
import Result from './components/Result'

const RECEIPTS_TITLE = '分類'

export default function Page() {
  return (
    <div>
      <Sidebar />
      <Header title={RECEIPTS_TITLE} />
      <Result />
    </div>
  )
}
