import Image from 'next/image'
import Link from 'next/link'
import downloadIcon from '/public/download.png'
import calendarIcon from '/public/calendar.png'
import searchIcon from '/public/search.png'
import addIcon from '/public/add-icon.png'

export default function Buttons() {
  const buttonStyle = {
    unclicked: 'bg-gray rounded-[25px] px-[25px] py-[10px] cursor-pointer',
    clicked: 'bg-[#9A9A9A] rounded-[25px] px-[25px] py-[10px] cursor-pointer',
  }

  return (
    <div className='pl-[115px] pt-[115px] pr-[30px] mb-[50px] flex items-center'>
      <div className='flex gap-x-[25px] mr-[25px]'>
        <Link href='/dashboard/receipts-income-category'>
          <button className={buttonStyle.unclicked}>收入</button>
        </Link>
        <Link href='/dashboard/receipts-expense-category'>
          <button className={buttonStyle.clicked}>支出</button>
        </Link>
        <Link href='/dashboard/receipts-transfer-category'>
          <button className={buttonStyle.unclicked}>轉帳</button>
        </Link>
      </div>
      <div className='flex gap-x-[15px] mr-auto'>
        <Image src={downloadIcon} alt='download' className='cursor-pointer' />
        <Image src={calendarIcon} alt='calendar' className='cursor-pointer' />
      </div>
      <div>
        <Image src={searchIcon} alt='search' className='cursor-pointer' />
      </div>
      <div className='absolute right-[30px] bottom-[60px] w-[30px]'>
        <Link href='/dashboard/receipts-expense-add-item'>
          <Image src={addIcon} alt='add' className='cursor-pointer' />
        </Link>
      </div>
    </div>
  )
}
