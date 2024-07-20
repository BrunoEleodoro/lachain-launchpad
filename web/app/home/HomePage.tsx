'use client';

import MemeCoinForm from '@/components/Forms/MemeCoinForm';
import { useAccount, useConnect, useWriteContract } from 'wagmi';
export default function HomePage() {
  // check if user is connected
  const { isConnected, address, chainId } = useAccount();
  // connectors
  const { connect, connectors, error } = useConnect();

  return <>
    <div>
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
    </div>
  </>;
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
