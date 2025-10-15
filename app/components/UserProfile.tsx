'use client'

import { UserInfo } from '../types'
import { useWeb3Auth } from '../hooks/useWeb3Auth'

interface UserProfileProps {
  userInfo: UserInfo | null
  walletAddress: string | undefined
}

export function UserProfile({ userInfo, walletAddress }: UserProfileProps) {
  const { disconnect, loading } = useWeb3Auth()

  const handleLogout = async () => {
    try {
      await disconnect()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          User Profile
        </h2>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="btn-secondary text-sm"
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          {userInfo?.profileImage ? (
            <img
              src={userInfo.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {userInfo?.name || 'Anonymous User'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {userInfo?.email || 'No email provided'}
            </p>
          </div>
        </div>

        {/* Auth Method */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Authentication Method
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Provider: {userInfo?.typeOfLogin || 'Unknown'}
            </span>
            {userInfo?.verifier && (
              <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                {userInfo.verifier}
              </span>
            )}
          </div>
        </div>

        {/* Wallet Address */}
        {walletAddress && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Generated Wallet
            </h4>
            <div className="flex items-center space-x-2">
              <code className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded font-mono">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(walletAddress)}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This wallet was automatically generated for you
            </p>
          </div>
        )}

        {/* User Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">User ID:</span>
            <span className="text-sm font-mono">{userInfo?.verifierId || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Verifier:</span>
            <span className="text-sm">{userInfo?.verifier || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Login Type:</span>
            <span className="text-sm">{userInfo?.typeOfLogin || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
