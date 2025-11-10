'use client';

import { Box, VStack, Button, Icon, useDisclosure, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiActivity, FiTrendingUp, FiMenu } from 'react-icons/fi';
import { memo } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: FiHome },
  { label: 'Transactions', href: '/transactions', icon: FiActivity },
  { label: 'DeFi', href: '/defi', icon: FiTrendingUp },
];

const SidebarContent = memo(function SidebarContent() {
  const pathname = usePathname();

  return (
    <VStack spacing={2} align="stretch">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Button
            key={item.href}
            as={Link}
            href={item.href}
            variant={isActive ? 'solid' : 'ghost'}
            colorScheme={isActive ? 'brand' : 'gray'}
            justifyContent="flex-start"
            leftIcon={<Icon as={item.icon} boxSize={5} />}
            size="lg"
            fontWeight={isActive ? 'semibold' : 'normal'}
            _hover={{
              bg: isActive ? 'brand.500' : 'gray.700',
              transform: 'translateX(4px)',
            }}
            transition="all 0.2s"
            position="relative"
            willChange="transform"
          >
            {item.label}
            {isActive && (
              <Box
                position="absolute"
                left={0}
                top="50%"
                transform="translateY(-50%)"
                w="3px"
                h="60%"
                bg="brand.400"
                borderRadius="0 2px 2px 0"
              />
            )}
          </Button>
        );
      })}
    </VStack>
  );
});

function SidebarComponent() {
  return (
    <Box
      as="aside"
      w="280px"
      bg="gray.800"
      borderRight="1px"
      borderColor="gray.700"
      p={6}
      minH="calc(100vh - 72px)"
      position="sticky"
      top="72px"
      alignSelf="flex-start"
      display={{ base: 'none', lg: 'block' }}
    >
      <SidebarContent />
    </Box>
  );
}

export const Sidebar = memo(SidebarComponent);

function MobileSidebarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Open menu"
        icon={<FiMenu />}
        onClick={onOpen}
        display={{ base: 'flex', lg: 'none' }}
        variant="ghost"
        colorScheme="brand"
        size="lg"
      />
      
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
            <Text bgGradient="linear(to-r, brand.400, brand.600)" bgClip="text" fontWeight="bold">
              DApp Dashboard
            </Text>
          </DrawerHeader>
          <DrawerBody p={6}>
            <Box onClick={onClose}>
              <SidebarContent />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export const MobileSidebar = memo(MobileSidebarComponent);
