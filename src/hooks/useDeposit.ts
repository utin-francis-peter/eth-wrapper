import { useWriteContract, useAccount } from "wagmi";
import ABI from "../contracts/weth/ABI.json";
import { addresses } from "../contracts/weth/addresses";
import { parseEther } from "viem";

export type TProp = {
  txAmount: string;
};
const useDeposit = () => {
  const { writeContract, data, error, status } = useWriteContract();
  const { address: walletAddress } = useAccount();

  const contractAddress = addresses.sepolia;

  const _writeContract = ({ txAmount }: TProp) => {
    if (!walletAddress || !contractAddress || !txAmount) {
      console.error("Failed to write contract due to missing fields!");
      return;
    }

    writeContract(
      {
        abi: ABI,
        address: contractAddress as `0x${string}`,
        functionName: "deposit",
        account: walletAddress,
        value: parseEther(txAmount),
      },
      {
        onSuccess: (data) => {
          console.log("CONTRACT DATA:, ", data);
        },

        onError: (data, err) => {
          console.log("ERROR, CONTRACT DATA:, ", data);
          console.log("ERROR, CONTRACT ERR:, ", err);
        },
      }
    );

    data && console.log("CONTRACT DATA: ", data);
    error && console.log("CONTRACT ERROR: ", error);
  };

  return { _writeContract, status };
};

export default useDeposit;
