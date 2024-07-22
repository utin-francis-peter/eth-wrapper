import { useEffect, useMemo, useState } from "react";
import { useBalance, useAccount, useReadContract } from "wagmi";
import { TTxMode } from "../App";
import ABI from "../contracts/weth/ABI.json";
import { addresses } from "../contracts/weth/addresses";
import { formatUnits } from "viem";

const contractAddress = addresses.sepolia;

const useCustomBalance = ({ txAction }: { txAction: TTxMode }) => {
  const { address, chainId } = useAccount();

  const {
    data: _ethBalance,
    isLoading: ethBalanceIsLoading,
    isError: isErrorLoadingEthBalance,
  } = useBalance({
    address,
  });

  const {
    data: _wethBalance,
    isLoading: wethBalanceIsLoading,
    isError: isErrorLoadingWethBalance,
  } = useReadContract({
    abi: ABI,
    address: contractAddress as `0x${string}`,
    functionName: "balanceOf",
    account: address,
    chainId,
    args: address ? [address] : [],
  });

  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [wethBalance, setWethBalance] = useState<string | null>(null);

  useEffect(() => {
    if (_ethBalance) {
      setEthBalance(_ethBalance.formatted ?? "0");
    }
  }, [_ethBalance]);

  useEffect(() => {
    if (_wethBalance) {
      const formattedBalance = formatUnits(_wethBalance as bigint, 18) ?? 0;
      setWethBalance(formattedBalance);
    }
  }, [_wethBalance]);

  // memoizing computed balance to reduce recalculation costs
  const balance = useMemo(() => {
    switch (txAction) {
      case "WRAP":
        return ethBalance;

      case "UNWRAP":
        return wethBalance;

      default:
        console.log(
          "an invalid tx action was received! tx action must be WRAP or UNWRAP."
        );
        break;
    }
  }, [txAction, ethBalance, wethBalance]);

  return {
    balance,
    isLoading: ethBalanceIsLoading || wethBalanceIsLoading,
    isError: isErrorLoadingEthBalance || isErrorLoadingWethBalance,
  };
};

export default useCustomBalance;
