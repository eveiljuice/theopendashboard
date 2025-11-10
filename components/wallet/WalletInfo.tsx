'use client';

import { Box, Text, HStack, VStack, Spinner, IconButton, useToast, Tooltip } from '@chakra-ui/react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { FiCopy } from 'react-icons/fi';
import { memo, useCallback } from 'react';

function WalletInfoComponent() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address,
  });
  const toast = useToast();

  const copyAddress = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: 'Address copied!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [address, toast]);

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
        <Text fontSize={{ base: '3xl', md: '4xl' }} mb={4}>🔐</Text>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" fontWeight="medium" mb={2}>
          Connect Your Wallet
        </Text>
        <Text color="gray.500" fontSize="sm">
          Connect your wallet to view your portfolio and transaction history
        </Text>
      </Box>
    );
  }

  return (
    <Box
      p={{ base: 5, md: 6 }}
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
    >
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontSize="sm" color="gray.400" mb={2} fontWeight="medium">
            Wallet Address
          </Text>
          <HStack spacing={2}>
            <Text 
              fontFamily="mono" 
              fontSize={{ base: 'xs', md: 'sm' }}
              wordBreak="break-all"
              flex="1"
            >
              {address}
            </Text>
            <Tooltip label="Copy address" placement="top">
              <IconButton
                aria-label="Copy address"
                icon={<FiCopy />}
                size="sm"
                variant="ghost"
                colorScheme="brand"
                onClick={copyAddress}
                flexShrink={0}
              />
            </Tooltip>
          </HStack>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.400" mb={2} fontWeight="medium">
            Balance
          </Text>
          {isLoading ? (
            <Spinner size="sm" color="brand.400" />
          ) : (
            <HStack flexWrap="wrap">
              <Text 
                fontSize={{ base: 'xl', md: '2xl' }} 
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.300)"
                bgClip="text"
              >
                {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0.0000'}
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400">
                {balance?.symbol}
              </Text>
            </HStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export const WalletInfo = memo(WalletInfoComponent);
