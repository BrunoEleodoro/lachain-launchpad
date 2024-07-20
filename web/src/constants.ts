import { Chain, baseSepolia } from 'viem/chains';
// Network Name
// LaChain
// RPC URL
// https://rpc1.mainnet.lachain.network
// Chain Id
// 274
// Currency Symbol
// LAC
// Block Explorer URL
// https://explorer.lachain.network
export const lachain: Chain = {
  id: 274,
  name: 'LaChain',
  rpcUrls: {
    default: {
      http: ['https://rpc1.mainnet.lachain.network'],
    },
  },
  nativeCurrency: {
    name: 'LAC',
    symbol: 'LAC',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'LaChain Explorer',
      url: 'https://explorer.lachain.network',
    },
  },
};

export const EXPECTED_CHAIN = lachain;
