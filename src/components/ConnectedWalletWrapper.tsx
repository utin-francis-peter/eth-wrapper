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

  const { balance } = useCustomBalance({
    txAction: txMode,
  });
  const { _writeContract, status: txStatus } = useDeposit();
  const { txGas, isLoading, isSuccess, isRefetching, resetGas } = useCustomGas({
    canFetchGas,
  });
  console.log("WRAPPER COMPONENT RE_RENDERED!");

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

  const handleTxSubmission = async (e: FormEvent) => {
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

    if (txStatus === "success") {
      setCanFetchGas(false);
      resetGas();
    }
  };

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
          max={balance}
          step={"any"}
          value={txAmount}
          onChange={(e) => setTxAmount(e.target.value)}
          required
        />
        <input
          className="px-3 py-2 cursor-pointer border-b border-b-white rounded-xl"
          type="button"
          value="Set max"
          onClick={() => {
            const availableBal = +balance;
            setTxAmount(availableBal.toFixed(4));
          }}
        />
      </fieldset>

      <div className="flex flex-col gap-2 items-center my-3 justify-center">
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
        className={`w-full self-stretch  disabled:cursor-not-allowed rounded-[40px] py-[13px]  text-lg md:my-1`}
        disabled={!!errorMessage}
        style={
          !!errorMessage
            ? { background: "rgba(236, 102, 255, 0.1)" }
            : { background: "rgba(236, 102, 255, 0.6)" }
        }
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
