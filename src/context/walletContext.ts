import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { providers, utils } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import {
  connectedNetworkMatchesDeployment,
  deployedNetworkToChainId,
  deployedNetworkToReadable,
  getExplorerUrl,
  getRpcUrlByChainId,
  infuraEndpoint
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

  // pulled from https://docs.metamask.io/guide/rpc-api.html#usage-with-wallet-switchethereumchain
  const promptWalletNetworkChange = async (chainId: number) => {
    console.log('promptWalletNetworkChange: ', chainId)
    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `${utils.hexValue(deployedNetworkToChainId())}` }] // chainId must be in hexadecimal numbers
        })
      } catch (error: any) {
        console.log('error: ', error)
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: utils.hexValue(deployedNetworkToChainId()),
                  chainName: deployedNetworkToReadable(),
                  nativeCurrency: {
                    name: chainId === 421611 || chainId === 42161 ? 'Ether' : 'Matic',
                    symbol: chainId === 421611 || chainId === 42161 ? 'ETH' : 'MATIC', // 2-6 characters long
                    decimals: 18
                  },
                  rpcUrls: [getRpcUrlByChainId(chainId)],
                  blockExplorerUrls: [getExplorerUrl()]
                }
              ]
            })
          } catch (addError) {
            console.error(addError)
          }
        }
        console.error(error)
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      console.error('metamask not installed')
    }
  }

  useEffect(() => {
    if (!ethersProvider) {
      return
    }
    ;(async () => {
      setIsValidConnectedNetwork(false)
      const chainId = (await ethersProvider.getNetwork()).chainId
      console.log('chain id is: ', chainId)
      if (connectedNetworkMatchesDeployment(chainId)) {
        setIsValidConnectedNetwork(true)
        return
      }

      promptWalletNetworkChange(chainId)

      // // completely invalid network. No deployment.
      // // block wallet and all activities
      // if (!isValidNetwork(chainId)) {
      //   setIsValidConnectedNetwork(false)
      //   return
      // }

      // // Invalid network BUT deployment may exist
      // // Redirect to correct deployment if possible
      // const redirectTo = getDeploymentUrlByChainId(chainId)
      // if (!redirectTo) {
      //   setIsValidConnectedNetwork(false)
      //   return
      // }

      // window.location.replace(redirectTo)
      // return
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
