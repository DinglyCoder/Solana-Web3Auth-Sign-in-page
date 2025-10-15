'use client'

import { useWeb3Auth } from './hooks/useWeb3Auth'
import { LoginModal } from './components/LoginModal'
import { UserProfile } from './components/UserProfile'
import { WalletActions } from './components/WalletActions'
import { ProtectedRoute } from './components/ProtectedRoute'

export default function Home() {
  const { isConnected, userInfo, accounts } = useWeb3Auth()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Solana Web3Auth Template
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Social login and embedded wallet generation for Solana dApps
            </p>
          </header>

          {!isConnected ? (
            <div className="flex justify-center">
              <LoginModal />
            </div>
          ) : (
            <ProtectedRoute>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <UserProfile 
                    userInfo={userInfo} 
                    walletAddress={accounts?.[0]} 
                  />
                </div>
                <div className="space-y-6">
                  <WalletActions walletAddress={accounts?.[0]} />
                </div>
              </div>
            </ProtectedRoute>
          )}

          <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
            <p>
              Built with{' '}
              <a 
                href="https://web3auth.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Web3Auth
              </a>{' '}
              and{' '}
              <a 
                href="https://solana.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Solana
              </a>
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}
