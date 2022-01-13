import { UndefinedOr } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import React, { useContext, useMemo, useState } from 'react'

interface Web3ContextInterface {
  web3Provider: UndefinedOr<providers.Web3Provider>
  setWeb3Provider: React.Dispatch<React.SetStateAction<UndefinedOr<providers.Web3Provider>>>
}

export function useWeb3ProviderContext(): Web3ContextInterface {
  const [web3Provider, setWeb3Provider] = useState<UndefinedOr<providers.Web3Provider>>(undefined)
  const web3ProviderContext = useMemo(
    () => ({
      web3Provider,
      setWeb3Provider
    }),
    [web3Provider, setWeb3Provider]
  )
  return web3ProviderContext
}

export const WebProviderContext = React.createContext<Web3ContextInterface | null>(null)

export function useWeb3Provider(): Web3ContextInterface | null {
  return useContext(WebProviderContext)
}
