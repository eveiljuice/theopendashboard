import { createPublicClient, http, formatEther, Block, Transaction } from 'viem';
import { mainnet, polygon, arbitrum, optimism } from 'viem/chains';

const chainConfigs = {
  1: mainnet,
  137: polygon,
  42161: arbitrum,
  10: optimism,
};

export interface TransactionData {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  timestamp: number;
  blockNumber: bigint;
}

export async function getRecentTransactions(
  address: string,
  chainId: number,
  blocksToScan: number = 10
): Promise<TransactionData[]> {
  const chain = chainConfigs[chainId as keyof typeof chainConfigs] || mainnet;
  
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  try {
    const currentBlock = await client.getBlockNumber();
    const transactions: TransactionData[] = [];

    // Scan recent blocks
    for (let i = 0; i < blocksToScan; i++) {
      const blockNumber = currentBlock - BigInt(i);
      
      try {
        const block = await client.getBlock({
          blockNumber,
          includeTransactions: true,
        });

        // Filter transactions involving the user's address
        const userTxs = (block.transactions as Transaction[])
          .filter((tx) => {
            const from = tx.from?.toLowerCase();
            const to = tx.to?.toLowerCase();
            const userAddr = address.toLowerCase();
            return from === userAddr || to === userAddr;
          })
          .map((tx) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to || null,
            value: formatEther(tx.value),
            timestamp: Number(block.timestamp),
            blockNumber: block.number,
          }));

        transactions.push(...userTxs);
      } catch (error) {
        console.error(`Error fetching block ${blockNumber}:`, error);
      }
    }

    return transactions.slice(0, 20); // Return max 20 transactions
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
}

