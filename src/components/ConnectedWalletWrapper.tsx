import { FormEvent, ReactElement, useEffect, useState } from "react";
import { TTxMode } from "../App";

import useCustomBalance from "../hooks/useCustomBalance";
import useDeposit from "../hooks/useDeposit";
import useCustomGas from "../hooks/useCustomGas";

type TProp = {
  children?: ReactElement;
  txMode: TTxMode;
};

const ConnectedWalletWrapper = ({ txMode }: TProp) => {
  const [txAmount, setTxAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canFetchGas, setCanFetchGas] = useState(false);

  const { balance } = useCustomBalance();
  const { _writeContract, status: txStatus } = useDeposit();
  const { txGas, isLoading, isSuccess, isRefetching, resetGas } = useCustomGas({
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
    if (isSuccess) {
      if (
        Number(txAmount).toFixed(4) + Number(txGas).toFixed(4) >
        Number(balance).toFixed(4)
      ) {
        setErrorMessage("Insufficient SEP balance");
      } else {
        setErrorMessage("");
      }
    }
  }, [txGas, txAmount, balance, isSuccess]);

  const handleTxSubmission = (e: FormEvent) => {
    e.preventDefault();

    const _txAmount = +txAmount;
    const _balance = +balance;

    if (_txAmount.toFixed(4) > _balance.toFixed(4)) {
      return;
      // TODO: use toast message to show error mssg
    }

    switch (txMode) {
      case "WRAP":
        txAmount && _writeContract({ txAmount });
        break;
      case "UNWRAP":
        break;

      default:
        console.error("invalid action received!");

        break;
    }

    setCanFetchGas(false);
    resetGas();
  };

  return (
    <form
      onSubmit={handleTxSubmission}
      className="w-[80%] h-1/2 flex flex-col justify-around"
    >
      <fieldset className="flex my-2 h-1/3 w-4/5 mx-auto justify-around items-center gap-2 ">
        <input
          className="block text-black w-full border-2 px-3 py-1 rounded-xl focus:outline-none focus:border-gray-400"
          type="number"
          placeholder="00.00"
          min={0}
          max={balance}
          step={"any"}
          value={txAmount}
          onChange={(e) => setTxAmount(e.target.value)}
          required
        />
        <input
          className="px-3 py-1 cursor-pointer border border-gray-400 rounded-xl"
          type="button"
          value="Set Max"
          onClick={() => {
            const availableBal = +balance;
            setTxAmount(availableBal.toFixed(4));
          }}
        />
      </fieldset>

      <div className="flex flex-col gap-2 items-center mt-2 justify-center">
        {isLoading || isRefetching ? (
          <p>Fetching gas fee...</p>
        ) : isSuccess && !!txGas ? (
          <p>
            <span className="font-bold">Gas fee</span>: {txGas} SEP
          </p>
        ) : (
          ""
        )}
      </div>

      <button
        className={`w-full self-stretch border border-gray-300 disabled:text-red-300 disabled:cursor-not-allowed rounded-[40px] py-4 text-lg mt-4`}
        disabled={!!errorMessage}
      >
        {!!errorMessage
          ? errorMessage
          : txStatus === "pending"
          ? "Wrapping..."
          : "Wrap SEP"}
      </button>
    </form>
  );
};

export default ConnectedWalletWrapper;
