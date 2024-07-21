'use client';

import useMemeCoinFactory from '@/hooks/useMemeCoinFactory';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { ConnectKitButton } from 'connectkit';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { formatEther, parseEther } from 'viem';
import { useAccount, useBalance } from 'wagmi';

export default function CreatePage() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [initialSupply, setInitialSupply] = useState('100000000000');
  const [ethAmount, setEthAmount] = useState('0.1');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadFile() {
    if (!fileInput.current?.files?.[0]) return null;

    const formData = new FormData();
    formData.append("file", fileInput.current.files[0]);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    return result.imageUrl; // Assuming the API returns the uploaded image URL
  }

  useEffect(() => {
    const handleFileChange = async () => {
      if (fileInput.current?.files?.[0]) {
        setIsUploading(true);
        try {
          const uploadedImageUrl = await uploadFile();
          if (uploadedImageUrl) {
            setImageURL(uploadedImageUrl);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          setIsUploading(false);
        }
      }
    };

    fileInput.current?.addEventListener('change', handleFileChange);

    return () => {
      fileInput.current?.removeEventListener('change', handleFileChange);
    };
  }, []);

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const isValid = name && symbol && description && initialSupply && ethAmount;

  const { disabled, transactionReceiptStatus, dataHash, transactionState, onSubmitTransaction, errors } = useMemeCoinFactory({
    arguments: [
      name,
      symbol,
      description,
      imageURL || 'https://geofund.com.br/wp-content/uploads/2023/09/placeholder-10.png',
      parseEther(initialSupply).toString(),
    ],
    ethAmount: parseEther(ethAmount),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmitTransaction(event);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute right-4 top-4 flex w-full justify-between p-16">
        <Link href="/">
          <ArrowLeftIcon className="h-12 w-12 text-white" />
        </Link>
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
        <form
          className="md:max-w-1/2 flex flex-col gap-4 space-y-4 text-2xl"
          onSubmit={handleSubmit}
        >
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
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring file: flex h-10 w-full rounded-md border bg-transparent px-3  py-2 file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring file: flex h-10 w-full rounded-md border bg-transparent px-3  py-2 file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring file: flex h-10 w-full rounded-md border bg-transparent px-3  py-2 file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring file: flex h-10 w-full rounded-md border bg-transparent px-3  py-2 file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="image"
              type="file"
              ref={fileInput}
            />
            {isUploading && <p className="text-white">Uploading...</p>}
            {imageURL && <p className="text-white">Image uploaded successfully!</p>}
          </div>
          <a
            href="#"
            className="text-white underline"
            rel="ugc"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
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
                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring file: flex h-10 w-full rounded-md border bg-transparent px-3  py-2 file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring file: flex h-10 w-full rounded-md border bg-transparent px-3  py-2 file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="ethAmount"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
              />
            </>
          )}
          <button
            className="ring-offset-background focus-visible:ring-ring bg-primary hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-2  font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
            disabled={isUploading || disabled}
          >
            CREATE A COIN
          </button>
          {transactionState === 0 && <p className="text-white underline">Transaction Started, confirm on your wallet...</p>}
          {transactionState === 1 && <p className="text-green-500">Transaction Confirmed, Memecoin Created!</p>}
          {dataHash && (
            <p className="text-white">
              Transaction Hash: <a target='_blank' href={`https://explorer.lachain.network/tx/${dataHash}`}>{dataHash}</a>
            </p>
          )}
          <p className="text-white">Cost To Deploy: 0.1 LAC</p>
          <p className="text-white">Balance: {formatEther(balance?.value || 0n)} LAC</p>
          {errors && <p className="max-w-1/2 truncate text-red-500">{errors.toString()}</p>}
        </form>
      </div>
      <div className="absolute left-4 top-1/2 hidden rotate-90 text-6xl font-bold text-white md:block">
        $CARAMEL
      </div>
    </div>
  );
}
