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

import { useWalletProviderContext, WalletContext } from './context/walletContext'
import { TokenizeProvider } from './context/tokenizeContext'

import PageNotFound from './pages/errors/404'
import StakePage from './pages/stake'
import NetworkSelectPage from './pages/network-select'
import { Background } from './components/Background'
import WaitMarketPage from './pages/wait-market'
import MarkdownPage from './pages/markdown-page'
import { ReactComponent as PrivacyPolicy } from '../PRIVACY-POLICY.md'
import { ReactComponent as TermsAndConditions } from '../TERMS-AND-CONDITIONS.md'
import Footer from './components/Footer'

function App() {
  const walletProviderContext = useWalletProviderContext()
  const isRoot = import.meta.env.VITE_IS_ROOT === 'true'

  return (
    <div className="container mx-auto px-2 font-body">
      <Background />
      <div className="relative">
        {isRoot && (
          <BrowserRouter>
            <div className="min-h-screen flex flex-col justify-between">
              <div>
                <DPLHeader></DPLHeader>
                <main>
                  <Routes>
                    <Route path="/" element={<NetworkSelectPage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        )}

        {!isRoot && (
          <WalletContext.Provider value={walletProviderContext}>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col justify-between">
                <div>
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
                        <Route path="/wait/youtube" element={<WaitMarketPage />} />
                        <Route path="/auth/:market/callback" element={<AuthCallbackPage />} />
                        <Route path="/privacy-policy" element={<MarkdownPage>{<PrivacyPolicy />}</MarkdownPage>} />
                        <Route
                          path="/terms-and-conditions"
                          element={<MarkdownPage>{<TermsAndConditions />}</MarkdownPage>}
                        />
                        <Route path="/404" element={<PageNotFound />} />
                      </Routes>
                    </TokenizeProvider>
                  </main>
                </div>
                <Footer />
              </div>
            </BrowserRouter>
          </WalletContext.Provider>
        )}
      </div>
    </div>
  )
}

export default App
