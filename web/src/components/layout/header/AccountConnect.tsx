import { ConnectAccount } from '@coinbase/onchainkit/wallet';
import { baseSepolia } from 'viem/chains';
import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi';
import { AccountDropdown } from './AccountDropdown';
import { AccountInfoPanel } from './AccountInfoPanel';

/**
 * AccountConnect
 *  - Connects to the wallet
 *  - Disconnects from the wallet
 *  - Displays the wallet network
 */
function AccountConnect() {
  const account = useAccount();
  const { connectors, status, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  return (
    <div
      className="flex flex-grow"
      {...(status === 'pending' && {
        'aria-hidden': true,
        style: {
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        },
      })}
    >
      {(() => {
        if (account.status === 'disconnected') {
          return (
            <div>
              {connectors.map((connector) => (
                <><button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  type="button"
                >
                  Connect with {connector.name}
                </button>
                <br/>
                </>
              ))}
            </div>
          );
        }

        if (account.status === 'connected' && chainId !== baseSepolia.id) {
          return (
            <button onClick={() => disconnect()} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <>
            <div className="flex flex-grow flex-col md:hidden">
              <AccountInfoPanel />
            </div>
            <div className="flex hidden md:block">
              <AccountDropdown />
            </div>
          </>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
