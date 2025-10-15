# Solana Web3Auth Template

A comprehensive Next.js template that demonstrates Web3Auth integration with Solana, featuring social logins, email passwordless authentication, SMS authentication, and embedded wallet generation.

## Features

- 🔐 **Multiple Authentication Methods**
  - Social login (Google, Twitter, Discord, GitHub)
  - Email passwordless authentication
  - SMS authentication
  - Custom verifier support

- 💼 **Embedded Wallet Generation**
  - Automatic wallet creation for new users
  - Secure key management via Web3Auth
  - Solana mainnet/devnet support

- 🛡️ **Session Management**
  - JWT-based session handling
  - Persistent sessions across page refreshes
  - Secure cookie management

- 🚦 **Route Protection**
  - Middleware-based authentication
  - Protected routes and components
  - Automatic redirects

- 💰 **Wallet Functionality**
  - Balance checking
  - Message signing
  - Transaction signing
  - SOL transfers

- 🎨 **Modern UI**
  - Tailwind CSS styling
  - Responsive design
  - Dark mode support
  - Loading states and error handling

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Web3Auth account ([dashboard.web3auth.io](https://dashboard.web3auth.io))

### Installation

```bash
# Clone the template
npx create-solana-dapp@latest -t gh:solana-foundation/templates/community/web3-auth my-solana-app

# Navigate to project
cd my-solana-app

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Start development server
npm run dev
```

## Web3Auth Dashboard Setup

### 1. Create Web3Auth Account

1. Visit [dashboard.web3auth.io](https://dashboard.web3auth.io)
2. Sign up for a free account
3. Create a new project

### 2. Configure Project Settings

1. **Project Name**: Your dApp name
2. **Project Type**: Web Application
3. **Platform**: Web
4. **Framework**: React/Next.js

### 3. Configure Authentication Providers

Authentication providers are configured directly in the Web3Auth Dashboard, not through environment variables. The Web3Auth React SDK automatically handles the OAuth flows for supported providers.

#### Supported Providers
- **Google**: Configure in Web3Auth Dashboard
- **Twitter**: Configure in Web3Auth Dashboard  
- **Discord**: Configure in Web3Auth Dashboard
- **GitHub**: Configure in Web3Auth Dashboard
- **Email Passwordless**: Configure in Web3Auth Dashboard
- **SMS**: Configure in Web3Auth Dashboard

#### Web3Auth Dashboard Setup

1. Go to [Web3Auth Dashboard](https://dashboard.web3auth.io)
2. Navigate to your project settings
3. Go to "Authentication" section
4. Enable desired social providers
5. Configure OAuth settings for each provider
6. Set up custom verifiers if needed

### 4. Configure Web3Auth Dashboard

1. **General Settings**:
   - Project Name: Your dApp name
   - Project Logo: Upload your logo
   - Whitelist URLs: Add your domain(s)

2. **Authentication Providers**:
   - Enable Google, Twitter, Discord, GitHub
   - Add the Client IDs and Secrets from above steps

3. **Custom Authentication**:
   - Create custom verifiers for advanced use cases
   - Configure JWT settings
   - Set up custom claims

### 5. Environment Configuration

Update your `.env.local` file:

```env
# Web3Auth Configuration
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=your_web3auth_client_id_here
NEXT_PUBLIC_WEB3AUTH_NETWORK=testnet

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# JWT Configuration (for session management)
JWT_SECRET=your_jwt_secret_here
SESSION_DURATION=86400
```

## Custom Verifier Setup

### 1. Create Custom Verifier

1. Go to Web3Auth Dashboard → Custom Authentication
2. Click "Create Verifier"
3. Choose verifier type (JWT, OAuth, etc.)
4. Configure verifier settings

### 2. JWT Verifier Configuration

```javascript
// Example JWT verifier configuration
{
  "verifierName": "your-verifier-name",
  "verifierType": "jwt",
  "jwtConfig": {
    "issuer": "your-jwt-issuer",
    "audience": "your-audience",
    "algorithm": "RS256"
  }
}
```

### 3. OAuth Verifier Configuration

```javascript
// Example OAuth verifier configuration
{
  "verifierName": "your-oauth-verifier",
  "verifierType": "oauth",
  "oauthConfig": {
    "clientId": "your-oauth-client-id",
    "clientSecret": "your-oauth-client-secret",
    "authorizationUrl": "https://your-provider.com/oauth/authorize",
    "tokenUrl": "https://your-provider.com/oauth/token",
    "userInfoUrl": "https://your-provider.com/oauth/userinfo"
  }
}
```

## Security Best Practices

### 1. Environment Variables

- Never commit `.env.local` to version control
- Use strong, unique JWT secrets
- Rotate secrets regularly
- Use different secrets for development and production

### 2. Domain Whitelisting

```env
# Production domains
NEXT_PUBLIC_WHITELISTED_DOMAINS=https://yourdomain.com,https://www.yourdomain.com

# Development domains
NEXT_PUBLIC_WHITELISTED_DOMAINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Session Security

- Use HTTP-only cookies
- Set secure flag in production
- Implement session expiration
- Use CSRF protection

### 4. Private Key Management

- Keys are managed by Web3Auth
- Never store private keys in your application
- Use Web3Auth's secure key management
- Implement proper key rotation

## Migration from Testnet to Mainnet

### 1. Update Web3Auth Configuration

```env
# Change network to mainnet
NEXT_PUBLIC_WEB3AUTH_NETWORK=mainnet

# Update Solana network
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### 2. Update Dashboard Settings

1. Go to Web3Auth Dashboard
2. Switch to mainnet environment
3. Update whitelisted domains
4. Test all authentication flows

### 3. Update Solana Configuration

```typescript
// Update chain config for mainnet
const chainConfig = {
  chainNamespace: "solana",
  chainId: "0x1", // Solana mainnet
  rpcTarget: "https://api.mainnet-beta.solana.com",
  displayName: "Solana Mainnet",
  blockExplorerUrl: "https://explorer.solana.com",
  ticker: "SOL",
  tickerName: "Solana",
}
```

## Troubleshooting

### Common Issues

#### 1. "Invalid Client ID" Error

**Solution**: 
- Verify your Web3Auth Client ID in `.env.local`
- Check that the project is active in Web3Auth Dashboard
- Ensure you're using the correct network (testnet/mainnet)

#### 2. Social Login Not Working

**Solution**:
- Verify OAuth credentials in Web3Auth Dashboard
- Check redirect URIs match exactly
- Ensure OAuth apps are properly configured
- Test with different browsers/incognito mode

#### 3. Session Not Persisting

**Solution**:
- Check JWT_SECRET is set correctly
- Verify cookie settings in production
- Ensure HTTPS is enabled in production
- Check browser cookie settings

#### 4. Wallet Generation Failing

**Solution**:
- Verify Solana RPC URL is accessible
- Check network configuration
- Ensure Web3Auth is properly initialized
- Test with different networks

### Debug Mode

Enable debug logging:

```env
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_WEB3AUTH_DEBUG=true
```

### Network Issues

If experiencing network issues:

1. Check RPC endpoint status
2. Try alternative RPC providers
3. Verify network configuration
4. Test with different networks

## API Reference

### Web3Auth Hooks

```typescript
// useWeb3Auth hook
const {
  isConnected,
  userInfo,
  accounts,
  connection,
  loading,
  error,
  connect,
  disconnect
} = useWeb3Auth()
```

### Session Management

```typescript
// Session API endpoints
GET /api/auth/session     // Get current session
POST /api/auth/session    // Create new session
DELETE /api/auth/session  // Clear session
```

### Wallet Operations

```typescript
// Wallet operations
const { signMessage } = useSignMessage()
const { signTransaction } = useSignTransaction()
const { sendTransaction } = useSendTransaction()
```

## Examples

### Basic Authentication Flow

```typescript
import { useWeb3Auth } from '@/hooks/useWeb3Auth'

function LoginButton() {
  const { connect, isConnected, userInfo } = useWeb3Auth()

  if (isConnected) {
    return <div>Welcome, {userInfo?.name}!</div>
  }

  return <button onClick={connect}>Login</button>
}
```

### Protected Component

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute'

function App() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  )
}
```

### Wallet Operations

```typescript
import { useSignMessage } from '@web3auth/modal/react/solana'

function SignMessage() {
  const { signMessage, data: signature } = useSignMessage()

  const handleSign = async () => {
    await signMessage("Hello, Solana!")
    console.log("Signature:", signature)
  }

  return <button onClick={handleSign}>Sign Message</button>
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- [Web3Auth Documentation](https://web3auth.io/docs)
- [Solana Documentation](https://docs.solana.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/solana-foundation/templates/issues)

## Changelog

### v1.0.0
- Initial release
- Web3Auth integration
- Social login support
- Email/SMS authentication
- Embedded wallet generation
- Session management
- Protected routes
- Wallet operations
