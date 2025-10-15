import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string, length: number = 8): string {
  if (!address) return ''
  if (address.length <= length * 2) return address
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export function formatSOL(lamports: number): string {
  return (lamports / 1e9).toFixed(4)
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function isValidSolanaAddress(address: string): boolean {
  try {
    // Basic Solana address validation
    return address.length >= 32 && address.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address)
  } catch {
    return false
  }
}

export function getNetworkDisplayName(network: string): string {
  const networks: Record<string, string> = {
    'mainnet': 'Mainnet',
    'mainnet-beta': 'Mainnet Beta',
    'devnet': 'Devnet',
    'testnet': 'Testnet',
  }
  return networks[network] || network
}

export function getExplorerUrl(address: string, network: string = 'devnet'): string {
  const baseUrl = network === 'mainnet' || network === 'mainnet-beta' 
    ? 'https://explorer.solana.com' 
    : 'https://explorer.solana.com'
  
  return `${baseUrl}/address/${address}?cluster=${network === 'mainnet' || network === 'mainnet-beta' ? 'mainnet-beta' : 'devnet'}`
}
