import { useEffect, useState } from "react";
import { useBalance, useAccount } from "wagmi";

const useCustomBalance = () => {
  const { address } = useAccount();

  const getBalance = useBalance({ address });

  const [balance, setBalance] = useState<any>(null);

  useEffect(() => {
    if (getBalance.data) {
      const retrievedBalance = getBalance.data?.formatted ?? 0;
      setBalance(retrievedBalance);
    }
  }, [address, getBalance.data]);

  return { balance };
};

export default useCustomBalance;
