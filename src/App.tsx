import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DPLHeader from './components/DPLHeader'
import ConnectButton from './components/ConnectButton'

import { useWeb3ProviderContext, WebProviderContext } from './context/web3ProviderContext'
import { TokenizeProvider } from './context/tokenizeContext'

import Home from './pages/home'
import TokensPage from './pages/tokens'
import GrowthPage from './pages/growth'
import TokenPage from './pages/token'
import TokenizeMarketSelect from './pages/tokenize-market-select'
import TokenizeFormPage from './pages/tokenize-form'
import TokenizeSubmit from './pages/tokenize-submit'
import { DPLFooter, DPLFooterSection } from './components/DPLFooter'

import FooterImg from './img/FOOTER_IMG_ Powered by Dev Protocol.png'

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
        <DPLFooter>
          <DPLFooterSection>
            <ul className="mb-sm">
              <p className="fs-h4 fw-h3">Network</p>
              <li>
                <a href="#">Arbitrium</a>
              </li>
              <li>
                <a href="#">Polygon</a>
              </li>
            </ul>
            <ul>
              <p className="fs-h4 fw-h3">Testnet</p>
              <li>
                <a href="#">Arbitrum Rinkeby</a>
              </li>
              <li>
                <a href="#">Polygon Mumbai</a>
              </li>
            </ul>
          </DPLFooterSection>
          <DPLFooterSection>
            <img width="100px" height="auto" src={FooterImg} alt="Footer Image" />
          </DPLFooterSection>
        </DPLFooter>
      </BrowserRouter>
    </WebProviderContext.Provider>
  )
}

export default App
