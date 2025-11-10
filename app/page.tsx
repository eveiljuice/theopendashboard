'use client';

import { VStack } from '@chakra-ui/react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WalletInfo } from '@/components/wallet/WalletInfo';
import { TokenBalances } from '@/components/dashboard/TokenBalances';

export default function Home() {
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
        <WalletInfo />
        <TokenBalances />
      </VStack>
    </MainLayout>
  );
}
