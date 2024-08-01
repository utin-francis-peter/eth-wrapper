import { useEffect, useState } from "react";
import { useBalance, useAccount, useReadContract } from "wagmi";
import ABI from "../contracts/weth/ABI.json";
import { addresses } from "../contracts/weth/addresses";
import { formatUnits } from "viem";

const contractAddress = addresses.sepolia;

const useCustomBalance = () => {
  const { address, chainId } = useAccount();

  const {
    data: _ethBalance,
    isLoading: ethBalanceIsLoading,
    isError: isErrorLoadingEthBalance,
    refetch,
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

  const [ethBalance, setEthBalance] = useState("0");
  const [wethBalance, setWethBalance] = useState("0");

  useEffect(() => {
    if (_ethBalance) {
      setEthBalance(_ethBalance.formatted ?? "0");
    } else {
      setEthBalance("0");
    }
  }, [_ethBalance]);

  useEffect(() => {
    if (_wethBalance) {
      const formattedBalance = formatUnits(_wethBalance as bigint, 18);
      setWethBalance(formattedBalance ?? "0");
    } else {
      setWethBalance("0");
    }
  }, [_wethBalance]);

  return {
    ethBalance,
    wethBalance,
    isLoading: ethBalanceIsLoading || wethBalanceIsLoading,
    isError: isErrorLoadingEthBalance || isErrorLoadingWethBalance,
    refetch,
  };
};

export default useCustomBalance;
