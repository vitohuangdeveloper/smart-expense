import Image from 'next/image'
import Link from 'next/link'
import addIcon from '/public/add-icon.png'

export default function Buttons() {
  const buttonStyle = {
    unclicked: 'bg-secondGray text-[24px] rounded-full w-[150px] py-[10px]',
    clicked:
      'bg-primary text-[#fff] text-[24px] rounded-full w-[150px] py-[10px]',
  }

  return (
    <div className='pl-[210px] mt-[180px] pr-[30px] mb-[110px] flex items-center'>
      <div className='flex gap-x-[45px] mr-[25px]'>
        <Link href='/dashboard/receipts-expense-details'>
          <button className={buttonStyle.clicked}>支出</button>
        </Link>
        <Link href='/dashboard/receipts-income-details'>
          <button className={buttonStyle.unclicked}>收入</button>
        </Link>
        <Link href='/dashboard/receipts-transfer-details'>
          <button className={buttonStyle.unclicked}>轉帳</button>
        </Link>
      </div>
    </div>
  )
}
