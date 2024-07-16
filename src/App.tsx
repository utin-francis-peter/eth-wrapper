import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState } from "react";

import ConnectedWalletWrapper from "./components/ConnectedWalletWrapper";
import useCustomBalance from "./hooks/useCustomBalance";

export type TTxMode = "WRAP" | "UNWRAP";

function App() {
  const { isConnected } = useAccount();
  const [txMode, setTxMode] = useState<TTxMode>("WRAP");
  const { balance } = useCustomBalance();

  return (
    <div className="app flex items-center justify-center w-[50vw] max-w-5xl mx-auto  min-h-[70vh] shadow-2xl outline-none border-none bg-transparent">
      <div className="h-[400px] flex gap-5 flex-col justify-between w-[90%] ">
        <header className="flex justify-between items-center px-3 ">
          <div>
            {isConnected && (
              <h2 className="text-black shadow-lg px-4 py-2 rounded-md bg-white">
                {txMode === "WRAP" ? "SEP" : "WSEP"} Bal: {balance}
              </h2>
            )}
          </div>

          <div>
            <ConnectButton showBalance={false} />
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-5 ">
          <div className="border shadow-lg rounded-md flex-1 flex flex-col w-[90%] mx-auto">
            <div className="flex-1 flex flex-col items-center justify-center gap-4 ">
              <div className="flex justify-center gap-3">
                <button
                  className={`px-4 py-2  rounded-[12px] ${
                    txMode === "WRAP" ? "border-2 border-white" : ""
                  }`}
                  onClick={() => setTxMode("WRAP")}
                >
                  Wrap SEP
                </button>
                <button
                  className={`px-4 py-2 e rounded-[12px] ${
                    txMode === "UNWRAP" ? "border-2 border-white" : ""
                  }`}
                  onClick={() => setTxMode("UNWRAP")}
                >
                  Unwrap SEP
                </button>
              </div>

              {isConnected ? (
                // wrapper wrapping connected wallet interface
                <ConnectedWalletWrapper txMode={txMode} />
              ) : (
                <div className="py-2 flex items-center justify-center border-2 flex-1 border-red-700">
                  <h4 className="">
                    Connect Wallet to{" "}
                    {txMode[0] + txMode.slice(1).toLowerCase()} SEP
                  </h4>
                </div>
              )}
            </div>
          </div>

          <footer className="px-3">
            <i>
              Built by{" "}
              <span className="text-gray-200 hover:text-white transition-colors ease-in">
                utin-francis-peter
              </span>
            </i>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
