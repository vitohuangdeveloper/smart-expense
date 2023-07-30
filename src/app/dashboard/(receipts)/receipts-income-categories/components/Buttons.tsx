import Link from 'next/link'

export default function Buttons() {
  const buttonStyle = {
    unclicked: 'bg-secondGray text-[18px] rounded-full w-[110px] py-[5px] ',
    clicked:
      'bg-primary text-white text-[18px] rounded-full w-[110px] py-[5px] ',
  }

  return (
    <div className='pl-[210px] pt-[95px] pr-[30px] mb-[48px] flex items-center'>
      <div className='flex gap-x-[45px] mr-[25px]'>
        <Link href='/dashboard/receipts-expense-categories'>
          <button className={buttonStyle.unclicked}>支出</button>
        </Link>
        <Link href='/dashboard/receipts-income-categories'>
          <button className={buttonStyle.clicked}>收入</button>
        </Link>
        <Link href='/dashboard/receipts-transfer-categories'>
          <button className={buttonStyle.unclicked}>轉帳</button>
        </Link>
      </div>
    </div>
  )
}
