'use client'

import { useState, useEffect, useCallback } from 'react'
import { LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js'

interface WalletBalanceProps {
  walletAddress?: string
}

export function WalletBalance({ walletAddress }: WalletBalanceProps) {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = useCallback(async () => {
    if (!walletAddress) return

    try {
      setLoading(true)
      setError(null)
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com')
      const publicKey = new PublicKey(walletAddress)
      const balance = await connection.getBalance(publicKey)
      setBalance(balance)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balance')
    } finally {
      setLoading(false)
    }
  }, [walletAddress])

  useEffect(() => {
    fetchBalance()
  }, [walletAddress, fetchBalance])

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Wallet Balance
        </h3>
        {balance !== null ? (
          <div className="text-3xl font-bold text-primary-600">
            {(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL
          </div>
        ) : (
          <div className="text-3xl font-bold text-gray-400">
            {loading ? 'Loading...' : '0.0000 SOL'}
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={fetchBalance}
        disabled={loading}
        className="w-full btn-primary"
      >
        {loading ? 'Refreshing...' : 'Refresh Balance'}
      </button>

      <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
        <p>Network: {process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'}</p>
        <p>Address: {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-8)}</p>
      </div>
    </div>
  )
}
