import { SyntheticEvent } from 'react'

interface ButtonProps {
  name: string
  onClick: (event: SyntheticEvent) => void
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className='bg-gray rounded-[20px] px-[30px] py-[10px]'
      onClick={props.onClick}
    >
      {props.name}
    </button>
  )
}
