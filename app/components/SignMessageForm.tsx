'use client'

import { useState } from 'react'

interface SignMessageFormProps {
  walletAddress?: string
}

export function SignMessageForm({ walletAddress }: SignMessageFormProps) {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !walletAddress) return

    try {
      setLoading(true)
      setError(null)
      
      // For demo purposes, we'll simulate a signature
      // In a real implementation, you'd use Web3Auth's signing capabilities
      const mockSignature = `mock_signature_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setSignature(mockSignature)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign message failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Sign Message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message to Sign
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-full btn-primary"
        >
          {loading ? 'Signing...' : 'Sign Message'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {signature && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-white">Signature:</h4>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
            <code className="text-sm break-all">{signature}</code>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(signature)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Copy Signature
          </button>
        </div>
      )}
    </div>
  )
}
