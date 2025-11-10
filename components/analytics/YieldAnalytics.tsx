'use client';

import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  Heading,
  Progress,
  Text,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useAccount, useChainId } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { getAaveClient, getUniswapClient } from '@/lib/graph/client';
import { GET_USER_RESERVES, GET_USER_POSITIONS, UserReserve, UserPosition } from '@/lib/graph/queries';
import { FiTrendingUp, FiDollarSign, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function YieldAnalytics() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { data: aaveData } = useQuery({
    queryKey: ['aave-analytics', address, chainId],
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

  const { data: uniswapData } = useQuery({
    queryKey: ['uniswap-analytics', address, chainId],
    queryFn: async () => {
      const client = getUniswapClient(chainId);
      const result = await client.request<{ positions: UserPosition[] }>(
        GET_USER_POSITIONS,
        { owner: address?.toLowerCase() }
      );
      return result.positions;
    },
    enabled: !!address && isConnected,
    retry: 1,
  });

  // Calculate total value and average APY
  const calculateMetrics = () => {
    let totalValue = 0;
    let weightedApy = 0;
    let activePositions = 0;

    if (aaveData && aaveData.length > 0) {
      aaveData.forEach((reserve) => {
        const balance = parseFloat(reserve.currentATokenBalance) / Math.pow(10, reserve.reserve.decimals);
        if (balance > 0) {
          const apy = (parseFloat(reserve.reserve.liquidityRate) / 1e27) * 100;
          totalValue += balance;
          weightedApy += balance * apy;
          activePositions++;
        }
      });
    }

    if (uniswapData && uniswapData.length > 0) {
      uniswapData.forEach((position) => {
        const liquidity = parseFloat(position.liquidity);
        if (liquidity > 0) {
          activePositions++;
          // Simplified - would need price data for accurate calculation
          totalValue += liquidity / 1e18;
        }
      });
    }

    const avgApy = totalValue > 0 ? weightedApy / totalValue : 0;

    return {
      totalValue,
      avgApy,
      activePositions,
    };
  };

  const metrics = calculateMetrics();

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
        <Text fontSize={{ base: '3xl', md: '4xl' }} mb={4}>📊</Text>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" fontWeight="medium" mb={2}>
          Connect Your Wallet
        </Text>
        <Text color="gray.500" fontSize="sm">
          Connect your wallet to see yield analytics
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
        Yield Analytics
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
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
              bgGradient: 'linear(to-r, blue.400, blue.600)',
            }}
            _hover={{
              borderColor: 'blue.400',
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(66, 153, 225, 0.2)',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <Stat>
              <HStack mb={2}>
                <Icon as={FiActivity} color="blue.400" boxSize={5} />
                <StatLabel color="gray.400" fontWeight="medium">Total Positions</StatLabel>
              </HStack>
              <StatNumber 
                fontSize={{ base: '2xl', md: '3xl' }}
                bgGradient="linear(to-r, white, gray.300)"
                bgClip="text"
              >
                {metrics.activePositions}
              </StatNumber>
              <StatHelpText color="gray.500" fontSize="sm">Active DeFi positions</StatHelpText>
            </Stat>
          </Box>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
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
              <HStack mb={2}>
                <Icon as={FiDollarSign} color="green.400" boxSize={5} />
                <StatLabel color="gray.400" fontWeight="medium">Estimated Value</StatLabel>
              </HStack>
              <StatNumber 
                fontSize={{ base: '2xl', md: '3xl' }}
                bgGradient="linear(to-r, white, gray.300)"
                bgClip="text"
              >
                ${metrics.totalValue.toFixed(2)}
              </StatNumber>
              <StatHelpText color="gray.500" fontSize="sm">
                <StatArrow type="increase" />
                Approximate
              </StatHelpText>
            </Stat>
          </Box>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
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
              bgGradient: 'linear(to-r, brand.400, brand.600)',
            }}
            _hover={{
              borderColor: 'brand.400',
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(66, 165, 245, 0.2)',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <Stat>
              <HStack mb={2}>
                <Icon as={FiTrendingUp} color="brand.400" boxSize={5} />
                <StatLabel color="gray.400" fontWeight="medium">Average APY</StatLabel>
              </HStack>
              <StatNumber 
                fontSize={{ base: '2xl', md: '3xl' }}
                bgGradient="linear(to-r, white, gray.300)"
                bgClip="text"
              >
                {metrics.avgApy.toFixed(2)}%
              </StatNumber>
              <StatHelpText color="gray.500" fontSize="sm">Weighted average</StatHelpText>
            </Stat>
          </Box>
        </MotionBox>
      </SimpleGrid>

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
          bgGradient: 'linear(to-r, purple.400, pink.600)',
        }}
      >
        <VStack align="stretch" spacing={4}>
          <Heading 
            size={{ base: 'sm', md: 'md' }} 
            color="gray.100"
            bgGradient="linear(to-r, white, gray.300)"
            bgClip="text"
          >
            APY Distribution
          </Heading>

          {aaveData && aaveData.length > 0 ? (
            aaveData
              .filter((r) => parseFloat(r.currentATokenBalance) > 0)
              .map((reserve) => {
                const apy = (parseFloat(reserve.reserve.liquidityRate) / 1e27) * 100;
                return (
                  <Box key={reserve.id}>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" color="gray.300" fontWeight="medium">
                        {reserve.reserve.symbol}
                      </Text>
                      <Text fontSize="sm" fontWeight="bold" color="green.400">
                        {apy.toFixed(2)}%
                      </Text>
                    </HStack>
                    <Progress
                      value={Math.min(apy, 100)}
                      colorScheme="green"
                      size="sm"
                      borderRadius="full"
                    />
                  </Box>
                );
              })
          ) : (
            <Box textAlign="center" py={4}>
              <Text fontSize="3xl" mb={2}>📊</Text>
              <Text color="gray.400" fontSize="sm">
                No active positions with APY data
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}
