import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3AuthProvider } from './components/Web3AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solana Web3Auth Template',
  description: 'Next.js template with Web3Auth social login and embedded wallet generation for Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3AuthProvider>
          {children}
        </Web3AuthProvider>
      </body>
    </html>
  )
}
