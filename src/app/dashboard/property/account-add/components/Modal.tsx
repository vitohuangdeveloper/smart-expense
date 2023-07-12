import { ChangeEvent, SyntheticEvent } from 'react'
import { setDoc, collection, doc, DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { useGlobalContext } from '@/app/context/store'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import Button from './Button'

interface ModalProps {
  addAccount: {
    accountName: string
    accountCategory: string
    balance: number | string
  }
  setAddAccount: React.Dispatch<
    React.SetStateAction<{
      accountName: string
      accountCategory: string
      balance: number | string
    }>
  >
}

export default function Modal(props: ModalProps) {
  const { uid, setAllAccounts } = useGlobalContext()

  const categories = ['銀行', '電子票證', '手動新增']

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    props.setAddAccount(prev => ({ ...prev, [name]: value }))
  }

  const addAccount = async (event: SyntheticEvent) => {
    event.preventDefault()
    if (
      !props.addAccount.accountName ||
      !props.addAccount.accountCategory ||
      !props.addAccount.balance
    )
      return

    try {
      const accountsRef = doc(collection(db, 'users', uid, 'accounts'))
      await setDoc(accountsRef, {
        name: props.addAccount.accountName,
        category: props.addAccount.accountCategory,
        balance: Number(props.addAccount.balance),
      })
      console.log('Document written with ID: ', accountsRef)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const syncAccountsDisplayed = () => {
    setAllAccounts((prev: DocumentData[]) => [
      ...prev,
      {
        name: props.addAccount.accountName,
        category: props.addAccount.accountCategory,
        balance: Number(props.addAccount.balance),
      },
    ])
  }

  const resetAccountField = () => {
    props.setAddAccount({
      accountName: '',
      accountCategory: '',
      balance: '',
    })
  }

  return (
    <form className='max-w-[600px] m-auto pl-[150px] mt-[180px]'>
      <div className='bg-[#fff] shadow-md rounded-[20px] px-[40px] pt-[30px] pb-[80px] mb-[40px] relative'>
        <Link href='/dashboard/property'>
          <RxCross2 className='absolute top-[40px] right-[40px] text-[20px] font-medium cursor-pointer' />
        </Link>
        <h2 className='text-center text-[24px] mb-[40px] font-medium'>
          新增帳戶
        </h2>
        <div className='flex flex-col mb-[80px] gap-y-[10px]'>
          <label
            htmlFor='accountName'
            className='text-primary font-medium text-[20px]'
          >
            帳戶名稱
          </label>
          <input
            className='outline-0 border-b border-gray text-[18px] placeholder:text-gray'
            placeholder='輸入自訂的帳戶名稱'
            id='accountName'
            name='accountName'
            value={props.addAccount.accountName}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col mb-[80px] gap-y-[10px]'>
          <label
            htmlFor='accountCategory'
            className='text-primary font-medium text-[20px]'
          >
            帳戶種類
          </label>
          <select
            required
            className='outline-0 border-b border-gray invalid:text-gray text-[18px]'
            id='accountCategory'
            name='accountCategory'
            value={props.addAccount.accountCategory}
            onChange={handleChange}
          >
            <option disabled value=''>
              選擇帳戶
            </option>
            {categories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
        </div>
        <div className='flex justify-between border-b border-gray'>
          <label
            htmlFor='balance'
            className='text-[20px] text-primary font-medium'
          >
            總額
          </label>
          <input
            className='outline-0 text-right text-[18px] placeholder:text-gray'
            placeholder='0'
            id='balance'
            name='balance'
            value={props.addAccount.balance}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='text-center'>
        <Button
          name={'新增'}
          onClick={event => {
            addAccount(event)
            syncAccountsDisplayed()
            resetAccountField()
          }}
        />
      </div>
    </form>
  )
}
