import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import TokensPage from './pages/tokens'
import GrowthPage from './pages/growth'
import TokenPage from './pages/token'
import ConnectButton from './components/ConnectButton'
import { useWeb3ProviderContext, WebProviderContext } from './context/web3ProviderContext'
import TokenizeMarketSelect from './pages/tokenize-market-select'
import TokenizeFormPage from './pages/tokenize-form'
import { TokenizeProvider } from './context/tokenizeContext'
import DPLHeader from './components/DPLHeader'
import TokenizeSubmit from './pages/tokenize-submit'
import './scss/main.scss'

function App() {
  const web3ProviderContext = useWeb3ProviderContext()
  const [_currentChangeId, setCurrentChainId] = useState<number | null>(null)

  const updateChain = (chainId: number) => {
    setCurrentChainId(+chainId)
  }

  return (
    <WebProviderContext.Provider value={web3ProviderContext}>
      <BrowserRouter>
        <DPLHeader>
          <ConnectButton onChainChanged={updateChain} />
        </DPLHeader>
        <main className="content-wrap">
          <TokenizeProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:userAddress" element={<TokensPage />} />
              <Route path="/tokens/:hash" element={<TokenPage />} />
              <Route path="/growth" element={<GrowthPage />} />
              <Route path="/tokenize" element={<TokenizeMarketSelect />} />
              <Route path="/tokenize/:market" element={<TokenizeFormPage />} />
              <Route path="/tokenize/:market/preview" element={<TokenizeSubmit />} />
            </Routes>
          </TokenizeProvider>
        </main>
      </BrowserRouter>
    </WebProviderContext.Provider>
  )
}

export default App
