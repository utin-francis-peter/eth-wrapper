import { useGasPrice, useAccount } from "wagmi";
import { TProp } from "./useDeposit";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";

const useCustomGas = ({ canFetchGas }: { canFetchGas: boolean }) => {
  const { chainId, isConnected } = useAccount();
  const [txGas, setTxGas] = useState<string | null>("");

  const { data, error, isLoading, isSuccess, isError, isRefetching } =
    useGasPrice({
      chainId,
      query: {
        enabled: isConnected && canFetchGas,
        refetchInterval: canFetchGas ? 7000 : false,
      },
    });

  useEffect(() => {
    // effect runs to format gas data to ether representation
    if (data) {
      const formattedTxGas = formatUnits(data, 18);
      setTxGas(formattedTxGas);
    }
  }, [data]);

  const resetGas = () => {
    setTxGas(null);
  };

  isError && console.error(error);

  data && console.log("FETCHED GAS PRICE IS: ", data);

  return { txGas, isLoading, isSuccess, isRefetching, resetGas };
};

export default useCustomGas;
