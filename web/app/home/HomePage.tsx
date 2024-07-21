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
      <div className="mx-auto min-h-screen max-w-screen-xl text-white">
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-8 w-8"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" x2="3" y1="12" y2="12"></line>
            </svg> */}
            <nav className="flex space-x-4">
              {/* <a className="text-sm" href="#" rel="ugc">
                [twitter]
              </a>
              <a className="text-sm" href="#" rel="ugc">
                [support]
              </a>
              <a className="text-sm" href="#" rel="ugc">
                [telegram]
              </a>
              <a className="text-sm" href="#" rel="ugc">
                [how it works]
              </a> */}
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <ConnectKitButton />
            {/* <button className="ring-offset-background focus-visible:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Connect Wallet
            </button> */}
          </div>
        </header>
        <main className="flex flex-col space-y-12 p-16">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex flex-col items-center justify-center space-y-4 text-start md:items-start">
              <h1 className="text-6xl font-bold">$CARAMEL</h1>
              <p className="max-w-xl">
                Caramel all meme coins and their communities together and change the memeverse with
                the Caramel street dog. Love it, build it.
              </p>
              <button
                className="rounded-full bg-gradient-to-r from-[#0DA7FE] to-[#FE44CA] px-4 py-2 text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => router.push('/create')}
              >
                Create a Coin
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={dog.src}
                alt="Caramel Dog"
                className="h-[400px] w-[400px]"
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
                        className="h-[200px] w-[200px]"
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
                        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                          <img className="aspect-square h-full w-full" src={memecoin.imageURL} />
                        </span>
                        {/* <div className="text-sm">Owned By Esthephen</div> */}
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
      {/* <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
      {error && <div>{error.message}</div>}
      {isConnected && <div>Connected</div>}
      {address && <div>Address: {address}</div>}
      {chainId && <div>Connected Chain ID: {chainId}</div>}
    </div>
    <div>
      <MemeCoinForm />
    </div> */}
    </>
  );
}

// 'use client';
// import { useAccount } from 'wagmi';
// import Footer from '@/components/layout/footer/Footer';
// import Header from '@/components/layout/header/Header';

// /**
//  * Use the page component to wrap the components
//  * that you want to render on the page.
//  */
// export default function HomePage() {
//   const account = useAccount();

//   return (
//     <>
//       <Header />
//       <main className="container mx-auto flex flex-col px-8 py-16">
//         <div>
//           <h2 className="text-xl">Developer information</h2>
//           <br />
//           <h3 className="text-lg">Account</h3>
//           <ul>
//             <li>
//               <b>status</b>: {account.status}
//             </li>
//             <li>
//               <b>addresses</b>: {JSON.stringify(account.addresses)}
//             </li>
//             <li>
//               <b>chainId</b>: {account.chainId}
//             </li>
//           </ul>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
