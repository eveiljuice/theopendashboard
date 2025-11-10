'use client';

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useEffect, memo, useCallback } from 'react';

function ConnectButtonComponent() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending, isSuccess } = useConnect();
  const { disconnect } = useDisconnect();
  const toast = useToast();

  // Показываем toast только при успешном подключении, а не при восстановлении из storage
  useEffect(() => {
    if (isSuccess && isConnected && address) {
      toast({
        title: 'Wallet Connected',
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess, toast, isConnected, address]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleConnect = useCallback((connector: any) => {
    connect({ connector });
  }, [connect]);

  if (isConnected && address) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="brand"
          borderRadius="full"
          px={{ base: 3, md: 4 }}
          py={2}
          fontWeight="semibold"
          size={{ base: 'sm', md: 'md' }}
          _hover={{
            transform: 'scale(1.05)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        >
          <HStack spacing={2}>
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg="green.400"
              boxShadow="0 0 8px rgba(72, 187, 120, 0.6)"
            />
            <Text fontSize={{ base: 'xs', md: 'sm' }}>
              {address.slice(0, 6)}...{address.slice(-4)}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList bg="gray.800" borderColor="gray.700">
          <MenuItem
            bg="gray.800"
            _hover={{ bg: 'gray.700' }}
            onClick={handleDisconnect}
          >
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Menu>
      <MenuButton 
        as={Button} 
        colorScheme="brand" 
        isLoading={isPending}
        size={{ base: 'sm', md: 'md' }}
        borderRadius="full"
        px={{ base: 3, md: 4 }}
        fontWeight="semibold"
      >
        Connect Wallet
      </MenuButton>
      <MenuList bg="gray.800" borderColor="gray.700">
        {connectors.map((connector) => (
          <MenuItem
            key={connector.id}
            bg="gray.800"
            _hover={{ bg: 'gray.700' }}
            onClick={() => handleConnect(connector)}
          >
            <Box>
              <Text fontWeight="medium">{connector.name}</Text>
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export const ConnectButton = memo(ConnectButtonComponent);
