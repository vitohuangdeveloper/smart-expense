import { DocumentData } from 'firebase/firestore'

interface BalanceProps {
  balanceData: DocumentData
}

export default function Balance(props: BalanceProps) {
  const { balance, expense, income } = props.balanceData
  return (
    <div className='min-w-[280px] flex flex-col pt-[20px] pb-[40px] px-[25px] bg-gray rounded-[20px] gap-y-[50px]'>
      <h2>本月總收支</h2>
      <div className='flex flex-col gap-y-[50px]'>
        <div className='flex justify-between items-center pb-[20px] border-b'>
          <p>結餘</p>
          <p>$ {balance}</p>
        </div>
        <div className='flex justify-between items-center pb-[20px] border-b'>
          <p>收入</p>
          <p>$ {income}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p>支出</p>
          <p>$ {expense}</p>
        </div>
      </div>
    </div>
  )
}
