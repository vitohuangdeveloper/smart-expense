interface CategoryProps {
  categoryName: string | undefined
  bgColor: string | undefined
}

export default function Category(props: CategoryProps) {
  const { categoryName, bgColor } = props
  return (
    <div className='flex flex-col items-center'>
      <div
        className={`w-[55px] h-[55px] ${bgColor} rounded-full shadow-md`}
      ></div>
      <p>{categoryName}</p>
    </div>
  )
}
