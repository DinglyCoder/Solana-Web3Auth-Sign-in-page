export interface UserInfo {
  email?: string
  name?: string
  profileImage?: string
  verifier?: string
  verifierId?: string
  typeOfLogin?: string
  aggregateVerifier?: string
  aggregateVerifierId?: string
}

export interface Web3AuthUser {
  userInfo: UserInfo
  accounts: string[]
  isConnected: boolean
  loading: boolean
  error: string | null
}

export interface AuthProvider {
  id: string
  name: string
  icon: string
  color: string
}

export interface SessionData {
  user: UserInfo
  walletAddress: string
  token: string
  expiresAt: number
}

export interface WalletBalance {
  sol: number
  lamports: number
}

export interface TransactionData {
  to: string
  amount: number
  memo?: string
}

export interface SignMessageData {
  message: string
  signature?: string
}

export interface LoginMethod {
  type: 'social' | 'email' | 'sms'
  provider?: string
  email?: string
  phone?: string
}
