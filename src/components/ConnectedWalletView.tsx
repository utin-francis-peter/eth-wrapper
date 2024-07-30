import { FormEvent, ReactElement, useEffect, useState } from "react";
import { TTxMode } from "../App";

import useCustomBalance from "../hooks/useCustomBalance";
import useDeposit from "../hooks/useDeposit";
import useWithdraw from "../hooks/useWithdraw";
import useCustomGas from "../hooks/useCustomGas";

type TProp = {
  children?: ReactElement;
  txMode: TTxMode;
  isErrorFetchingBal: boolean;
};

const ConnectedWalletWrapper = ({
  txMode,
  isErrorFetchingBal = false,
}: TProp) => {
  const [txAmount, setTxAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canFetchGas, setCanFetchGas] = useState(false);

  const { ethBalance, wethBalance } = useCustomBalance();

  const { _writeContract: _writeDepositContract, status: depositStatus } =
    useDeposit();
  const { _writeContract: _writeWithdrawContract, status: withdrawStatus } =
    useWithdraw();
  const {
    txGas,
    isLoading,
    isSuccess: gasFetchIsSuccess,
    isRefetching,
    resetGas,
  } = useCustomGas({
    canFetchGas,
  });

  useEffect(() => {
    if (parseFloat(txAmount) > 0) {
      setCanFetchGas(true);
    } else {
      setCanFetchGas(false);
      resetGas();
    }
  }, [txAmount]); // activates gas fetch function

  useEffect(() => {
    if (gasFetchIsSuccess) {
      if (
        Number(txAmount).toFixed(4) + Number(txGas).toFixed(4) >
        Number(ethBalance).toFixed(4)
      ) {
        setErrorMessage("Insufficient SEP balance");
      } else {
        setErrorMessage("");
      }
    }
  }, [txGas, txAmount, ethBalance, gasFetchIsSuccess, txMode]);

  const handleTxSubmission = async (e: FormEvent) => {
    e.preventDefault();

    const _txAmount = +txAmount;
    const _balance = +ethBalance!;

    if (_txAmount.toFixed(4) > _balance.toFixed(4)) {
      return;
      // TODO: use toast message to show error mssg
    }

    switch (txMode) {
      case "WRAP":
        txAmount && _writeDepositContract({ txAmount });
        break;

      case "UNWRAP":
        txAmount && _writeWithdrawContract({ txAmount });

        break;

      default:
        console.error("invalid action received!");

        break;
    }

    if (depositStatus === "success" || withdrawStatus === "success") {
      setCanFetchGas(false);
      resetGas();
      // refetch balance
      // use toast message to show tx success
    } else {
      // use toast message to give error feedbacks
    }
  };

  console.log(isErrorFetchingBal);

  return (
    <form
      onSubmit={handleTxSubmission}
      className="md:w-[80%] md:flex flex-col justify-around"
    >
      <fieldset className="flex my-2 h-1/3 w-4/5 mx-auto justify-around items-center gap-2 ">
        <input
          className="block text-black w-full px-3 py-2 rounded-xl focus:outline-2 focus:border-2 focus:outline-primary focus:border-primaryLight"
          type="number"
          autoFocus
          placeholder="00.00"
          min={0}
          max={txMode === "WRAP" ? ethBalance! : wethBalance!}
          step={"any"}
          value={txAmount}
          onChange={(e) => setTxAmount(e.target.value)}
          required
        />
        <input
          className="px-3 py-2 cursor-pointer disabled:cursor-not-allowed border-b border-b-white rounded-xl"
          style={
            isErrorFetchingBal
              ? { borderBottomColor: "rgba(236, 102, 255, 0.1)" }
              : {}
          }
          disabled={isErrorFetchingBal}
          type="button"
          value="Set max"
          onClick={() => {
            const availableBal = txMode === "WRAP" ? ethBalance! : wethBalance!;
            setTxAmount(parseFloat(availableBal).toFixed(4));
          }}
        />
      </fieldset>

      <div className="flex flex-col gap-2 my-3 items-center justify-center">
        {isLoading || isRefetching ? (
          <p>Fetching gas fee...</p>
        ) : gasFetchIsSuccess && !!txGas ? (
          <p>
            <span className="font-bold">Gas fee</span>: {txGas} SEP
          </p>
        ) : (
          ""
        )}
      </div>

      <button
        className={`w-full self-stretch  disabled:cursor-not-allowed rounded-[40px] py-[13px]  text-lg md:my-1`}
        disabled={!!errorMessage || isErrorFetchingBal}
        style={
          !!errorMessage || isErrorFetchingBal
            ? { background: "rgba(236, 102, 255, 0.1)" }
            : { background: "rgba(236, 102, 255, 0.6)" }
        }
      >
        {!!errorMessage
          ? errorMessage
          : depositStatus === "pending" || withdrawStatus === "pending"
          ? `${txMode === "WRAP" ? "Wrapping" : "Unwrapping"} SEP...`
          : `${txMode === "WRAP" ? "Wrap" : "Unwrap"} SEP`}
      </button>
    </form>
  );
};

export default ConnectedWalletWrapper;
