'use client';

import { VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StakingMetrics } from '@/components/defi/StakingMetrics';
import { FarmingYields } from '@/components/defi/FarmingYields';
import { YieldAnalytics } from '@/components/analytics/YieldAnalytics';
import { Suspense } from 'react';

export default function DeFiPage() {
  return (
    <MainLayout>
      <VStack 
        spacing={8} 
        align="stretch"
        opacity={0}
        animation="fadeIn 0.3s ease-out forwards"
        sx={{
          '@keyframes fadeIn': {
            to: { opacity: 1 }
          }
        }}
      >
        <Suspense fallback={<Box h="200px" />}>
          <YieldAnalytics />
        </Suspense>
        
        <Box
          opacity={0}
          animation="fadeInUp 0.3s ease-out 0.1s forwards"
          sx={{
            '@keyframes fadeInUp': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Tabs 
            colorScheme="brand" 
            variant="soft-rounded"
            size={{ base: 'sm', md: 'md' }}
            isLazy
            lazyBehavior="keepMounted"
          >
            <TabList mb={6} flexWrap="wrap" gap={2}>
              <Tab 
                _selected={{ 
                  bg: 'brand.500',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(66, 165, 245, 0.3)',
                }}
                transition="all 0.2s"
              >
                Your Positions
              </Tab>
              <Tab 
                _selected={{ 
                  bg: 'brand.500',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(66, 165, 245, 0.3)',
                }}
                transition="all 0.2s"
              >
                Top Pools
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <Suspense fallback={<Box h="200px" />}>
                  <StakingMetrics />
                </Suspense>
              </TabPanel>
              <TabPanel px={0}>
                <Suspense fallback={<Box h="200px" />}>
                  <FarmingYields />
                </Suspense>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </MainLayout>
  );
}
