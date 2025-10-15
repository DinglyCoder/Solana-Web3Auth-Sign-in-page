'use client'

import { useWeb3Auth } from '../hooks/useWeb3Auth'
import { LoginModal } from './LoginModal'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isConnected, loading } = useWeb3Auth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="flex justify-center">
        <LoginModal />
      </div>
    )
  }

  return <>{children}</>
}
