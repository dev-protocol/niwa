import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import { providers } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { infuraEndpoint } from '../utils/utils'

export interface IWallet {
  ethersProvider?: providers.Web3Provider
  setEthersProvider: Dispatch<SetStateAction<UndefinedOr<providers.Web3Provider>>>
  nonConnectedEthersProvider: providers.JsonRpcProvider
}

const nonConnectedEthersProvider = () => new providers.JsonRpcProvider(infuraEndpoint())

export const wallet: IWallet = {
  ethersProvider: undefined,
  setEthersProvider: () => {},
  nonConnectedEthersProvider: nonConnectedEthersProvider()
}

export function useWalletProviderContext(): IWallet {
  const [ethersProvider, setEthersProvider] = useState<UndefinedOr<providers.Web3Provider>>(undefined)
  const context = useMemo(
    () => ({
      ethersProvider,
      setEthersProvider,
      nonConnectedEthersProvider: ethersProvider ?? nonConnectedEthersProvider()
    }),
    [ethersProvider, setEthersProvider]
  )
  return context
}

export const WalletContext = createContext(wallet)

export function useProvider(): IWallet {
  return useContext(WalletContext)
}
