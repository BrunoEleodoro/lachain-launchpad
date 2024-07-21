'use client';

import MemeCoinForm from '@/components/Forms/MemeCoinForm';
import { useAccount, useConnect, useWriteContract } from 'wagmi';
import dog from '../images/dog.png';
import { ConnectKitButton, ConnectKitProvider } from 'connectkit';
import { useRouter } from 'next/navigation';
import useMemeCoinList from '@/hooks/useMemeCoinList';

export default function HomePage() {
  // check if user is connected
  const { isConnected, address, chainId } = useAccount();
  // connectors
  const { connect, connectors, error } = useConnect();

  const router = useRouter();
  const memeCoinList = useMemeCoinList();

  console.log(memeCoinList);
  return (
    <>
      <div className=" min-h-screen max-w-screen-xl text-white self-center">
        <main className="flex flex-col space-y-12 p-6 md:p-16">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex flex-col items-center justify-center space-y-4 text-start md:items-start">
              <h1 className="text-6xl font-bold">$CARAMEL</h1>
              <p className="max-w-xl">
                {/* description for the launchpad for memecoins */}
                Caramel is a launchpad for meme coins on LAChain. We are a community of meme coin enthusiasts
                and we love to build and love meme coins.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <ConnectKitButton theme="rounded" />
                </div>
                <button
                  className="rounded-full bg-gradient-to-r from-[#0DA7FE] to-[#FE44CA] px-4 py-2 text-white transition-opacity duration-300 hover:opacity-80"
                  onClick={() => router.push('/create')}
                >
                  Create a Coin
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={dog.src}
                alt="Caramel Dog"
                className="md:h-[400px] md:w-[400px]"
                width="300"
                height="300"
                style={{ aspectRatio: '400 / 400', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="w-full pt-12 text-start">
            <h2 className="text-4xl font-bold">Recently deployed coins</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {memeCoinList.map((memecoin) => {
                return (
                  <div
                    className="bg-card text-card-foreground mx-auto w-full max-w-xs rounded-lg border shadow-sm"
                    data-v0-t="card"
                  >
                    <div className="flex flex-col items-center space-y-1.5 p-6">
                      <img
                        src={memecoin.imageURL}
                        alt="Coin"
                        className="h-[200px] w-[200px] rounded-lg"
                        width="200"
                        height="200"
                        style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
                      />
                      <h3 className="mt-4 whitespace-nowrap text-lg font-bold tracking-tight">
                        {memecoin.name}
                      </h3>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-6">
                      <div className="flex items-center space-x-2">
                        
                        <div className="text-sm">{memecoin.description}</div>
                      </div>
                      {/* <div className="text-sm">Current Bid 0.28 SOL</div> */}
                      <div className="flex space-x-2">
                        {/* <button className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                          Buy Coin
                        </button> */}
                        <button
                          className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                          onClick={() =>
                            window.open(
                              `https://sambaswap.xyz/swap?inputCurrency=0x2911a1ab18546cb501628be8625c7503a2a7db54&outputCurrency=${memecoin.address}`,
                              '_blank',
                            )
                          }
                        >
                          Buy Coin
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <footer className="flex items-center justify-center p-4">
          <a className="text-sm" href="#" rel="ugc">
            SEE ALL COINS
          </a>
        </footer>
      </div>
    </>
  );
}
