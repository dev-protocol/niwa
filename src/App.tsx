import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import TokensPage from './pages/tokens'
import GrowthPage from './pages/growth'
import TokenPage from './pages/token'
import ConnectButton from './components/ConnectButton'
import { useWeb3ProviderContext, WebProviderContext } from './context/web3ProviderContext'
import TokenizeMarketSelect from './pages/tokenize-market-select'
import TokenizeFormPage from './pages/tokenize-form'
import { TokenizeProvider } from './context/tokenizeContext'
import TokenizeSubmit from './pages/tokenize-submit'

function App() {
  const web3ProviderContext = useWeb3ProviderContext()
  const [_currentChangeId, setCurrentChainId] = useState<number | null>(null)

  const updateChain = (chainId: number) => {
    setCurrentChainId(+chainId)
  }

  return (
    <WebProviderContext.Provider value={web3ProviderContext}>
      <div className="container mx-auto px-4">
        <BrowserRouter>
          <header className="flex justify-between py-4">
            <h1>
              <Link to="/">Launchpad</Link>
            </h1>
            <ConnectButton onChainChanged={updateChain} />
          </header>
          <main className="flex py-12 w-full flex-col">
            <TokenizeProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tokens" element={<TokensPage />} />
                <Route path="/tokens/:hash" element={<TokenPage />} />
                <Route path="/growth" element={<GrowthPage />} />
                <Route path="/tokenize" element={<TokenizeMarketSelect />} />
                <Route path="/tokenize/:market" element={<TokenizeFormPage />} />
                <Route path="/tokenize/:market/preview" element={<TokenizeSubmit />} />
              </Routes>
            </TokenizeProvider>
          </main>
        </BrowserRouter>
      </div>
    </WebProviderContext.Provider>
  )
}

export default App
