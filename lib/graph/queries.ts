import { gql } from 'graphql-request';

// Uniswap V3 Queries
export const GET_TOP_POOLS = gql`
  query GetTopPools {
    pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      totalValueLockedUSD
      volumeUSD
      feeTier
    }
  }
`;

export const GET_USER_POSITIONS = gql`
  query GetUserPositions($owner: String!) {
    positions(where: { owner: $owner }, first: 10) {
      id
      liquidity
      token0 {
        symbol
        decimals
      }
      token1 {
        symbol
        decimals
      }
      pool {
        id
        totalValueLockedUSD
      }
    }
  }
`;

// Aave Queries
export const GET_USER_RESERVES = gql`
  query GetUserReserves($user: String!) {
    userReserves(where: { user: $user }) {
      id
      currentATokenBalance
      currentTotalDebt
      reserve {
        symbol
        name
        decimals
        liquidityRate
        variableBorrowRate
      }
    }
  }
`;

export const GET_RESERVES = gql`
  query GetReserves {
    reserves(first: 10, orderBy: totalLiquidity, orderDirection: desc) {
      id
      symbol
      name
      decimals
      liquidityRate
      variableBorrowRate
      totalLiquidity
      availableLiquidity
    }
  }
`;

// Types
export interface Pool {
  id: string;
  token0: {
    symbol: string;
    name: string;
  };
  token1: {
    symbol: string;
    name: string;
  };
  totalValueLockedUSD: string;
  volumeUSD: string;
  feeTier: string;
}

export interface UserPosition {
  id: string;
  liquidity: string;
  token0: {
    symbol: string;
    decimals: string;
  };
  token1: {
    symbol: string;
    decimals: string;
  };
  pool: {
    id: string;
    totalValueLockedUSD: string;
  };
}

export interface Reserve {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  liquidityRate: string;
  variableBorrowRate: string;
  totalLiquidity: string;
  availableLiquidity: string;
}

export interface UserReserve {
  id: string;
  currentATokenBalance: string;
  currentTotalDebt: string;
  reserve: {
    symbol: string;
    name: string;
    decimals: number;
    liquidityRate: string;
    variableBorrowRate: string;
  };
}

