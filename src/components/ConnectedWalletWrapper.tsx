import { FormEvent, ReactElement, useState } from "react";
import { TTxMode } from "../App";

import useCustomBalance from "../hooks/useCustomBalance";

type TProp = {
  children?: ReactElement;
  txMode: TTxMode;
};

const ConnectedWalletWrapper = ({ txMode }: TProp) => {
  const [txAmount, setTxAmount] = useState("");

  const { balance } = useCustomBalance();

  const handleTxSubmission = (e: FormEvent) => {
    e.preventDefault();

    // execute function body only when txAmount <= wallet balance && > 0

    // validate entered tx amount and notify user accordingly when error!

    // based of txMode, call the appropriate deposit or withdraw fxn of the contract
  };

  return (
    <form
      onSubmit={handleTxSubmission}
      className="w-[80%] h-1/2 flex flex-col justify-around"
    >
      <fieldset className="flex h-1/3 w-4/5 mx-auto justify-around items-center gap-2 ">
        <input
          className="block text-black w-full border border-red-600 px-3 py-1 rounded-xl"
          type="number"
          placeholder="00.00"
          min={0}
          // max should be same as wallet bal
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

      <button className="w-full py-2 self-stretch border border-gray-700">
        Submit
      </button>
    </form>
  );
};

export default ConnectedWalletWrapper;
