'use client';

import { SimpleGrid, Heading, VStack, Box } from '@chakra-ui/react';
import { useChainId } from 'wagmi';
import { BalanceCard } from './BalanceCard';
import { TOKENS, CHAIN_NAMES } from '@/lib/constants';
import { memo } from 'react';

const chainTokenMap: Record<number, any> = {
  1: TOKENS.ethereum,
  137: TOKENS.polygon,
  42161: TOKENS.arbitrum,
  10: TOKENS.optimism,
};

const nativeTokens: Record<number, { symbol: string; name: string }> = {
  1: { symbol: 'ETH', name: 'Ethereum' },
  137: { symbol: 'MATIC', name: 'Polygon' },
  42161: { symbol: 'ETH', name: 'Arbitrum ETH' },
  10: { symbol: 'ETH', name: 'Optimism ETH' },
};

function TokenBalancesComponent() {
  const chainId = useChainId();
  const tokens = chainTokenMap[chainId] || chainTokenMap[1];
  const nativeToken = nativeTokens[chainId] || nativeTokens[1];

  return (
    <VStack align="stretch" spacing={6}>
      <Heading 
        size={{ base: 'md', md: 'lg' }} 
        color="gray.100"
        bgGradient="linear(to-r, white, gray.300)"
        bgClip="text"
      >
        Token Balances - {CHAIN_NAMES[chainId as keyof typeof CHAIN_NAMES]}
      </Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {/* Native Token */}
        <Box
          opacity={0}
          animation="fadeInUp 0.3s ease-out forwards"
          sx={{
            '@keyframes fadeInUp': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <BalanceCard
            symbol={nativeToken.symbol}
            name={nativeToken.name}
            isNative
          />
        </Box>

        {/* ERC20 Tokens */}
        {Object.entries(tokens).map(([key, address], index) => (
          <Box
            key={key}
            opacity={0}
            animation={`fadeInUp 0.3s ease-out ${(index + 1) * 0.05}s forwards`}
            sx={{
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            <BalanceCard
              tokenAddress={address as `0x${string}`}
              symbol={key}
              name={key}
              decimals={key === 'USDC' || key === 'USDT' ? 6 : 18}
            />
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export const TokenBalances = memo(TokenBalancesComponent);
