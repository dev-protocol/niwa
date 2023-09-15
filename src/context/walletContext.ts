import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { providers } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { connectedNetworkMatchesDeployment, infuraEndpoint } from '../utils/utils'
import { useSwitchNetwork } from 'wagmi'

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
  const { error, switchNetwork } = useSwitchNetwork()
  const [ethersProvider, setEthersProvider] = useState<UndefinedOr<providers.Web3Provider>>(undefined)
  const [isValidConnectedNetwork, setIsValidConnectedNetwork] = useState(true)

  useEffect(() => {
    if (!ethersProvider) {
      return
    }

    ;(async () => {
      setIsValidConnectedNetwork(false)
      const chainId = (await ethersProvider.getNetwork()).chainId
      if (connectedNetworkMatchesDeployment(chainId)) {
        setIsValidConnectedNetwork(true)
        return
      }

      const promptWalletNetworkChange = async (chainId: number) => {
        console.log('promptWalletNetworkChange: ', chainId)
        // Check if switchNetwork is available
        if (switchNetwork) {
          switchNetwork(chainId)
        } else {
          console.error('Network switch not available.', error)
        }
      }

      promptWalletNetworkChange(chainId)
    })()
  }, [ethersProvider, error, switchNetwork])

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
