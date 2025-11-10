'use client';

import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  VStack,
  Heading,
  Text,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { useAccount, useChainId } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { getAaveClient } from '@/lib/graph/client';
import { GET_USER_RESERVES, UserReserve } from '@/lib/graph/queries';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function StakingMetrics() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { data, isLoading, error } = useQuery({
    queryKey: ['aave-reserves', address, chainId],
    queryFn: async () => {
      const client = getAaveClient(chainId);
      const result = await client.request<{ userReserves: UserReserve[] }>(
        GET_USER_RESERVES,
        { user: address?.toLowerCase() }
      );
      return result.userReserves;
    },
    enabled: !!address && isConnected,
    retry: 1,
  });

  if (!isConnected) {
    return (
      <Box
        p={{ base: 6, md: 8 }}
        bg="gray.800"
        borderRadius="xl"
        borderWidth="2px"
        borderColor="gray.700"
        borderStyle="dashed"
        textAlign="center"
      >
        <Text fontSize={{ base: '3xl', md: '4xl' }} mb={4}>🏦</Text>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" fontWeight="medium" mb={2}>
          Connect Your Wallet
        </Text>
        <Text color="gray.500" fontSize="sm">
          Connect your wallet to see your DeFi positions
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        p={6}
        bg="gray.800"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.700"
      >
        <Text color="red.400">
          Error loading data. The subgraph might be unavailable.
        </Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      <Heading 
        size={{ base: 'md', md: 'lg' }} 
        color="gray.100"
        bgGradient="linear(to-r, white, gray.300)"
        bgClip="text"
      >
        Aave Positions
      </Heading>

      {isLoading ? (
        <Box textAlign="center" py={8}>
          <Spinner size="lg" color="brand.400" />
          <Text mt={4} color="gray.400">Loading positions...</Text>
        </Box>
      ) : data && data.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {data.map((reserve, index) => {
            const balance = parseFloat(reserve.currentATokenBalance);
            const debt = parseFloat(reserve.currentTotalDebt);
            const apy = (parseFloat(reserve.reserve.liquidityRate) / 1e27) * 100;

            if (balance === 0 && debt === 0) return null;

            return (
              <MotionBox
                key={reserve.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
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
                    bgGradient: 'linear(to-r, green.400, green.600)',
                  }}
                  _hover={{
                    borderColor: 'green.400',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(72, 187, 120, 0.2)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <Stat>
                    <HStack justify="space-between" mb={2}>
                      <StatLabel color="gray.400" fontWeight="medium">
                        {reserve.reserve.symbol}
                      </StatLabel>
                      <Badge colorScheme="green" borderRadius="full" fontSize="xs">
                        Active
                      </Badge>
                    </HStack>
                    <StatNumber 
                      fontSize={{ base: '2xl', md: '3xl' }}
                      bgGradient="linear(to-r, white, gray.300)"
                      bgClip="text"
                    >
                      {(balance / Math.pow(10, reserve.reserve.decimals)).toFixed(4)}
                    </StatNumber>
                    <StatHelpText color="green.400" fontWeight="semibold" fontSize="sm">
                      APY: {apy.toFixed(2)}%
                    </StatHelpText>
                    {debt > 0 && (
                      <StatHelpText color="red.400" fontWeight="semibold" fontSize="sm">
                        Debt: {(debt / Math.pow(10, reserve.reserve.decimals)).toFixed(4)}
                      </StatHelpText>
                    )}
                  </Stat>
                </Box>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      ) : (
        <Box
          p={{ base: 6, md: 8 }}
          bg="gray.800"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="gray.700"
          textAlign="center"
        >
          <Text fontSize="4xl" mb={2}>📭</Text>
          <Text color="gray.400">No Aave positions found</Text>
        </Box>
      )}
    </VStack>
  );
}
