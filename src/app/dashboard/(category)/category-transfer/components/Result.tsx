import Link from 'next/link'
import { DocumentData } from 'firebase/firestore'
import { useGlobalContext } from '@/app/context/store'
import { GrAddCircle } from 'react-icons/gr'
import Category from './Category'

const getBgColor = (index: number) => {
  if ((index + 3) % 3 === 0) {
    return 'bg-red'
  } else if ((index + 3) % 3 === 1) {
    return 'bg-green'
  } else if ((index + 3) % 3 === 2) {
    return 'bg-yellow'
  }
}

export default function Result() {
  const { receiptCategories } = useGlobalContext()
  const transferCategories = receiptCategories.filter(
    (receiptCategory: DocumentData) => receiptCategory.type === '轉帳'
  )

  return (
    <div className='pl-[150px] pt-[180px]'>
      <div className='flex flex-col items-center max-w-[900px] h-[572px] m-auto bg-white shadow-md rounded-[20px] pb-[50px] relative'>
        <div className='flex bg-secondGray rounded-t-[20px] w-full mb-[50px]'>
          <Link
            href='/dashboard/category-expense'
            className='w-full bg-secondGray py-[10px] text-[20px] text-center rounded-tl-[20px]'
          >
            <button>支出</button>
          </Link>
          <Link
            href='/dashboard/category-income'
            className='w-full bg-secondGray py-[10px] text-[20px] text-center'
          >
            <button>收入</button>
          </Link>
          <Link
            href='/dashboard/category-transfer'
            className='w-full bg-primary text-white text-[20px] rounded-l-[20px] rounded-tr-[20px] py-[10px] text-center'
          >
            <button>轉帳</button>
          </Link>
        </div>
        <div className='grid w-full grid-cols-3 gap-y-[90px] max-h-[450px] items-center overflow-auto scrollbar-thin scrollbar-thumb-secondGray scrollbar-track-secondary scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg pb-[5px]'>
          {transferCategories &&
            transferCategories.map(
              (transferCategory: DocumentData, index: number) => (
                <Category
                  key={index}
                  categoryName={transferCategory.name}
                  bgColor={getBgColor(index)}
                />
              )
            )}
          <div className='flex flex-col items-center'>
            <Link href='/dashboard/category-transfer-add-item'>
              <GrAddCircle className='w-[55px] h-auto object-cover text-dark' />
            </Link>
            <p>新增</p>
          </div>
        </div>
      </div>
    </div>
  )
}
