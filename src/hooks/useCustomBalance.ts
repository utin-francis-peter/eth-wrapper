import { useEffect, useState } from "react";
import { useBalance, useAccount } from "wagmi";

const useCustomBalance = () => {
  const { address } = useAccount();

  const { data, isLoading } = useBalance({ address });

  const [balance, setBalance] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const retrievedBalance = data.formatted ?? 0;
      setBalance(retrievedBalance);
    }
  }, [address, data]);

  return { balance, isLoading };
};

export default useCustomBalance;
