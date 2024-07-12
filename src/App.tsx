import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
  return (
    <div className="flex items-center justify-center w-[80%] max-w-5xl mx-auto  min-h-screen border-2 border-green-500">
      <div className="h-[400px] flex gap-5 flex-col justify-between w-[70%] border-2 border-red-500">
        <header className="flex justify-end border-2 border-red-500">
          <div>
            <ConnectButton />
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-5">
          <div className="flex-1 flex flex-col border-2 border-gray-600 w-[90%] mx-auto py-2">
            <h1 className="text-center font-extrabold mb-3">Wrap SEP</h1>

            <div className="border-2 flex-1 flex flex-col border-blue-700">
              <div className="flex justify-center gap-3 border border-blue-600">
                <button className="px-4 py-2 border border-gray-600 rounded-[12px]">
                  Wrap SEP
                </button>
                <button className="px-4 py-2 bg-gray-400 rounded-[12px]">
                  Unwrap SEP
                </button>
              </div>

              <div className="py-2 flex items-center justify-center border-2 flex-1 border-red-700">
                <h4 className="">Connect Wallet to Wrap SEP</h4>
              </div>
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
