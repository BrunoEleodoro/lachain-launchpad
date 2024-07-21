import { createConfig, http } from 'wagmi';
import { base, baseSepolia, mainnet } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { lachain } from '@/constants';
import { getDefaultConfig } from 'connectkit';

export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
  const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');

  // return createConfig(
  //   getDefaultConfig({
  //     // Your dApps chains
  //     chains: [lachain],
  //     transports: {
  //       // RPC URL for each chain
  //       [lachain.id]: http(lachain.rpcUrls.default.http[0]),
  //     },
  //     // Required API Keys
  //     walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

  //     // Required App Info
  //     appName: 'Lachain Launchpad',

  //     // Optional App Info
  //     appDescription: 'Lachain Launchpad',
  //   }),
  // );
  return createConfig({
    chains: [lachain, baseSepolia],
    connectors: [
     
      coinbaseWallet({
        appName: 'lachain-launchpad',
      }),
    ],
    ssr: true,
    transports: {
      [baseSepolia.id]: http(baseSepoliaUrl),
      [base.id]: http(baseUrl),
      [lachain.id]: http(lachain.rpcUrls.default.http[0]),
    },
  });
}
