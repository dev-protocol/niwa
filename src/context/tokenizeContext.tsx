import { UndefinedOr } from '@devprotocol/util-ts'
import { ethers } from 'ethers'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { isValidNetwork } from '../utils/utils'
import { useWeb3Provider } from './web3ProviderContext'

export type GithubFormParams = {}

export type ITokenize = {
  assetName: string
  setAssetName: Dispatch<SetStateAction<string>>
  tokenName: string
  setTokenName: Dispatch<SetStateAction<string>>
  tokenSymbol: string
  setTokenSymbol: Dispatch<SetStateAction<string>>
  personalAccessToken: string
  setPersonalAccessToken: Dispatch<SetStateAction<string>>
  isValid: boolean
  setIsValid: Dispatch<SetStateAction<boolean>>
  network: UndefinedOr<ethers.providers.Network>
  setNetwork: Dispatch<SetStateAction<UndefinedOr<ethers.providers.Network>>>
  address: string
  setAddress: Dispatch<SetStateAction<string>>
}

const tokenize: ITokenize = {
  assetName: '',
  setAssetName: () => {},
  tokenName: '',
  setTokenName: () => {},
  tokenSymbol: '',
  setTokenSymbol: () => {},
  personalAccessToken: '',
  setPersonalAccessToken: () => {},
  isValid: false,
  setIsValid: () => {},
  network: undefined,
  setNetwork: () => {},
  address: '',
  setAddress: () => {}
}

export const TokenizeContext = React.createContext(tokenize)

export const TokenizeProvider: React.FC = ({ children }) => {
  const [assetName, setAssetName] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [personalAccessToken, setPersonalAccessToken] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [network, setNetwork] = useState<UndefinedOr<ethers.providers.Network>>()
  const [address, setAddress] = useState('')
  const web3Context = useWeb3Provider()

  const detectNetwork = useCallback(async () => {
    if (web3Context?.web3Provider) {
      const net = await web3Context?.web3Provider.detectNetwork()
      setNetwork(net)
    }
  }, [web3Context, setNetwork])

  useEffect(() => {
    if (web3Context?.web3Provider) {
      const provider = web3Context.web3Provider
      detectNetwork()
      ;(async () => {
        const userAddress = await provider.getSigner().getAddress()
        setAddress(userAddress)
      })()
    }
  }, [web3Context, detectNetwork])

  const validateForm = useCallback(() => {
    if (assetName.length <= 0) {
      setIsValid(false)
      return
    }

    if (tokenName.length < 3) {
      setIsValid(false)
      return
    }

    if (!isValidNetwork(network?.chainId)) {
      setIsValid(false)
      return
    }
    if (tokenSymbol.length < 3 || tokenSymbol.length > 4) {
      setIsValid(false)
      return
    }
    if (personalAccessToken.length <= 0) {
      setIsValid(false)
      return
    }

    setIsValid(true)
  }, [assetName.length, tokenName.length, tokenSymbol.length, personalAccessToken.length, network?.chainId])

  useEffect(() => validateForm(), [assetName, tokenName, tokenSymbol, personalAccessToken, validateForm])

  return (
    <TokenizeContext.Provider
      value={{
        assetName,
        setAssetName,
        tokenName,
        setTokenName,
        tokenSymbol,
        setTokenSymbol,
        personalAccessToken,
        setPersonalAccessToken,
        isValid,
        setIsValid,
        network,
        setNetwork,
        address,
        setAddress
      }}
    >
      {children}
    </TokenizeContext.Provider>
  )
}
