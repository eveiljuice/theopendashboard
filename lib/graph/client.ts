import { GraphQLClient } from 'graphql-request';
import { SUBGRAPH_URLS } from '@/lib/constants';

export function getUniswapClient(chainId: number) {
  const urls = SUBGRAPH_URLS.uniswapV3;
  let url: string;

  switch (chainId) {
    case 1:
      url = urls.ethereum;
      break;
    case 137:
      url = urls.polygon;
      break;
    case 42161:
      url = urls.arbitrum;
      break;
    case 10:
      url = urls.optimism;
      break;
    default:
      url = urls.ethereum;
  }

  return new GraphQLClient(url);
}

export function getAaveClient(chainId: number) {
  const urls = SUBGRAPH_URLS.aave;
  let url: string;

  switch (chainId) {
    case 1:
      url = urls.ethereum;
      break;
    case 137:
      url = urls.polygon;
      break;
    case 42161:
      url = urls.arbitrum;
      break;
    case 10:
      url = urls.optimism;
      break;
    default:
      url = urls.ethereum;
  }

  return new GraphQLClient(url);
}

