'use client';

import { Box, Text, HStack, VStack, Spinner, Skeleton, Badge } from '@chakra-ui/react';
import { useAccount, useBalance, useReadContract, useChainId } from 'wagmi';
import { formatUnits } from 'viem';
import { ERC20_ABI } from '@/lib/constants';
import { memo } from 'react';

interface BalanceCardProps {
  tokenAddress?: `0x${string}`;
  symbol: string;
  name: string;
  decimals?: number;
  isNative?: boolean;
}

function BalanceCardComponent({
  tokenAddress,
  symbol,
  name,
  decimals = 18,
  isNative = false,
}: BalanceCardProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  // Native token balance (ETH, MATIC, etc.)
  const { data: nativeBalance, isLoading: isLoadingNative } = useBalance({
    address,
    query: {
      enabled: isNative && !!address,
    },
  });

  // ERC20 token balance
  const { data: erc20Balance, isLoading: isLoadingERC20 } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !isNative && !!address && !!tokenAddress,
    },
  });

  const isLoading = isNative ? isLoadingNative : isLoadingERC20;

  const formattedBalance = isNative
    ? nativeBalance
      ? parseFloat(formatUnits(nativeBalance.value, decimals)).toFixed(4)
      : '0.0000'
    : erc20Balance
    ? parseFloat(formatUnits(erc20Balance as bigint, decimals)).toFixed(4)
    : '0.0000';

  if (!isConnected) {
    return (
      <Box
        p={6}
        bg="gray.800"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.700"
      >
        <VStack align="stretch" spacing={4}>
          <Skeleton height="20px" width="60%" borderRadius="md" startColor="gray.700" endColor="gray.600" />
          <Skeleton height="40px" width="80%" borderRadius="md" startColor="gray.700" endColor="gray.600" />
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      p={6}
      bg="gray.800"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.700"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        bgGradient: 'linear(to-r, brand.400, brand.600)',
      }}
      _hover={{
        borderColor: 'brand.400',
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(66, 165, 245, 0.2)',
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.400" fontWeight="medium">
            {name}
          </Text>
          <Badge
            colorScheme="brand"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight="bold"
          >
            {symbol}
          </Badge>
        </HStack>
        {isLoading ? (
          <HStack spacing={2}>
            <Spinner size="sm" color="brand.400" />
            <Text fontSize="sm" color="gray.500">Loading...</Text>
          </HStack>
        ) : (
          <HStack spacing={2} flexWrap="wrap">
            <Text 
              fontSize={{ base: '2xl', md: '3xl' }} 
              fontWeight="bold" 
              bgGradient="linear(to-r, white, gray.300)" 
              bgClip="text"
              wordBreak="break-all"
            >
              {formattedBalance}
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" fontWeight="medium">
              {symbol}
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}

export const BalanceCard = memo(BalanceCardComponent);
