import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import UserPropertiesListPage from './pages/user-properties-list'
import UserPositionsListPage from './pages/user-positions-list'
import GrowthPage from './pages/growth'
import PropertyOverviewPage from './pages/properties/property-overview'
import TokenizeMarketSelect from './pages/tokenize-market-select'
import TokenizeFormPage from './pages/tokenize-form'
import TokenizeSubmit from './pages/tokenize-submit'
import AuthCallbackPage from './pages/auth-callback'

import ConnectButton from './components/ConnectButton'
import DPLHeader from './components/DPLHeader'

import { useWalletProviderContext, WalletContext } from './context/walletContext'
import { TokenizeProvider } from './context/tokenizeContext'

import PageNotFound from './pages/errors/404'
import StakePage from './pages/properties/stake'
import NetworkSelectPage from './pages/network-select'
import { Background } from './components/Background'
import WaitMarketPage from './pages/wait-market'
import MarkdownPage from './pages/markdown-page'
import { ReactComponent as PrivacyPolicy } from '../PRIVACY-POLICY.md'
import Footer from './components/Footer'
import PropertyHoldersPage from './pages/properties/property-holders'
import PropertyOutlet from './pages/properties'
import PropertyTabsContainer from './pages/properties/PropertyTabsContainer'
import AppsPage from './pages/apps'
import HowItWorksPage from './pages/how-it-works'
import PropertyStakersPage from './pages/properties/property-stakers'
import { useTerms } from './hooks/useTerms'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

function App() {
  const walletProviderContext = useWalletProviderContext()
  const isRoot = import.meta.env.VITE_IS_ROOT === 'true'
  const { terms } = useTerms()

  return (
    <div className="container mx-auto px-2 font-body">
      <Background />
      <div className="relative">
        {isRoot && (
          <BrowserRouter>
            <div className="flex min-h-screen flex-col justify-between">
              <div>
                <DPLHeader></DPLHeader>
                <main>
                  <Routes>
                    <Route path="/" element={<NetworkSelectPage />} />
                    <Route path="/privacy-policy" element={<MarkdownPage>{<PrivacyPolicy />}</MarkdownPage>} />
                    <Route
                      path="/terms-and-conditions"
                      element={
                        <MarkdownPage>
                          {<ReactMarkdown rehypePlugins={[rehypeRaw]}>{terms}</ReactMarkdown>}
                        </MarkdownPage>
                      }
                    />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
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
              <div className="flex min-h-screen flex-col justify-between">
                <div>
                  <DPLHeader>
                    <ConnectButton />
                  </DPLHeader>
                  <main>
                    <TokenizeProvider>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/apps" element={<AppsPage />} />
                        <Route path="/:userAddress" element={<UserPropertiesListPage />} />
                        <Route path="/:userAddress/positions" element={<UserPositionsListPage />} />

                        <Route path="/properties/:hash" element={<PropertyOutlet />}>
                          <Route path="/properties/:hash/stake" element={<StakePage />} />
                          <Route path="" element={<PropertyTabsContainer />}>
                            <Route index element={<PropertyOverviewPage />} />
                            <Route path="holders" element={<PropertyHoldersPage />} />
                            <Route path="stakers" element={<PropertyStakersPage />} />
                          </Route>
                        </Route>
                        <Route path="/growth" element={<GrowthPage />} />
                        <Route path="/tokenize" element={<TokenizeMarketSelect />} />
                        <Route path="/tokenize/:market" element={<TokenizeFormPage />} />
                        <Route path="/tokenize/:market/preview" element={<TokenizeSubmit />} />
                        <Route path="/wait/youtube" element={<WaitMarketPage />} />
                        <Route path="/auth/:market/callback" element={<AuthCallbackPage />} />
                        <Route path="/privacy-policy" element={<MarkdownPage>{<PrivacyPolicy />}</MarkdownPage>} />
                        <Route
                          path="/terms-and-conditions"
                          element={
                            <MarkdownPage>
                              {<ReactMarkdown rehypePlugins={[rehypeRaw]}>{terms}</ReactMarkdown>}
                            </MarkdownPage>
                          }
                        />
                        <Route path="/404" element={<PageNotFound />} />
                        <Route path="*" element={<Navigate replace to="/404" />} />
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
