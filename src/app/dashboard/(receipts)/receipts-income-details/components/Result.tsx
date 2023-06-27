import Link from 'next/link'
import DetailSummary from './DetailSummary'

export default function Result() {
  const buttonStyle = {
    categoryButtonClicked: {
      buttonContainer: 'flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]',
      categoryButton:
        'w-full bg-[#A8A8A8] rounded-tl-[20px] rounded-r-[20px] py-[5px]',
      detailButton: 'w-full bg-[#F4F4F4] rounded-tr-[20px] py-[5px]',
    },
    detailButtonClicked: {
      buttonContainer: 'flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]',
      categoryButton:
        'w-full bg-[#F4F4F4] rounded-tl-[20px] py-[5px] text-center',
      detailButton:
        'w-full bg-[#A8A8A8] rounded-l-[20px] rounded-tr-[20px] py-[5px] text-center',
    },
  }

  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px]'>
      <div className='flex bg-[#F4F4F4] rounded-t-[20px] w-full mb-[20px]'>
        <Link
          href='/dashboard/receipts-income-category'
          className='w-full bg-[#F4F4F4] rounded-tl-[20px] py-[5px] text-center'
        >
          <button>分類</button>
        </Link>
        <Link
          href='/dashboard/receipts-income-details'
          className='w-full bg-[#A8A8A8] rounded-l-[20px] rounded-tr-[20px] py-[5px] text-center'
        >
          <button>明細</button>
        </Link>
      </div>
      <div className='self-start pl-[20px] mb-[20px]'>
        <h2>收入明細</h2>
      </div>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <DetailSummary key={index} category='薪資' />
        ))}
    </div>
  )
}
