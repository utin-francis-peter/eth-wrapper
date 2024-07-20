import { useEffect, useState } from "react";
import { useBalance, useAccount, useReadContract } from "wagmi";
import { TTxMode } from "../App";
import ABI from "../contracts/weth/ABI.json";
import { addresses } from "../contracts/weth/addresses";
import { writeContract } from "wagmi/actions";
import { formatUnits } from "viem";

const contractAddress = addresses.sepolia;

const useCustomBalance = ({ txAction }: { txAction: TTxMode }) => {
  const { address, chainId } = useAccount();

  const {
    data,
    isLoading: ethBalanceIsLoading,
    isError: isErrorLoadingEthBalance,
  } = useBalance({
    address,
  });

  const {
    data: wethBalance,
    isError: isErrorLoadingWethBalance,
    isLoading: wethBalanceIsLoading,
  } = useReadContract({
    abi: ABI,
    address: contractAddress as `0x${string}`,
    functionName: "balanceOf",
    account: address,
    chainId,
    args: address ? [address] : [],
  });

  const [balance, setBalance] = useState<any>(null);

  useEffect(() => {
    switch (txAction) {
      case "WRAP":
        if (data) {
          const retrievedBalance = data.formatted ?? 0;
          setBalance(retrievedBalance);
        }
        break;

      case "UNWRAP":
        if (wethBalance) {
          const retrievedBalance = formatUnits(wethBalance as bigint, 18) ?? 0;
          setBalance(retrievedBalance);
        }
        break;

      default:
        console.log(
          "an invalid tx action was received! tx action must be WRAP or UNWRAP."
        );

        break;
    }
  }, [address, txAction, data, wethBalance]);

  return {
    balance,
    isLoading: ethBalanceIsLoading || wethBalanceIsLoading,
    isError: isErrorLoadingEthBalance || isErrorLoadingWethBalance,
  };
};

export default useCustomBalance;
