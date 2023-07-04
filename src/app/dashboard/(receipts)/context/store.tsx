'use client'

import { useEffect } from 'react'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { UID } from '@/app/utils/uid'

import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext<DocumentData>([])

export const GlobalContextProvider = ({ children }: DocumentData) => {
  const [allReceipts, setAllReceipts] = useState<DocumentData[]>([])

  useEffect(() => {
    const getAllReceipts = async () => {
      const querySnapshot = await getDocs(
        collection(
          db,
          'users',
          UID,
          'accounts',
          '1PGHC5Omw07rIS5qusUe',
          'receipts'
        )
      )
      const receiptsArray: DocumentData[] = []

      querySnapshot.forEach(doc => {
        receiptsArray.push(doc.data())
      })
      setAllReceipts(receiptsArray)
    }
    getAllReceipts()
  }, [])

  return (
    <GlobalContext.Provider value={{ allReceipts }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
