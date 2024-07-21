import { useCallback, useEffect, useMemo, useState } from 'react';
import { Abi, TransactionExecutionError, parseEther } from 'viem';
import { useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import MemeCoinFactory from '@/abis/MemeCoinFactory.json';
import { UseContractReturn } from '@/hooks/contracts';
import { useLoggedInUserCanAfford } from '@/hooks/useUserCanAfford';

export enum TransactionStates {
  START,
  COMPLETE,
  OUT_OF_GAS,
}

type AsyncFunction<Args extends unknown[], ReturnType> = (...args: Args) => Promise<ReturnType>;

export default function useMemeCoinFactory({
  arguments: args,
  ethAmount,
}: {
  arguments: (number | string)[];
  ethAmount: bigint;
}) {
  const [transactionState, setTransactionState] = useState<TransactionStates | null>(null);
  const { address } = useAccount();

  const { data: contractRequest ,error, isLoading} = useSimulateContract({
    account: address,
    address: '0x363A64D680706d482378d712379C68d4de1D11B5' as `0x${string}`,
    abi: MemeCoinFactory.abi,
    functionName: 'createMemeCoin',
    args,
    value: ethAmount,
  });

  const {
    writeContract,
    data: dataHash,
    status: writeContractStatus,
    error: writeContractError,
  } = useWriteContract();

  const { status: transactionReceiptStatus } = useWaitForTransactionReceipt({
    hash: dataHash,
    query: {
      enabled: !!dataHash,
    },
  });

  const disabled = writeContractStatus === 'pending';

  const onSubmitTransaction = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();

      const request = contractRequest?.request;

      if (request) {
        writeContract(contractRequest?.request);
        setTransactionState(TransactionStates.START);
      } else {
        setTransactionState(null);
      }
    },
    [contractRequest, writeContract,isLoading],
  );

  const resetContractForms = useCallback(() => {
    setTransactionState(null);
  }, []);

  useEffect(() => {
    async function onTransactionReceiptStatus() {
      if ((dataHash as string) === '') return;

      if (transactionReceiptStatus === 'error') {
        if (
          writeContractError instanceof TransactionExecutionError &&
          writeContractError.message.toLowerCase().includes('out of gas')
        ) {
          setTransactionState(TransactionStates.OUT_OF_GAS);
        } else {
          setTransactionState(null);
        }
      }

      if (transactionReceiptStatus === 'success') {
        setTransactionState(TransactionStates.COMPLETE);
      }
    }

    void onTransactionReceiptStatus();
  }, [dataHash, setTransactionState, transactionReceiptStatus, writeContractError]);

  return useMemo(
    () => ({
      disabled,
      transactionState,
      resetContractForms,
      onSubmitTransaction,
      errors: error,
    }),
    [onSubmitTransaction, transactionState, disabled, resetContractForms, error],
  );
}
