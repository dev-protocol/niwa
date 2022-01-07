import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import TokensPage from "./pages/tokens";
import GrowthPage from "./pages/growth";
import ConnectButton from "./components/ConnectButton";
import {
  useWeb3ProviderContext,
  WebProviderContext,
} from "./context/web3ProviderContext";

function App() {
  const web3ProviderContext = useWeb3ProviderContext();
  const [count, setCount] = useState(0);
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);

  const updateChain = (chainId: number) => {
    setCurrentChainId(+chainId);
  };

  return (
    <WebProviderContext.Provider value={web3ProviderContext}>
      <div className="container mx-auto">
        <header className="flex justify-between py-4">
          <h1>Launchpad</h1>
          <ConnectButton onChainChanged={updateChain} />
        </header>
        <main className="py-12">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tokens" element={<TokensPage />} />
              <Route path="/growth" element={<GrowthPage />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </WebProviderContext.Provider>
  );
}

export default App;
