'use client'
import Header from '@/app/components/Header'
import Form from './components/Form'

const BUDGET_TITLE = '預算'

export default function Page() {
  return (
    <div>
      <Header title={BUDGET_TITLE} />
      <Form />
    </div>
  )
}
