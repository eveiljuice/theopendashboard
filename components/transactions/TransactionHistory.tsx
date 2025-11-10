'use client';

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Text,
  Spinner,
  VStack,
  Heading,
  Button,
  HStack,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { useAccount, useChainId } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { getRecentTransactions } from '@/lib/getTransactions';
import { BLOCK_EXPLORERS } from '@/lib/constants';
import { useState, memo } from 'react';

// Mobile transaction card component
const TransactionCard = memo(function TransactionCard({ tx, blockExplorerUrl }: any) {
  return (
    <Box
      p={4}
      bg="gray.800"
      borderRadius="lg"
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
          <Text fontSize="xs" color="gray.400" fontWeight="medium">Hash</Text>
          <Link
            href={`${blockExplorerUrl}/tx/${tx.hash}`}
            isExternal
            color="brand.400"
            fontFamily="mono"
            fontSize="xs"
            _hover={{ color: 'brand.300', textDecoration: 'underline' }}
          >
            {tx.hash.slice(0, 10)}...
          </Link>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.400" fontWeight="medium">From</Text>
          <Text fontFamily="mono" fontSize="xs">
            {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
          </Text>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.400" fontWeight="medium">To</Text>
          <Text fontFamily="mono" fontSize="xs">
            {tx.to ? `${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : 'Contract Creation'}
          </Text>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.400" fontWeight="medium">Value</Text>
          <Text fontWeight="semibold" color="brand.400">
            {parseFloat(tx.value).toFixed(4)}
          </Text>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.400" fontWeight="medium">Block</Text>
          <Link
            href={`${blockExplorerUrl}/block/${tx.blockNumber}`}
            isExternal
            color="brand.400"
            fontSize="xs"
          >
            {tx.blockNumber.toString()}
          </Link>
        </HStack>
        
        <Text fontSize="xs" color="gray.500" textAlign="right">
          {new Date(tx.timestamp * 1000).toLocaleString()}
        </Text>
      </VStack>
    </Box>
  );
});

function TransactionHistoryComponent() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [blocksToScan, setBlocksToScan] = useState(10);

  const { data: transactions, isLoading, refetch } = useQuery({
    queryKey: ['transactions', address, chainId, blocksToScan],
    queryFn: () => getRecentTransactions(address!, chainId, blocksToScan),
    enabled: !!address && isConnected,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const blockExplorerUrl = BLOCK_EXPLORERS[chainId as keyof typeof BLOCK_EXPLORERS] || BLOCK_EXPLORERS[1];

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
        <Text fontSize={{ base: '3xl', md: '4xl' }} mb={4}>💸</Text>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" fontWeight="medium" mb={2}>
          Connect Your Wallet
        </Text>
        <Text color="gray.500" fontSize="sm">
          Connect your wallet to see transaction history
        </Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        spacing={4}
      >
        <Heading 
          size={{ base: 'md', md: 'lg' }} 
          color="gray.100"
          bgGradient="linear(to-r, white, gray.300)"
          bgClip="text"
        >
          Recent Transactions
        </Heading>
        <HStack spacing={2} flexWrap="wrap">
          <Button
            size="sm"
            onClick={() => setBlocksToScan(10)}
            variant={blocksToScan === 10 ? 'solid' : 'outline'}
            colorScheme="brand"
          >
            10 blocks
          </Button>
          <Button
            size="sm"
            onClick={() => setBlocksToScan(50)}
            variant={blocksToScan === 50 ? 'solid' : 'outline'}
            colorScheme="brand"
          >
            50 blocks
          </Button>
          <Button
            size="sm"
            onClick={() => refetch()}
            colorScheme="brand"
            variant="outline"
          >
            Refresh
          </Button>
        </HStack>
      </Stack>

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
            <Text mt={4} color="gray.400">
              Scanning last {blocksToScan} blocks...
            </Text>
          </Box>
        ) : transactions && transactions.length > 0 ? (
          <>
            {/* Desktop table view */}
            <Box display={{ base: 'none', lg: 'block' }}>
              <Table variant="simple">
                <Thead>
                  <Tr bg="gray.750">
                    <Th>Hash</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th isNumeric>Value</Th>
                    <Th>Time</Th>
                    <Th>Block</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map((tx) => (
                    <Tr
                      key={tx.hash}
                      _hover={{
                        bg: 'gray.750',
                      }}
                      transition="background 0.2s"
                    >
                      <Td>
                        <Link
                          href={`${blockExplorerUrl}/tx/${tx.hash}`}
                          isExternal
                          color="brand.400"
                          fontFamily="mono"
                          fontSize="sm"
                          _hover={{ color: 'brand.300', textDecoration: 'underline' }}
                        >
                          {tx.hash.slice(0, 10)}...
                        </Link>
                      </Td>
                      <Td fontFamily="mono" fontSize="sm">
                        {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                      </Td>
                      <Td fontFamily="mono" fontSize="sm">
                        {tx.to ? `${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : 'Contract Creation'}
                      </Td>
                      <Td isNumeric fontWeight="medium" color="brand.400">
                        {parseFloat(tx.value).toFixed(4)}
                      </Td>
                      <Td fontSize="sm">
                        {new Date(tx.timestamp * 1000).toLocaleString()}
                      </Td>
                      <Td>
                        <Link
                          href={`${blockExplorerUrl}/block/${tx.blockNumber}`}
                          isExternal
                          color="brand.400"
                          fontSize="sm"
                        >
                          {tx.blockNumber.toString()}
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            {/* Mobile card view */}
            <VStack
              spacing={3}
              p={4}
              display={{ base: 'flex', lg: 'none' }}
            >
              {transactions.map((tx) => (
                <TransactionCard
                  key={tx.hash}
                  tx={tx}
                  blockExplorerUrl={blockExplorerUrl}
                />
              ))}
            </VStack>
          </>
        ) : (
          <Box p={8} textAlign="center">
            <Text fontSize="4xl" mb={2}>📭</Text>
            <Text color="gray.400">
              No transactions found in the last {blocksToScan} blocks
            </Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
}

export const TransactionHistory = memo(TransactionHistoryComponent);
