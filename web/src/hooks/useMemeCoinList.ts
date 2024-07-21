import { useCallback, useEffect, useMemo, useState } from 'react';
import { Abi, TransactionExecutionError, createPublicClient, http, parseEther } from 'viem';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import MemeCoinFactory from '@/abis/MemeCoinFactory.json';
import CustomERC20 from '@/abis/CustomERC20.json';
import { lachain } from '@/constants';

interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  imageURL: string;
  description: string;
}

export default function useMemeCoinList() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: lachain,
        transport: http(lachain.rpcUrls.default.http[0]),
      }),
    [],
  );

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const fetchedLogs = await publicClient.getLogs({
          address: '0x363A64D680706d482378d712379C68d4de1D11B5',
          event: {
            name: 'CoinCreated',
            type: 'event',
            inputs: [
              { type: 'address', indexed: true, name: 'token' },
              { type: 'address', indexed: true, name: 'pair' },
            ],
          },
          fromBlock: 6427539n,
          toBlock: 'latest',
        });

        const tokenInfoPromises = fetchedLogs.map(async (log) => {
          const tokenAddress = log.args.token as string;
          const [name, symbol, imageURL, description] = await Promise.all([
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: CustomERC20.abi,
              functionName: 'name',
            }),
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: CustomERC20.abi,
              functionName: 'symbol',
            }),
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: CustomERC20.abi,
              functionName: 'imageURL',
            }),
            publicClient.readContract({
              address: tokenAddress as `0x${string}`,
              abi: CustomERC20.abi,
              functionName: 'description',
            }),
          ]);

          return {
            address: tokenAddress,
            name: name as string,
            symbol: symbol as string,
            imageURL: imageURL as string,
            description: description as string,
          };
        });

        const tokenInfos = await Promise.all(tokenInfoPromises);
        setTokens(tokenInfos);
      } catch (error) {
        console.error('Error fetching token information:', error);
      }
    };

    fetchTokens();
  }, []); // Empty dependency array ensures this effect runs only once

  return tokens;
}
