import Image from 'next/image'
import downloadIcon from '/public/download.png'
import calendarIcon from '/public/calendar.png'
import searchIcon from '/public/search.png'
import addIcon from '/public/add-icon.png'
import { Dispatch, SetStateAction, MouseEvent } from 'react'

interface ButtonsProps {
  isClicked: boolean
  setIsClicked: Dispatch<SetStateAction<boolean>>
  category: string
  setCategory: Dispatch<SetStateAction<string>>
}

export default function Buttons(props: ButtonsProps) {
  const buttonStyle = {
    unclicked: 'bg-gray rounded-[25px] px-[25px] py-[10px] cursor-pointer',
    clicked: 'bg-[#9A9A9A] rounded-[25px] px-[25px] py-[10px] cursor-pointer',
  }

  const handleButtonStyle = (event: MouseEvent<HTMLButtonElement>) => {
    const currentClassName = event.currentTarget.className
    if (currentClassName === buttonStyle.clicked) return
    props.setIsClicked(prevState => !prevState)
  }

  const handleResultCategory = (event: MouseEvent<HTMLButtonElement>) => {
    const currentTextContent = `${event.currentTarget.textContent}分類`
    props.setCategory(currentTextContent)
  }

  return (
    <div className='pl-[115px] pt-[115px] pr-[30px] mb-[50px] flex items-center'>
      <div className='flex gap-x-[25px] mr-[25px]'>
        <button
          className={
            props.isClicked ? buttonStyle.unclicked : buttonStyle.clicked
          }
          onClick={event => {
            handleButtonStyle(event)
            handleResultCategory(event)
          }}
        >
          收入
        </button>
        <button
          className={
            props.isClicked ? buttonStyle.clicked : buttonStyle.unclicked
          }
          onClick={event => {
            handleButtonStyle(event)
            handleResultCategory(event)
          }}
        >
          支出
        </button>
      </div>
      <div className='flex gap-x-[15px] mr-auto'>
        <Image src={downloadIcon} alt='download' className='cursor-pointer' />
        <Image src={calendarIcon} alt='calendar' className='cursor-pointer' />
      </div>
      <div>
        <Image src={searchIcon} alt='search' className='cursor-pointer' />
      </div>
      <div className='absolute right-[30px] bottom-[60px] w-[30px]'>
        <Image src={addIcon} alt='add' className='cursor-pointer' />
      </div>
    </div>
  )
}
