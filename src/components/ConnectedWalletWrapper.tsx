import { FormEvent, ReactElement, useEffect, useState } from "react";
import { TTxMode } from "../App";
import { useBalance, useAccount } from "wagmi";

type TProp = {
  children?: ReactElement;
  txMode: TTxMode;
};

const ConnectedWalletWrapper = ({ txMode }: TProp) => {
  const [txAmount, setTxAmount] = useState("0");

  const handleTxSubmission = (e: FormEvent) => {
    e.preventDefault();

    // validate entered tx amount and notify user accordingly when error!

    // based of txMode, call the appropriate deposit or withdraw fxn of the contract
  };

  const handleSetMaxBal = () => {};
  // a function that handles setting available max balance as tx amount
  // same fxn would be used for wrap and unwrap tx. Ref respective balances based on nature of tx and then include cost for gas fee. ...
  return (
    <form
      onSubmit={handleTxSubmission}
      className="w-[80%] h-1/2 flex flex-col justify-around"
    >
      <fieldset className="flex h-1/3 w-4/5 mx-auto justify-around items-center gap-2 ">
        <input
          className="border border-red-600 px-3 py-1 rounded-xl"
          type="number"
          value={txAmount}
          onChange={(e) => setTxAmount(e.target.value)}
        />
        <input
          className="px-3 py-1 cursor-pointer border border-gray-400 rounded-xl"
          type="button"
          value="Set Max"
        />
      </fieldset>

      <button className="w-full py-2 self-stretch border border-gray-700">
        Submit
      </button>
    </form>
  );
};

export default ConnectedWalletWrapper;
