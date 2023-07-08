'use client'

import { useEffect } from 'react'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { UID } from '@/app/utils/uid'

import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext<DocumentData>([])

export const GlobalContextProvider = ({ children }: DocumentData) => {
  const [allAccounts, setAllAccounts] = useState<DocumentData[]>([])
  const [allAccountsReceipts, setAllAccountsReceipts] = useState<
    DocumentData[][]
  >([])
  const [receiptCategories, setReceiptCategories] = useState<DocumentData[]>([])
  const [budgetDetails, setBudgetDetails] = useState<DocumentData[]>([])

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

  useEffect(() => {
    const getAllAccountsReceipts = async () => {
      const accountsQuerySnapshot = await getDocs(
        collection(db, 'users', UID, 'accounts')
      )
      const accountsArray: DocumentData[] = []
      const accountsIDArray: string[] = []

      accountsQuerySnapshot.forEach(doc => {
        accountsArray.push(doc.data())
        accountsIDArray.push(doc.id)
      })

      const newAccountsArray = accountsArray.map((item, index) => {
        const newItem = { ...item }
        newItem.id = accountsIDArray[index]
        return newItem
      })

      const getReceipts = async (accountID: string) => {
        const receiptsQuerySnapshot = await getDocs(
          collection(db, 'users', UID, 'accounts', accountID, 'receipts')
        )
        const receiptsArray: DocumentData[] = []
        receiptsQuerySnapshot.forEach(doc => receiptsArray.push(doc.data()))
        return receiptsArray
      }

      let allAccountsReceipts = []
      for (let i = 0; i < newAccountsArray.length; i++) {
        const receiptsArrayPromise = getReceipts(newAccountsArray[i].id)
        let receiptsArray: DocumentData[] = []
        const response = await receiptsArrayPromise
        receiptsArray.push(response)
        allAccountsReceipts.push(receiptsArray)
      }

      setAllAccountsReceipts(allAccountsReceipts)
    }
    getAllAccountsReceipts()
  }, [])

  useEffect(() => {
    const getReceiptCategoriesSnap = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', UID, 'receiptCategories')
      )
      const dataArray: DocumentData[] = []
      querySnapshot.forEach(doc => dataArray.push(doc.data()))
      setReceiptCategories(dataArray)
    }
    getReceiptCategoriesSnap()
  }, [])

  useEffect(() => {
    const getBudgetsSnap = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', UID, 'budgets')
      )
      const dataArray: DocumentData[] = []
      querySnapshot.forEach(doc => dataArray.push(doc.data()))
      setBudgetDetails(dataArray)
    }
    getBudgetsSnap()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        allAccounts,
        allAccountsReceipts,
        setAllAccountsReceipts,
        receiptCategories,
        budgetDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
