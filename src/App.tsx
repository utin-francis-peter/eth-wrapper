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
    <div className="app flex items-center justify-center w-[80%] max-w-5xl mx-auto  min-h-screen">
      <div className="h-[400px] flex gap-5 flex-col justify-between w-[70%] border-2 border-red-500">
        <header className="flex justify-between items-center px-3 border-2 border-red-500">
          <div>
            {isConnected && (
              <h2 className="shadow-lg px-4 py-2 rounded-md bg-white">
                {txMode === "WRAP" ? "SEP" : "WSEP"} Bal: {balance}
              </h2>
            )}
          </div>

          <div>
            <ConnectButton showBalance={false} />
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-5">
          <div className="flex-1 flex flex-col border-2 border-gray-600 w-[90%] mx-auto py-2">
            {/* <h1 className="text-center font-extrabold mb-3">{txMode} SEP</h1> */}

            <div className="border-2 flex-1 flex flex-col items-center justify-center gap-4 border-blue-700">
              <div className="flex justify-center gap-3 border border-blue-600">
                <button
                  className={`px-4 py-2  rounded-[12px] ${
                    txMode === "WRAP" ? "bg-gray-400" : ""
                  }`}
                  onClick={() => setTxMode("WRAP")}
                >
                  Wrap SEP
                </button>
                <button
                  className={`px-4 py-2 border border-gray-600 rounded-[12px] ${
                    txMode === "UNWRAP" ? "bg-gray-400" : ""
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

          <footer>
            <i>Built by utin-francis-peter</i>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
