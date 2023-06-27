import Link from 'next/link'
import CategorySummary from './CategorySummary'

export default function Result() {
  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px]'>
      <div className='flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]'>
        <Link
          href='/dashboard/receipts-expense-category'
          className='w-full bg-[#A8A8A8] rounded-tl-[20px] rounded-r-[20px] py-[5px] text-center'
        >
          <button>分類</button>
        </Link>
        <Link
          href='/dashboard/receipts-expense-details'
          className='w-full bg-[#F4F4F4] rounded-tr-[20px] py-[5px] text-center'
        >
          <button>明細</button>
        </Link>
      </div>
      <div className='self-start pl-[20px] mb-[20px]'>
        <h2>支出分類</h2>
      </div>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <CategorySummary key={index} category='交通' />
        ))}
    </div>
  )
}
