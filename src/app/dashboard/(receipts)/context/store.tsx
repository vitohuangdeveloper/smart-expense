'use client'

import { useEffect } from 'react'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { UID } from '@/app/utils/uid'

import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext<DocumentData>([])

export const GlobalContextProvider = ({ children }: DocumentData) => {
  const [allReceipts, setAllReceipts] = useState<DocumentData[]>([])
  const [allAccounts, setAllAccounts] = useState<DocumentData[]>([])

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

  useEffect(() => {
    const getAllAccounts = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', UID, 'accounts')
      )
      const accountsArray: DocumentData[] = []
      const accountsIDArray: string[] = []

      querySnapshot.forEach(doc => {
        accountsArray.push(doc.data())
        accountsIDArray.push(doc.id)
      })
      const newAccountsArray = accountsArray.map((item, index) => {
        const newItem = { ...item }
        newItem.id = accountsIDArray[index]
        return newItem
      })
      setAllAccounts(newAccountsArray)
    }
    getAllAccounts()
  }, [])

  return (
    <GlobalContext.Provider value={{ allReceipts, allAccounts }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
