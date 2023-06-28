import profile from '../../../public/profile.png'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  title: string
}

export default function Header(props: HeaderProps) {
  return (
    <div className='flex items-center absolute top-0 right-0 z-10 w-[calc(100vw_-_90px)] h-[80px] px-[30px] border-b border-[#D9D9D9]'>
      <h1 className='mr-auto'>{props.title}</h1>
      <div>
        <Link href='#'>
          <Image src={profile} alt='profile' priority={false} />
        </Link>
      </div>
    </div>
  )
}
