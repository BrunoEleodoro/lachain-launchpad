'use client';

import useMemeCoinFactory from '@/hooks/useMemeCoinFactory';
import { ConnectKitButton } from 'connectkit'
import { useState } from 'react';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';

export default function CreatePage() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [initialSupply, setInitialSupply] = useState('100000000000');
  const [ethAmount, setEthAmount] = useState('0.1');
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const { address } = useAccount();

  const isValid = name && symbol && description && imageURL && initialSupply && ethAmount;

  const { disabled, transactionState, onSubmitTransaction, errors } = useMemeCoinFactory({
    arguments: [name, symbol, description, "https://image.com", parseEther(initialSupply).toString()],
    ethAmount: parseEther(ethAmount)
  });

  console.log('transactionState', transactionState);
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute right-4 top-4">
        <ConnectKitButton />
      </div>
      <div className="flex flex-col items-center space-y-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-32 w-32 text-white"
        >
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"></path>
          <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"></path>
          <path d="M8 14v.5"></path>
          <path d="M16 14v.5"></path>
          <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path>
          <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"></path>
        </svg>
        <form className="space-y-4 md:max-w-1/2 text-2xl flex flex-col gap-4" onSubmit={onSubmitTransaction}>
          <div className="space-y-2">
            <label
              className=" font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              NAME:
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2  file:border-0 file:bg-transparent file: file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="name"
            />
          </div>
          <div className="space-y-2">
            <label
              className=" font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="ticker"
            >
              TICKER:
            </label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2  file:border-0 file:bg-transparent file: file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="ticker"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              className=" font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="description"
            >
              DESCRIPTION:
            </label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2  file:border-0 file:bg-transparent file: file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              className=" font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="image"
            >
              IMAGE:
            </label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2  file:border-0 file:bg-transparent file: file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="image"
              type="file"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <a href="#" className="text-white underline" rel="ugc" onClick={() => setShowMoreOptions(!showMoreOptions)}>
            show more options
          </a>
          {showMoreOptions && (
            <>
              <div className="space-y-2">
                <label
                  className=" font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="initialSupply"
                >
                  INITIAL SUPPLY:
                </label>
              </div>
              <input
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2  file:border-0 file:bg-transparent file: file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="initialSupply"
                value={initialSupply}
                onChange={(e) => setInitialSupply(e.target.value)}
              />
              <label
                className=" font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="ethAmount"
              >
                ETH AMOUNT:
              </label>
              <input
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2  file:border-0 file:bg-transparent file: file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="ethAmount"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
              />
            </>
          )}
          <button className="ring-offset-background focus-visible:ring-ring bg-primary hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-2  font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            
            type="submit"
          >
            CREATE A COIN
          </button>
          <p className="text-white">Cost To Deploy: 0.1 LAC</p>
          {errors && <p className="text-red-500 max-w-1/2 truncate">{errors.toString()}</p>}
        </form>
      </div>
      <div className="absolute top-1/2 left-4 hidden md:block rotate-90 text-6xl font-bold text-white">
        $CARAMEL
      </div>
    </div>
  );
}
