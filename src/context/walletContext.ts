import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { providers } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import {
  connectedNetworkMatchesDeployment,
  getDeploymentUrlByChainId,
  infuraEndpoint,
  isValidNetwork
} from '../utils/utils'

export interface IWallet {
  ethersProvider?: providers.Web3Provider
  setEthersProvider: Dispatch<SetStateAction<UndefinedOr<providers.Web3Provider>>>
  nonConnectedEthersProvider: providers.JsonRpcProvider
  isValidConnectedNetwork: boolean
  setIsValidConnectedNetwork: Dispatch<SetStateAction<boolean>>
}

const nonConnectedEthersProvider = () => new providers.JsonRpcProvider(infuraEndpoint())

export const wallet: IWallet = {
  ethersProvider: undefined,
  setEthersProvider: () => {},
  nonConnectedEthersProvider: nonConnectedEthersProvider(),
  isValidConnectedNetwork: false,
  setIsValidConnectedNetwork: () => {}
}

export function useWalletProviderContext(): IWallet {
  const [ethersProvider, setEthersProvider] = useState<UndefinedOr<providers.Web3Provider>>(undefined)
  const [isValidConnectedNetwork, setIsValidConnectedNetwork] = useState(true)

  useEffect(() => {
    if (!ethersProvider) {
      return
    }
    ;(async () => {
      const chainId = (await ethersProvider.getNetwork()).chainId
      console.log('chain id is: ', chainId)
      if (connectedNetworkMatchesDeployment(chainId)) {
        setIsValidConnectedNetwork(true)
        return
      }

      // completely invalid network. No deployment.
      // block wallet and all activities
      if (!isValidNetwork(chainId)) {
        setIsValidConnectedNetwork(false)
        return
      }

      // Invalid network BUT deployment may exist
      // Redirect to correct deployment if possible
      const redirectTo = getDeploymentUrlByChainId(chainId)
      if (!redirectTo) {
        setIsValidConnectedNetwork(false)
        return
      }

      window.location.replace(redirectTo)
      return
    })()
  }, [ethersProvider])

  const context = useMemo(
    () => ({
      ethersProvider,
      setEthersProvider,
      nonConnectedEthersProvider: ethersProvider ?? nonConnectedEthersProvider(),
      isValidConnectedNetwork,
      setIsValidConnectedNetwork
    }),
    [ethersProvider, setEthersProvider, isValidConnectedNetwork]
  )
  return context
}

export const WalletContext = createContext(wallet)

export function useProvider(): IWallet {
  return useContext(WalletContext)
}
