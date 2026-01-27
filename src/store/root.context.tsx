'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import RootStore from '@/store/RootStore'
import apiService from '@/services/apiService'

const StoreContext = createContext<RootStore | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<RootStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = new RootStore(apiService)
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('StoreProvider not found')
  return ctx
}
