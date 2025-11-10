'use client';

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  VStack,
  Heading,
  Text,
  Badge,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { useChainId } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { getUniswapClient } from '@/lib/graph/client';
import { GET_TOP_POOLS, Pool } from '@/lib/graph/queries';

// Mobile pool card component
function PoolCard({ pool }: { pool: Pool }) {
  const tvl = parseFloat(pool.totalValueLockedUSD);
  const volume = parseFloat(pool.volumeUSD);
  const feeTier = parseInt(pool.feeTier) / 10000;

  return (
    <Box
      p={4}
      bg="gray.800"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.700"
      _hover={{
        borderColor: 'brand.400',
        boxShadow: '0 4px 12px rgba(66, 165, 245, 0.15)',
      }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="md">
            {pool.token0.symbol} / {pool.token1.symbol}
          </Text>
          <Badge colorScheme="blue" borderRadius="full" fontSize="xs">
            {feeTier}%
          </Badge>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.400" fontWeight="medium">TVL</Text>
          <Text fontWeight="semibold" color="brand.400">
            ${tvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </Text>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.400" fontWeight="medium">Volume 24h</Text>
          <Text fontWeight="medium">
            ${volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export function FarmingYields() {
  const chainId = useChainId();

  const { data, isLoading, error } = useQuery({
    queryKey: ['uniswap-pools', chainId],
    queryFn: async () => {
      const client = getUniswapClient(chainId);
      const result = await client.request<{ pools: Pool[] }>(GET_TOP_POOLS);
      return result.pools;
    },
    retry: 1,
    staleTime: 60000, // 1 minute
  });

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
          Error loading pools. The subgraph might be unavailable.
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
        Top Uniswap V3 Pools
      </Heading>

      <Box
        bg="gray.800"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.700"
        overflowX="auto"
      >
        {isLoading ? (
          <Box p={8} textAlign="center">
            <Spinner size="lg" color="brand.400" />
            <Text mt={4} color="gray.400">Loading pools...</Text>
          </Box>
        ) : data && data.length > 0 ? (
          <>
            {/* Desktop table view */}
            <Box display={{ base: 'none', lg: 'block' }}>
              <Table variant="simple">
                <Thead>
                  <Tr bg="gray.750">
                    <Th>Pool</Th>
                    <Th>Fee Tier</Th>
                    <Th isNumeric>TVL (USD)</Th>
                    <Th isNumeric>Volume 24h (USD)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((pool) => {
                    const tvl = parseFloat(pool.totalValueLockedUSD);
                    const volume = parseFloat(pool.volumeUSD);
                    const feeTier = parseInt(pool.feeTier) / 10000;

                    return (
                      <Tr 
                        key={pool.id}
                        _hover={{
                          bg: 'gray.750',
                        }}
                        transition="background 0.2s"
                      >
                        <Td>
                          <Text fontWeight="medium">
                            {pool.token0.symbol} / {pool.token1.symbol}
                          </Text>
                        </Td>
                        <Td>
                          <Badge colorScheme="blue" borderRadius="full" fontSize="xs">
                            {feeTier}%
                          </Badge>
                        </Td>
                        <Td isNumeric fontWeight="medium" color="brand.400">
                          ${tvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </Td>
                        <Td isNumeric>
                          ${volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>

            {/* Mobile card view */}
            <VStack
              spacing={3}
              p={4}
              display={{ base: 'flex', lg: 'none' }}
            >
              {data.map((pool) => (
                <PoolCard key={pool.id} pool={pool} />
              ))}
            </VStack>
          </>
        ) : (
          <Box p={8} textAlign="center">
            <Text fontSize="4xl" mb={2}>📭</Text>
            <Text color="gray.400">No pools data available</Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
}
