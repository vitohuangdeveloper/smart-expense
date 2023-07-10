'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { collection, getDocs, DocumentData } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { db } from '@/app/lib/firebase'
import { auth } from '@/app/lib/firebase'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const GlobalContext = createContext<DocumentData>([])

export const GlobalContextProvider = ({ children }: DocumentData) => {
  const [user, setUser] = useState<User | null>(null)
  const uid = user && user.uid

  const [allAccounts, setAllAccounts] = useState<DocumentData[]>([])
  const [allAccountsReceipts, setAllAccountsReceipts] = useState<
    DocumentData[][] | undefined
  >([])
  const [receiptCategories, setReceiptCategories] = useState<DocumentData[]>([])
  const [budgetDetails, setBudgetDetails] = useState<DocumentData[]>([])

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  const getAllAccountsReceipts = async () => {
    if (!uid) return
    const accountsArray: DocumentData[] = []
    const accountsIDArray: string[] = []

    const accountsQuerySnapshot = await getDocs(
      collection(db, 'users', uid, 'accounts')
    )

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
      const receiptsArray: DocumentData[] = []
      const receiptsQuerySnapshot = await getDocs(
        collection(db, 'users', uid, 'accounts', accountID, 'receipts')
      )
      receiptsQuerySnapshot.forEach(doc => receiptsArray.push(doc.data()))
      return receiptsArray
    }

    const allAccountsReceiptsArray = await Promise.all(
      newAccountsArray.map(account => getReceipts(account.id))
    )
    return allAccountsReceiptsArray
  }

  useEffect(() => {
    if (!uid) return
    const fetchData = async () => {
      const allAccountsReceiptsArray = await getAllAccountsReceipts()
      setAllAccountsReceipts(allAccountsReceiptsArray)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  useEffect(() => {
    if (!uid) return
    const getAllAccounts = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', uid, 'accounts')
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
  }, [uid])

  useEffect(() => {
    if (!uid) return
    const getReceiptCategoriesSnap = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', uid, 'receiptCategories')
      )
      const dataArray: DocumentData[] = []
      querySnapshot.forEach(doc => dataArray.push(doc.data()))
      setReceiptCategories(dataArray)
    }
    getReceiptCategoriesSnap()
  }, [uid])

  useEffect(() => {
    if (!uid) return
    const getBudgetsSnap = async () => {
      const querySnapshot = await getDocs(
        collection(db, 'users', uid, 'budgets')
      )
      const dataArray: DocumentData[] = []
      querySnapshot.forEach(doc => dataArray.push(doc.data()))
      setBudgetDetails(dataArray)
    }
    getBudgetsSnap()
  }, [uid])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [user])

  return (
    <GlobalContext.Provider
      value={{
        user,
        uid,
        googleSignIn,
        logOut,
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
