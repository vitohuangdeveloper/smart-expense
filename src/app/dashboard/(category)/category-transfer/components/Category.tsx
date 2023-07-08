import Image, { StaticImageData } from 'next/image'

interface CategoryProps {
  src: StaticImageData
  categoryName: string | undefined
}

export default function Category(props: CategoryProps) {
  return (
    <div className='flex flex-col items-center'>
      <div>
        <Image src={props.src} alt='category icon' className='cursor-pointer' />
      </div>
      <p>{props.categoryName}</p>
    </div>
  )
}
