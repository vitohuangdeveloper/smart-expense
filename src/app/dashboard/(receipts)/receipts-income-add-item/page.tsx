'use client'
import Sidebar from '@/app/components/Sidebar'
import Header from '@/app/components/Header'
import NewItem from './components/NewItem'

const RECEIPTS_TITLE = '明細'

export default function Page() {
  return (
    <div>
      <Sidebar />
      <Header title={RECEIPTS_TITLE} />
      <NewItem />
    </div>
  )
}
