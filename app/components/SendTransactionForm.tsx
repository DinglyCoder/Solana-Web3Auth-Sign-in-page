'use client'

import { useState } from 'react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Connection } from '@solana/web3.js'

interface SendTransactionFormProps {
  walletAddress?: string
}

export function SendTransactionForm({ walletAddress }: SendTransactionFormProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [signedTransaction, setSignedTransaction] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipient || !amount || !walletAddress) return

    try {
      setLoading(true)
      setError(null)
      
      // For demo purposes, we'll simulate a signed transaction
      // In a real implementation, you'd use Web3Auth's signing capabilities
      const mockTransaction = `mock_transaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setSignedTransaction(mockTransaction)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Send SOL Transaction
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter Solana address..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount (SOL)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="memo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Memo (Optional)
          </label>
          <input
            id="memo"
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Transaction memo..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !recipient || !amount}
          className="w-full btn-primary"
        >
          {loading ? 'Signing Transaction...' : 'Sign Transaction'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {signedTransaction && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-white">Signed Transaction:</h4>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
            <code className="text-sm break-all">{signedTransaction}</code>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Note: This is a signed transaction. You would typically send it to the network using the Solana RPC.
          </p>
        </div>
      )}
    </div>
  )
}
