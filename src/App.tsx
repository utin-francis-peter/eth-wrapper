import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState } from "react";

import ConnectedWalletWrapper from "./components/ConnectedWalletView";
import useCustomBalance from "./hooks/useCustomBalance";
import RetryBalFetch from "./components/retryBalFetch";

export type TTxMode = "WRAP" | "UNWRAP";

function App() {
  const { isConnected } = useAccount();
  const [txMode, setTxMode] = useState<TTxMode>("WRAP");
  const { ethBalance, wethBalance, isLoading, isError } = useCustomBalance();
  // console.log("OUTCOME OF BALANCE FETCH: ", isError);

  return (
    <div className="app flex items-center justify-center md:w-[50vw] max-w-5xl mx-auto h-[100vh] py-5 md:py-0 md:h-[70vh] outline-none border-none bg-transparent ">
      <div className="h-full md:h-[400px] flex gap-5 flex-col justify-between md:w-[90%]  ">
        <header className="flex justify-between items-center ">
          <div className="flex items-center gap-2">
            {isConnected && (
              <h2
                className={`text-gray-800 shadow-lg px-4 py-1 rounded-md  flex items-center gap-1 ${
                  isError ? "bg-transparent" : "bg-white"
                }`}
                // style={
                //   isError ? { background: "rgba(236, 102, 255, 0.1)" } : {}
                // }
              >
                <span className={isError || isLoading ? "hidden" : "block"}>
                  {txMode === "WRAP" ? "SEP" : "WSEP"} Bal:
                </span>
                {isLoading ? (
                  "fetching bal..."
                ) : isError ? (
                  <span className="text-red-500">error fetching bal</span>
                ) : txMode === "WRAP" ? (
                  parseFloat(ethBalance!).toFixed(4)
                ) : (
                  parseFloat(wethBalance!).toFixed(4)
                )}
              </h2>
            )}

            {isConnected && isError && <RetryBalFetch />}
          </div>

          <div className={`${!isConnected ? "border" : ""} rounded-md`}>
            <ConnectButton showBalance={false} />
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-between md:justify-normal gap-5 ">
          <div className="md:border rounded-lg md:flex-1 flex flex-col md:w-[90%] mx-auto h-[90%] md:h-auto p-3">
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
                // connected wallet interface
                <ConnectedWalletWrapper
                  txMode={txMode}
                  isErrorFetchingBal={isError}
                />
              ) : (
                <div className="py-2 flex items-center justify-center ">
                  <h4 className="text-lg md:text-xl font-bold">
                    Connect Wallet to Wrap or Unwrap SEP
                  </h4>
                </div>
              )}
            </div>
          </div>

          <footer className="flex justify-between items-center">
            <i className="block md:text-center text-gray-500 text-xs">
              Built by{" "}
              <a
                href="https://github.com/utin-francis-peter/eth-wrapper"
                target="_blank"
                className="font-bold hover:text-white transition-colors ease-in"
              >
                <u>utin-francis-peter</u>
              </a>
            </i>
            <i className="block md:text-center text-xs font-bold">
              <a
                href="https://github.com/utin-francis-peter/eth-wrapper"
                target="_blank"
                className="text-gray-500 hover:text-white transition-colors ease-in"
              >
                GitHub Repo
              </a>
            </i>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
