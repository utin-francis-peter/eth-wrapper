import { useWriteContract, useAccount } from "wagmi";
import ABI from "../contracts/weth/ABI.json";
import { addresses } from "../contracts/weth/addresses";
import { parseEther } from "viem";
import { toast } from "sonner";

export type TProp = {
  txAmount: string;
};
const useDeposit = () => {
  const { writeContract, status } = useWriteContract();
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
          console.log("TX SUCCESSFUL: ", data);
          // TODO: figure out how to insert a jsx into the toast => so clicking on the link redirects user to the tx block in explorer!
        },

        onError: (data, err) => {
          console.log("TX FAILED: ", err, data);
        },
      }
    );
  };

  return { _writeContract, status };
};

export default useDeposit;
