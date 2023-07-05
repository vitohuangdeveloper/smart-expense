'use client'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import Form from './components/Form'

const BUDGET_TITLE = '預算'

export default function Page() {
  return (
    <div>
      <Header title={BUDGET_TITLE} />
      <Sidebar />
      <Form />
    </div>
  )
}
