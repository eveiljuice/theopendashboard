'use client';

import { Box, Flex, Container } from '@chakra-ui/react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ReactNode, memo } from 'react';

function MainLayoutComponent({ children }: { children: ReactNode }) {
  return (
    <Box minH="100vh" bg="gray.900">
      <Header />
      <Flex>
        <Sidebar />
        <Box 
          flex="1" 
          p={{ base: 4, md: 6, lg: 8 }}
          w="100%"
          maxW="100%"
          overflowX="hidden"
        >
          <Container maxW="container.xl" px={0}>
            {children}
          </Container>
        </Box>
      </Flex>
    </Box>
  );
}

export const MainLayout = memo(MainLayoutComponent);
