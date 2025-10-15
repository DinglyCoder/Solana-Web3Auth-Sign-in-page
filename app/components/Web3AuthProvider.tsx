'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Web3Auth } from '@web3auth/modal'
import { SolanaWallet } from '@web3auth/solana-provider'
import { web3AuthConfig } from '../lib/web3auth'
import { Connection, PublicKey } from '@solana/web3.js'
import { UserInfo } from '../types'

interface Web3AuthContextType {
  isConnected: boolean
  userInfo: UserInfo | null
  accounts: string[] | null
  loading: boolean
  error: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  getBalance: () => Promise<number | null>
  signMessage: (message: string) => Promise<string | null>
  sendTransaction: (transaction: any) => Promise<string | null>
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined)

export function Web3AuthProvider({ children }: { children: ReactNode }) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [solanaWallet, setSolanaWallet] = useState<SolanaWallet | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [accounts, setAccounts] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth(web3AuthConfig)
        await web3authInstance.initModal()
        setWeb3auth(web3authInstance)

        // Check if user is already connected
        if (web3authInstance.connected) {
          const provider = web3authInstance.provider
          if (provider) {
            const solanaWalletInstance = new SolanaWallet(provider)
            setSolanaWallet(solanaWalletInstance)
            
            const user = await web3authInstance.getUserInfo()
            const accounts = await solanaWalletInstance.requestAccounts()
            
            setUserInfo(user as UserInfo)
            setAccounts(accounts)
            setIsConnected(true)
          }
        }
      } catch (err) {
        console.error('Web3Auth initialization failed:', err)
        setError(err instanceof Error ? err.message : 'Initialization failed')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  const connect = async () => {
    if (!web3auth) {
      setError('Web3Auth not initialized')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const provider = await web3auth.connect()
      if (provider) {
        const solanaWalletInstance = new SolanaWallet(provider)
        setSolanaWallet(solanaWalletInstance)
        
        const user = await web3auth.getUserInfo()
        const accounts = await solanaWalletInstance.requestAccounts()
        
        setUserInfo(user as UserInfo)
        setAccounts(accounts)
        setIsConnected(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
    } finally {
      setLoading(false)
    }
  }

  const disconnect = async () => {
    if (!web3auth) return

    try {
      setLoading(true)
      setError(null)

      await web3auth.logout()
      setSolanaWallet(null)
      setUserInfo(null)
      setAccounts(null)
      setIsConnected(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disconnection failed')
    } finally {
      setLoading(false)
    }
  }

  const getBalance = async (): Promise<number | null> => {
    if (!solanaWallet || !accounts || accounts.length === 0) return null

    try {
      const connection = new Connection(web3AuthConfig.chainConfig.rpcTarget)
      const balance = await connection.getBalance(new PublicKey(accounts[0]))
      return balance / 1e9 // Convert lamports to SOL
    } catch (err) {
      console.error('Failed to get balance:', err)
      return null
    }
  }

  const signMessage = async (message: string): Promise<string | null> => {
    if (!solanaWallet) return null

    try {
      const messageBuffer = Buffer.from(message, 'utf8')
      const signature = await solanaWallet.signMessage(messageBuffer)
      return signature.toString('base64')
    } catch (err) {
      console.error('Failed to sign message:', err)
      return null
    }
  }

  const sendTransaction = async (transaction: any): Promise<string | null> => {
    if (!solanaWallet) return null

    try {
      const txHash = await solanaWallet.request({
        method: 'solana_sendTransaction',
        params: {
          transaction: transaction,
        },
      })
      return txHash as string
    } catch (err) {
      console.error('Failed to send transaction:', err)
      return null
    }
  }

  const contextValue: Web3AuthContextType = {
    isConnected,
    userInfo,
    accounts,
    loading,
    error,
    connect,
    disconnect,
    getBalance,
    signMessage,
    sendTransaction,
  }

  return (
    <Web3AuthContext.Provider value={contextValue}>
      {children}
    </Web3AuthContext.Provider>
  )
}

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext)
  if (!context) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider')
  }
  return context
}