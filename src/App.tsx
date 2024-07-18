import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState } from "react";

import ConnectedWalletWrapper from "./components/ConnectedWalletWrapper";
import useCustomBalance from "./hooks/useCustomBalance";

export type TTxMode = "WRAP" | "UNWRAP";

function App() {
  const { isConnected } = useAccount();
  const [txMode, setTxMode] = useState<TTxMode>("WRAP");
  const { balance, isLoading } = useCustomBalance();

  return (
    <div className="app flex items-center justify-center md:w-[50vw] max-w-5xl mx-auto h-[100vh] py-5 md:py-0 md:h-[70vh] outline-none border-none bg-transparent ">
      <div className="h-full md:h-[400px] flex gap-5 flex-col justify-between md:w-[90%]  ">
        <header className="flex justify-between items-center ">
          <div>
            {isConnected && (
              <h2 className="text-gray-800 shadow-lg px-4 py-1 rounded-md bg-white">
                {txMode === "WRAP" ? "SEP" : "WSEP"} Bal:{" "}
                {isLoading ? "fetching bal..." : parseFloat(balance).toFixed(4)}
              </h2>
            )}
          </div>

          <div className={`${!isConnected ? "border" : ""} rounded-md`}>
            <ConnectButton showBalance={false} />
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-between md:justify-normal gap-5 ">
          <div className="md:border shadow-lg rounded-md md:flex-1 flex flex-col md:w-[90%] mx-auto h-[90%] md:h-auto p-3">
            <div className="flex-1 flex flex-col items-center justify-center gap-4 ">
              {isConnected && (
                <div className="flex justify-center gap-3">
                  <button
                    className={`px-4 py-2  rounded-[12px] ${
                      txMode === "WRAP" ? "border border-white" : ""
                    }`}
                    onClick={() => setTxMode("WRAP")}
                  >
                    Wrap
                  </button>
                  <button
                    className={`px-4 py-2 e rounded-[12px] ${
                      txMode === "UNWRAP" ? "border border-white" : ""
                    }`}
                    onClick={() => setTxMode("UNWRAP")}
                  >
                    Unwrap
                  </button>
                </div>
              )}

              {isConnected ? (
                // wrapper wrapping connected wallet interface
                <ConnectedWalletWrapper txMode={txMode} />
              ) : (
                <div className="py-2 flex items-center justify-center ">
                  <h4 className="text-lg md:text-xl font-bold">
                    Connect Wallet to Wrap or Unwrap SEP
                  </h4>
                </div>
              )}
            </div>
          </div>

          <footer className="">
            <i className="block md:text-center text-xs">
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
