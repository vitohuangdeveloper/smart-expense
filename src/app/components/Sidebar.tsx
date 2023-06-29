import menu from '../../../public/menu.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Sidebar() {
  return (
    <div className='flex flex-col gap-y-[60px] items-center w-[90px] h-screen pt-[30px] fixed left-0 top-0 border-r border-[#D9D9D9]'>
      <div>
        <Image src={menu} alt='menu' className='cursor-pointer' />
      </div>
      <div className='flex flex-col gap-y-[35px] items-center'>
        <Link href='#'>資產</Link>
        <Link href='/dashboard/account'>帳戶</Link>
        <Link href='/dashboard/receipts-income-category'>明細</Link>
        <Link href='/dashboard/category-expense'>分類</Link>
        <Link href='#'>預算</Link>
        <Link href='#'>分析</Link>
      </div>
    </div>
  )
}
