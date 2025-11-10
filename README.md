# The Open Dashboard - Web3 Wallet Analytics Dashboard 💻

A comprehensive Web3 application for tracking token balances, transaction history, DeFi positions, and yield analytics across multiple blockchain networks.

## ✨ Features

- **Wallet Connection**: MetaMask and WalletConnect support
- **Multi-chain Support**: Ethereum, Polygon, Arbitrum, Optimism
- **Token Balances**: Native tokens (ETH, MATIC) + ERC20 tokens (USDC, USDT, DAI, WETH)
- **Transaction History**: Scans recent blocks with address filtering
- **DeFi Metrics**: 
  - Aave positions (staking, lending, APY)
  - Top Uniswap V3 pools (liquidity, volumes)
  - Yield analytics (total value, average APY)

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, React 19
- **Web3**: Wagmi v2, Viem v2
- **UI**: Chakra UI v2
- **Data**: The Graph (GraphQL), React Query
- **Styling**: Emotion

## 📋 Prerequisites

Before installation, ensure you have:

- **Node.js**: version 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**
- **Browser with Web3 wallet**: MetaMask, Coinbase Wallet, etc.

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/eveiljuice/theopendashboard.git
cd theopendashboard
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your WalletConnect Project ID:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

#### How to get WalletConnect Project ID:

1. Go to https://cloud.walletconnect.com/
2. Sign up or log in
3. Create a new project
4. Copy the Project ID from project settings
5. Paste it into `.env.local`

**Note**: Without Project ID, the app will work only with MetaMask/Injected providers. WalletConnect will not be available.

### 4. Run development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will open at [http://localhost:3000](http://localhost:3000)

### 5. Connect your wallet

1. Open the application in your browser
2. Make sure you have MetaMask or another Web3 wallet installed
3. Click the "Connect Wallet" button in the top right corner
4. Select MetaMask or WalletConnect
5. Confirm the connection in your wallet

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page (Dashboard)
│   ├── transactions/        # Transaction history page
│   ├── defi/               # DeFi metrics page
│   ├── providers.tsx        # Web3 providers
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── wallet/             # Wallet components
│   │   ├── ConnectButton.tsx
│   │   ├── NetworkSwitcher.tsx
│   │   └── WalletInfo.tsx
│   ├── dashboard/          # Dashboard components
│   │   ├── BalanceCard.tsx
│   │   └── TokenBalances.tsx
│   ├── transactions/       # Transaction components
│   │   └── TransactionHistory.tsx
│   ├── defi/              # DeFi components
│   │   ├── StakingMetrics.tsx
│   │   └── FarmingYields.tsx
│   ├── analytics/         # Analytics
│   │   └── YieldAnalytics.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   └── ui/                # UI providers
│       └── provider.tsx
│
├── lib/                    # Utilities and configuration
│   ├── wagmi.ts           # Wagmi configuration
│   ├── constants.ts       # Constants (token addresses, ABI, URLs)
│   ├── getTransactions.ts # Utility for fetching transactions
│   └── graph/             # The Graph integration
│       ├── client.ts      # GraphQL clients
│       └── queries.ts     # GraphQL queries
│
├── .env.example           # Example environment variables
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── next.config.ts         # Next.js configuration
```

## 🌐 Supported Networks

| Network | Chain ID | RPC | Block Explorer |
|------|----------|-----|----------------|
| Ethereum | 1 | Public RPC | etherscan.io |
| Polygon | 137 | Public RPC | polygonscan.com |
| Arbitrum | 42161 | Public RPC | arbiscan.io |
| Optimism | 10 | Public RPC | optimistic.etherscan.io |

## 🔧 Configuration

### Adding Tokens

Edit `lib/constants.ts` to add new tokens:

```typescript
export const TOKENS = {
  ethereum: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    // Add new token
    NEWTOKEN: '0x...',
  },
  // ...
};
```

### Custom RPC URLs

If you want to use your own RPC endpoints (e.g., Infura, Alchemy), add to `.env.local`:

```env
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_KEY
```

And update `lib/wagmi.ts`:

```typescript
transports: {
  [mainnet.id]: http(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL),
  // ...
}
```

## 🎯 Usage

### Viewing Balances

1. Connect your wallet
2. On the home page (Dashboard), you'll see balances for all tokens
3. Switch networks via Network Switcher in the header
4. Balances automatically update when switching networks

### Transaction History

1. Navigate to the "Transactions" page via the sidebar menu
2. The app scans the last 10 blocks
3. You can switch to 50 blocks for deeper scanning
4. Click "Refresh" to update data
5. Click on transaction hash to open block explorer

### DeFi Metrics

1. Navigate to the "DeFi" page
2. **"Your Positions" tab**: your Aave positions with APY
3. **"Top Pools" tab**: top Uniswap V3 pools by TVL
4. **Yield Analytics**: overall statistics for your positions

## ⚠️ Important Notes

### The Graph Subgraphs

The application uses public subgraph endpoints:
- Uniswap V3
- Aave V3

**Note**: Public endpoints may be slow or unavailable. For production, it's recommended to:
1. Use The Graph Studio with your own API key
2. Or run your own graph node

### Public RPC Limits

Public RPCs have rate limits. With a large number of requests, errors may occur. Recommendations:
- Use Infura, Alchemy, or other providers for production
- Configure request caching
- Add fallback transports

### Security

- ❌ Never store private keys in code
- ❌ Don't commit `.env.local` to git
- ✅ Use only public blockchain read methods
- ✅ All transactions are signed in the user's wallet

## 🐛 Troubleshooting

### Wallet won't connect

- Make sure MetaMask is unlocked
- Check that the site is not blocked in wallet settings
- Try reconnecting the wallet

### Balances not showing

- Check your internet connection
- Make sure the correct network is selected
- Try switching networks and switching back

### The Graph errors

- Subgraph may be temporarily unavailable
- Try refreshing the page after a few minutes
- Check subgraph status at https://thegraph.com

### Transaction history is empty

- This is normal if there are no transactions in recent blocks
- Increase the number of scanned blocks to 50
- For full history, use Etherscan API (requires additional development)

## 📦 Production Build

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🔗 Links

- [GitHub Repository](https://github.com/eveiljuice/theopendashboard)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [Chakra UI Documentation](https://chakra-ui.com)
