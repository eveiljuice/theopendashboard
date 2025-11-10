'use client';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
  HStack,
  Text,
  Icon,
} from '@chakra-ui/react';
import { useChainId, useSwitchChain } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { FiChevronDown } from 'react-icons/fi';
import { memo, useCallback } from 'react';

const chains = [
  { ...mainnet, icon: '⟠', color: 'purple' },
  { ...polygon, icon: '🔷', color: 'purple' },
  { ...arbitrum, icon: '🔵', color: 'blue' },
  { ...optimism, icon: '🔴', color: 'red' },
];

function NetworkSwitcherComponent() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const currentChain = chains.find((c) => c.id === chainId) || chains[0];

  const handleSwitchChain = useCallback((chainId: number) => {
    switchChain({ chainId });
  }, [switchChain]);

  return (
    <Menu>
      <MenuButton 
        as={Button} 
        variant="outline" 
        colorScheme="brand"
        size={{ base: 'sm', md: 'md' }}
        rightIcon={<Icon as={FiChevronDown} />}
        borderRadius="full"
        px={{ base: 2, md: 3 }}
      >
        <HStack spacing={2}>
          <Text fontSize={{ base: 'md', md: 'lg' }}>{currentChain.icon}</Text>
          <Text display={{ base: 'none', md: 'block' }} fontSize="sm">
            {currentChain.name}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList bg="gray.800" borderColor="gray.700" minW={{ base: '200px', md: '240px' }}>
        {chains.map((chain) => (
          <MenuItem
            key={chain.id}
            bg="gray.800"
            _hover={{ bg: 'gray.700' }}
            onClick={() => handleSwitchChain(chain.id)}
          >
            <HStack spacing={3} width="100%">
              <Text fontSize="xl">{chain.icon}</Text>
              <Text flex="1" fontSize="sm">{chain.name}</Text>
              {chainId === chain.id && (
                <Badge colorScheme="green" borderRadius="full" fontSize="xs">
                  Active
                </Badge>
              )}
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export const NetworkSwitcher = memo(NetworkSwitcherComponent);
