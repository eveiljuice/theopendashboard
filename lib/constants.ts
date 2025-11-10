import { Address } from 'viem';

// ERC20 Token Addresses
export const TOKENS = {
  ethereum: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as Address,
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as Address,
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F' as Address,
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as Address,
  },
  polygon: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as Address,
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address,
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as Address,
    WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' as Address,
  },
  arbitrum: {
    USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' as Address,
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' as Address,
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1' as Address,
    WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' as Address,
  },
  optimism: {
    USDC: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607' as Address,
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58' as Address,
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1' as Address,
    WETH: '0x4200000000000000000000000000000000000006' as Address,
  },
} as const;

// ERC20 ABI (minimal for balanceOf)
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
] as const;

// The Graph Subgraph Endpoints
export const SUBGRAPH_URLS = {
  uniswapV3: {
    ethereum: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    polygon: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-polygon',
    arbitrum: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-arbitrum',
    optimism: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-optimism',
  },
  aave: {
    ethereum: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3',
    polygon: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon',
    arbitrum: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum',
    optimism: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-optimism',
  },
} as const;

// Block Explorer URLs
export const BLOCK_EXPLORERS = {
  1: 'https://etherscan.io',
  137: 'https://polygonscan.com',
  42161: 'https://arbiscan.io',
  10: 'https://optimistic.etherscan.io',
} as const;

// Chain names
export const CHAIN_NAMES = {
  1: 'Ethereum',
  137: 'Polygon',
  42161: 'Arbitrum',
  10: 'Optimism',
} as const;

