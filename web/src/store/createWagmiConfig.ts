import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { lachain } from '@/constants';

export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
  const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');

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
