import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { UID } from '@/app/utils/uid'

interface ExpenseCategoriesObject {
  name?: string
  type?: string
}

export const getReceiptCategoriesSnap = async () => {
  const querySnapshot = await getDocs(
    collection(db, 'users', UID, 'receiptCategories')
  )
  const dataArray: ExpenseCategoriesObject[] = []
  querySnapshot.forEach(doc => {
    dataArray.push(doc.data())
  })
  return dataArray
}
