'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { TransactionHistory } from '@/components/transactions/TransactionHistory';
import { Box } from '@chakra-ui/react';

export default function TransactionsPage() {
  return (
    <MainLayout>
      <Box
        opacity={0}
        animation="fadeInUp 0.3s ease-out forwards"
        sx={{
          '@keyframes fadeInUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <TransactionHistory />
      </Box>
    </MainLayout>
  );
}
