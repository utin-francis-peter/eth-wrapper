import { useAccount, useWriteContract } from "wagmi";
import ABI from "../contracts/weth/ABI.json";
import { addresses } from "../contracts/weth/addresses";
import { TProp } from "./useDeposit";
import { parseEther } from "viem";

const useWithdraw = () => {
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
        functionName: "withdraw",
        account: walletAddress,
        // value: parseEther(txAmount), //since tx value is entered as amount arg, is this still needed?
        args: txAmount ? [parseEther(txAmount)] : [],
      },
      {
        onSuccess: (data) => {
          console.log("CONTRACT DATA:, ", data);
          //TODO: use toast
        },

        onError: (_, err) => {
          console.log(err);

          //TODO: use toast
        },
      }
    );

    data && console.log("CONTRACT DATA: ", data);
    error && console.log("AN ERROR OCCURRED! ", error);
  };

  return { _writeContract, status };
};

export default useWithdraw;
