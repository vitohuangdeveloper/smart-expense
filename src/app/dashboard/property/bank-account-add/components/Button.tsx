import { SyntheticEvent } from 'react'

interface ButtonProps {
  name: string
  onClick?: (event: SyntheticEvent) => void
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className='bg-primary text-white text-[20px] rounded-full w-[150px] py-[10px]'
      onClick={props.onClick}
    >
      {props.name}
    </button>
  )
}
