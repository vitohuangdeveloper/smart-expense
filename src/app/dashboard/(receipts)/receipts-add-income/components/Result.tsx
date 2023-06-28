import Link from 'next/link'
import Category from './Category'
import categoryIcon from '/public/category-icon.png'

export default function Result() {
  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px] mt-[209px]'>
      <div className='flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]'>
        <Link
          href='/dashboard/receipts-add-expense'
          className='w-full bg-[#F4F4F4] rounded-tl-[20px] rounded-r-[20px] py-[5px] text-center'
        >
          <button>支出</button>
        </Link>
        <Link
          href='/dashboard/receipts-add-income'
          className='w-full bg-[#A8A8A8] py-[5px] text-center rounded-[20px]'
        >
          <button>收入</button>
        </Link>
        <Link
          href='/dashboard/receipts-add-transaction'
          className='w-full bg-[#F4F4F4] rounded-tr-[20px] py-[5px] text-center'
        >
          <button>移轉</button>
        </Link>
      </div>
      <div className='self-start pl-[20px] mb-[50px]'>
        <h2>支出分類</h2>
      </div>
      <div className='grid w-full grid-cols-3 gap-y-[90px]'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Link key={index} href='/dashboard/receipts-income-add-item'>
              <Category src={categoryIcon} categoryName={'薪資'} />
            </Link>
          ))}
      </div>
    </div>
  )
}
