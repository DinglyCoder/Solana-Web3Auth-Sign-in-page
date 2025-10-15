'use client'

import { useWeb3Auth } from './Web3AuthProvider'

export function LoginModal() {
  const { connect, loading, error } = useWeb3Auth()

  const handleLogin = async () => {
    try {
      await connect()
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div className="card max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Solana Web3Auth
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Connect your wallet to get started
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Web3Auth Plug and Play Login Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium transition-colors duration-200 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? (
          <>
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Connecting...
          </>
        ) : (
          <>
            <span className="mr-3 text-xl">🔐</span>
            Connect with Web3Auth
          </>
        )}
      </button>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Choose from Google, Twitter, Discord, GitHub, Email, and more</p>
      </div>
    </div>
  )
}