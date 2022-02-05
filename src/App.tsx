import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import UserPropertiesListPage from './pages/user-properties-list'
import UserPositionsListPage from './pages/user-positions-list'
import GrowthPage from './pages/growth'
import PropertyPage from './pages/property'
import TokenizeMarketSelect from './pages/tokenize-market-select'
import TokenizeFormPage from './pages/tokenize-form'
import TokenizeSubmit from './pages/tokenize-submit'
import AuthCallbackPage from './pages/auth-callback'

import ConnectButton from './components/ConnectButton'
import DPLHeader from './components/DPLHeader'
import { DPLFooter, DPLFooterSection } from './components/DPLFooter'

import { useWalletProviderContext, WalletContext } from './context/walletContext'
import { TokenizeProvider } from './context/tokenizeContext'

import FooterImg from './img/FOOTER_IMG_Powered by Dev Protocol.svg'
import PageNotFound from './pages/errors/404'
import StakePage from './pages/stake'

function App() {
  const walletProviderContext = useWalletProviderContext()

  const updateChain = (_chainId: number) => {
    // TODO - check if chain matches deployment network (ie arbitrum.launcher.com)
  }

  return (
    <WalletContext.Provider value={walletProviderContext}>
      <BrowserRouter>
        <DPLHeader>
          <ConnectButton onChainChanged={updateChain} />
        </DPLHeader>
        <main className="content-wrap">
          <TokenizeProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:userAddress" element={<UserPropertiesListPage />} />
              <Route path="/:userAddress/positions" element={<UserPositionsListPage />} />
              <Route path="/properties/:hash/stake" element={<StakePage />} />
              <Route path="/properties/:hash" element={<PropertyPage />} />
              <Route path="/growth" element={<GrowthPage />} />
              <Route path="/tokenize" element={<TokenizeMarketSelect />} />
              <Route path="/tokenize/:market" element={<TokenizeFormPage />} />
              <Route path="/tokenize/:market/preview" element={<TokenizeSubmit />} />
              <Route path="/auth/:market/callback" element={<AuthCallbackPage />} />
              <Route path="/404" element={<PageNotFound />} />
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
            <a href="https://devprotocol.xyz" target="_blank" rel="noreferrer">
              <img width="100px" height="auto" src={FooterImg} alt="Footer Image" />
            </a>
          </DPLFooterSection>
        </DPLFooter>
      </BrowserRouter>
    </WalletContext.Provider>
  )
}

export default App
