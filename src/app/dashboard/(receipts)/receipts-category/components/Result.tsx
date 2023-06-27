import ReceiptSummary from './ReceiptSummary'

interface ResultProps {
  category: string
}

export default function Result(props: ResultProps) {
  return (
    <div className='flex flex-col items-center w-[935px] min-h-[500px] m-auto bg-gray rounded-[20px] pb-[30px]'>
      <div className='flex bg-[#A8A8A8] rounded-t-[20px] w-full mb-[20px]'>
        <button className='w-full bg-[#F4F4F4] rounded-tl-[20px] rounded-r-[20px] py-[5px]'>
          分類
        </button>
        <button className='w-full rounded-tr-[20px]'>明細</button>
      </div>
      <div className='self-start pl-[20px] mb-[20px]'>
        <h2>{props.category}</h2>
      </div>
      {props.category === '收入分類'
        ? Array(6)
            .fill(0)
            .map((_, index) => <ReceiptSummary key={index} category='薪資' />)
        : Array(6)
            .fill(0)
            .map((_, index) => <ReceiptSummary key={index} category='交通' />)}
    </div>
  )
}
