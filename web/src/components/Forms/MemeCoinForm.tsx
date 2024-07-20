import { useState } from 'react';
import { useAccount } from 'wagmi';
import useMemeCoinFactory from '@/hooks/useMemeCoinFactory';
import { parseEther } from 'viem';

export default function MemeCoinForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [ethAmount, setEthAmount] = useState('');

  const { address } = useAccount();

  const isValid = name && symbol && description && imageURL && initialSupply && ethAmount;

  const { disabled, transactionState, onSubmitTransaction } = useMemeCoinFactory({
    arguments: [name, symbol, description, imageURL, parseEther(initialSupply).toString()],
    ethAmount: parseEther(ethAmount)
  });

  console.log('transactionState', transactionState);

  return (
    <form onSubmit={onSubmitTransaction} className="space-y-4 text-white">
      <div>
        <label htmlFor="name" className="block text-sm font-medium ">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="symbol" className="block text-sm font-medium ">Symbol</label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium ">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="imageURL" className="block text-sm font-medium ">Image URL</label>
        <input
          type="url"
          id="imageURL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="initialSupply" className="block text-sm font-medium ">Initial Supply</label>
        <input
          type="number"
          id="initialSupply"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="ethAmount" className="block text-sm font-medium ">ETH Amount for Liquidity</label>
        <input
          type="number"
          id="ethAmount"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        // disabled={disabled || !address || !isValid}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        Create Meme Coin
      </button>
      {transactionState && (
        <p className="mt-2 text-sm text-gray-600">
          {/* {transactionState === 'START' && 'Transaction started...'}
          {transactionState === 'COMPLETE' && 'Transaction completed!'}
          {transactionState === 'OUT_OF_GAS' && 'Transaction failed: Out of gas'} */}
        </p>
      )}
    </form>
  );
}
