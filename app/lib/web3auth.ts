import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base"
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider"

// Get network configuration based on environment
const getNetworkConfig = () => {
  const network = process.env.NEXT_PUBLIC_WEB3AUTH_NETWORK || 'testnet'
  const solanaNetwork = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
  
  if (network === 'mainnet' || solanaNetwork === 'mainnet-beta') {
    return {
      chainId: "0x1", // Solana mainnet
      rpcTarget: "https://api.mainnet-beta.solana.com",
      blockExplorerUrl: "https://explorer.solana.com",
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    }
  } else {
    return {
      chainId: "0x2", // Solana devnet
      rpcTarget: "https://api.devnet.solana.com",
      blockExplorerUrl: "https://explorer.solana.com?cluster=devnet",
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    }
  }
}

const networkConfig = getNetworkConfig()

// Create private key provider for Solana
const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: {
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      chainId: networkConfig.chainId,
      rpcTarget: networkConfig.rpcTarget,
      displayName: "Solana",
      blockExplorerUrl: networkConfig.blockExplorerUrl,
      ticker: "SOL",
      tickerName: "Solana",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    },
  },
})

export const web3AuthConfig = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
  web3AuthNetwork: networkConfig.web3AuthNetwork,
  privateKeyProvider: privateKeyProvider,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    chainId: networkConfig.chainId,
    rpcTarget: networkConfig.rpcTarget,
    displayName: "Solana",
    blockExplorerUrl: networkConfig.blockExplorerUrl,
    ticker: "SOL",
    tickerName: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  uiConfig: {
    appName: "Solana Web3Auth Template",
    mode: "light" as const,
    theme: {
      primary: "#8B5CF6",
    },
    defaultLanguage: "en",
    loginGridCol: 3,
    primaryButton: "externalLogin",
  },
  modalConfig: {
    displayOnExternalLinkEvent: true,
    enableLogging: true,
  },
}
