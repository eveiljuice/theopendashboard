'use client';

import { Box, Flex, Heading, Spacer, HStack } from '@chakra-ui/react';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { NetworkSwitcher } from '@/components/wallet/NetworkSwitcher';
import { MobileSidebar } from './Sidebar';
import { memo } from 'react';

function HeaderComponent() {
  return (
    <Box
      as="header"
      bg="gray.800"
      px={{ base: 4, md: 8 }}
      py={4}
      borderBottom="1px"
      borderColor="gray.700"
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(10px)"
      bgGradient="linear(180deg, gray.800 0%, gray.900 100%)"
    >
      <Flex align="center" gap={3}>
        <MobileSidebar />
        
        <Heading
          size={{ base: 'md', md: 'lg' }}
          bgGradient="linear(to-r, brand.400, brand.600)"
          bgClip="text"
          fontWeight="bold"
          flex={{ base: '1', lg: 'initial' }}
        >
          DApp Dashboard
        </Heading>
        
        <Spacer display={{ base: 'none', lg: 'block' }} />
        
        <HStack spacing={{ base: 2, md: 4 }}>
          <NetworkSwitcher />
          <ConnectButton />
        </HStack>
      </Flex>
    </Box>
  );
}

export const Header = memo(HeaderComponent);
