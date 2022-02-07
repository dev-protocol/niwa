import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import NetworkSelectPage from './pages/network-select'

function App() {
  const walletProviderContext = useWalletProviderContext()
  const isRoot = import.meta.env.VITE_IS_ROOT === 'true'

  return (
    <div className="min-h-screen flex flex-col justify-between container mx-auto px-2">
      <div>
        {isRoot && (
          <BrowserRouter>
            <DPLHeader></DPLHeader>
            <main>
              <Routes>
                <Route path="/" element={<NetworkSelectPage />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </BrowserRouter>
        )}

        {!isRoot && (
          <WalletContext.Provider value={walletProviderContext}>
            <BrowserRouter>
              <DPLHeader>
                <ConnectButton />
              </DPLHeader>
              <main>
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
            </BrowserRouter>
          </WalletContext.Provider>
        )}
      </div>
      <DPLFooter>
        <div className="flex justify-between">
          <DPLFooterSection>
            <ul className="mb-4">
              <p className="font-bold">Network</p>
              <li className="text-sm">
                <a href="https://arbitrum.niwa.xyz/">Arbitrium</a>
              </li>
              <li className="text-sm">
                <a href="https://polygon.niwa.xyz/">Polygon</a>
              </li>
            </ul>
            <ul>
              <p className="font-bold">Testnet</p>
              <li className="text-sm">
                <a href="https://arbitrum-rinkeby.niwa.xyz/">Arbitrum Rinkeby</a>
              </li>
              <li className="text-sm">
                <a href="https://polygon-mumbai.niwa.xyz/">Polygon Mumbai</a>
              </li>
            </ul>
          </DPLFooterSection>
          <DPLFooterSection>
            <a href="https://devprotocol.xyz" target="_blank" rel="noreferrer">
              <img width="100px" height="auto" src={FooterImg} alt="Footer Image" />
            </a>
          </DPLFooterSection>
        </div>
      </DPLFooter>
    </div>
  )
}

export default App
