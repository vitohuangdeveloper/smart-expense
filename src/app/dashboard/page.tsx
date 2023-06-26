'use client'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const DASHBOARD_TITLE = '儀表板'

export default function Page() {
  return (
    <div>
      <Sidebar />
      <Header title={DASHBOARD_TITLE} />
    </div>
  )
}
