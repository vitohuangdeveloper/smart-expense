'use client'

import { toast } from 'react-toastify'

const notify = () => {
  toast.success('🦄 Wow so easy!', {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

export default function Toast() {
  return (
    <div className='pt-[180px] pl-[150px] w-[500px] m-auto text-center'>
      <button
        className='text-white bg-primary py-[10px] w-[150px] rounded-full text-[24px]'
        onClick={notify}
      >
        Notify
      </button>
    </div>
  )
}
