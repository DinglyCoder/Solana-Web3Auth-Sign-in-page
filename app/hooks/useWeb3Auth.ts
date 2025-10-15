'use client'

import { useWeb3Auth as useWeb3AuthContext } from '../components/Web3AuthProvider'

export function useWeb3Auth() {
  return useWeb3AuthContext()
}