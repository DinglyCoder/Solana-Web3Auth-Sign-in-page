'use client'

import { useState } from 'react'
import { WalletBalance } from './WalletBalance'
import { SignMessageForm } from './SignMessageForm'
import { SendTransactionForm } from './SendTransactionForm'

interface WalletActionsProps {
  walletAddress?: string
}

export function WalletActions({ walletAddress }: WalletActionsProps) {
  const [activeTab, setActiveTab] = useState<'balance' | 'sign' | 'send'>('balance')

  if (!walletAddress) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Wallet Actions
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          No wallet connected
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Wallet Actions
      </h2>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('balance')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'balance'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Balance
        </button>
        <button
          onClick={() => setActiveTab('sign')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'sign'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Sign Message
        </button>
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'send'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Send SOL
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'balance' && <WalletBalance walletAddress={walletAddress} />}
        {activeTab === 'sign' && <SignMessageForm walletAddress={walletAddress} />}
        {activeTab === 'send' && <SendTransactionForm walletAddress={walletAddress} />}
      </div>
    </div>
  )
}
