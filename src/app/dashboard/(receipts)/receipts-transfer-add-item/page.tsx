'use client'
import Header from '@/app/components/Header'
import NewItem from './components/NewItem'

const RECEIPTS_TITLE = '明細'

export default function Page() {
  return (
    <div>
      <Header title={RECEIPTS_TITLE} />
      <NewItem />
    </div>
  )
}
