import { useEffect } from 'react'
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
import { Background } from './components/Background'
import { DEPLOYMENTS } from './const'
import { FaDiscord, FaGithubSquare } from 'react-icons/fa'
import Web3Modal from 'web3modal'
import { providerOptions } from './components/ConnectButton'
import { whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

function App() {
  const walletProviderContext = useWalletProviderContext()
  const isRoot = import.meta.env.VITE_IS_ROOT === 'true'
  const modalProvider = new Web3Modal({
      providerOptions,
      cacheProvider: false
    })
  const createProviderUpdater = (provider: any) => {
    return () => {
      const ethersProvider = new providers.Web3Provider(provider)
      walletProviderContext.setEthersProvider(ethersProvider)
      return { ethersProvider }
    }
  }
  useEffect(() => {
    ;(async () => {
      // NOTE: If user have already connected once, reconnect to the same address.
      if (walletProviderContext.ethersProvider) {
        return
      }
      const web3ForInjected: any = await detectEthereumProvider()
      if (!web3ForInjected) {
        modalProvider.clearCachedProvider()
        return
      }
      const isAuthorized = await (new providers.Web3Provider(web3ForInjected).getSigner()).getAddress()
        .catch(() => undefined)
      if (!isAuthorized) {
        return
      }

      if (modalProvider.cachedProvider) {
        const connectedProvider = await modalProvider.connect()
        const newProvider = whenDefined(connectedProvider, p => new providers.Web3Provider(p))
        walletProviderContext.setEthersProvider(newProvider)

        const updater = createProviderUpdater(connectedProvider)

        connectedProvider?.on('chainChanged', updater)
        connectedProvider?.on('accountsChanged', updater)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-between container mx-auto px-2 font-body">
      <Background />
      <div className="relative">
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
      <DPLFooter className="relative">
        <div className="flex justify-between">
          <DPLFooterSection>
            <div className="grid gap-4">
              <ul className="text-sm">
                <p className="font-bold text-md">Network</p>
                <li>
                  <a href={DEPLOYMENTS.arbitrum_one}>Arbitrium</a>
                </li>
                <li>
                  <a href={DEPLOYMENTS.polygon_mainnet}>Polygon</a>
                </li>
              </ul>
              <ul className="text-sm">
                <p className="font-bold text-md">Testnet</p>
                <li>
                  <a href={DEPLOYMENTS.arbitrum_rinkeby}>Arbitrum Rinkeby</a>
                </li>
                <li className="text-sm">
                  <a href={DEPLOYMENTS.polygon_mumbai}>Polygon Mumbai</a>
                </li>
              </ul>
            </div>
            <ul className="text-sm text-gray-400 grid grid-flow-col gap-4">
              <li>
                <a href="https://github.com/dev-protocol/niwa/blob/main/TERMS-AND-CONDITIONS.md">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="https://github.com/dev-protocol/niwa/blob/main/PRIVACY-POLICY.md">Privacy Policy</a>
              </li>
            </ul>
            <ul className="text-sm grid grid-flow-col gap-4">
              <li>
                <a className="flex align-center gap-1" href="https://github.com/dev-protocol/niwa">
                  <FaGithubSquare size="1.2rem" /> GitHub
                </a>
              </li>
              <li>
                <a className="flex align-center gap-1" href="https://discord.gg/VwJp4KM">
                  <FaDiscord size="1.2rem" /> Discord
                </a>
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
