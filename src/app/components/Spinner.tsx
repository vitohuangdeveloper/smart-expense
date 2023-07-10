import Image from 'next/image'
import loader from '/public/spinner.gif'

export default function Spinner() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Image src={loader} alt='loading...' />
    </div>
  )
}
