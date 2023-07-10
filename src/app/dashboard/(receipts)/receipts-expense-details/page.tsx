'use client'
import Header from '@/app/components/Header'
import Buttons from './components/Buttons'
import Result from './components/Result'

const RECEIPTS_TITLE = '明細'

export default function Page() {
  return (
    <div>
      <Header title={RECEIPTS_TITLE} />
      <Buttons />
      <Result />
    </div>
  )
}
