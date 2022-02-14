import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { whenDefined } from '@devprotocol/util-ts'
import React, { useEffect, useState } from 'react'
import { useProvider } from '../../context/walletContext'
import HSButton from '../HSButton'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaExclamationTriangle } from 'react-icons/fa'
import { crunchAddress, deployedNetworkToReadable } from '../../utils/utils'

const providerOptions = {
  injected: {
    package: detectEthereumProvider()
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      // TODO: will this work? was taken from the governance dapp code
      infuraId: import.meta.env.VITE_INFURA_PROJECT_ID
    }
  }
}

type ConnectButtonParams = {}

const ConnectButton: React.FC<ConnectButtonParams> = () => {
  const { ethersProvider, setEthersProvider, isValidConnectedNetwork } = useProvider()
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const getProvider = async (): Promise<void> => {
      if (ethersProvider) {
        const currentAddress = await ethersProvider.getSigner().getAddress()
        setAddress(currentAddress)
      }
    }
    getProvider()
  }, [ethersProvider])

  const connect = async () => {
    const modalProvider = new Web3Modal({
      providerOptions,
      cacheProvider: false
    })
    const connectedProvider = await modalProvider.connect()
    const newProvider = whenDefined(connectedProvider, p => new providers.Web3Provider(p))
    setEthersProvider(newProvider)

    const updater = createProviderUpdater(connectedProvider)

    connectedProvider?.on('chainChanged', updater)
    connectedProvider?.on('accountsChanged', updater)
  }

  const createProviderUpdater = (provider: any) => {
    return () => {
      const ethersProvider = new providers.Web3Provider(provider)
      setEthersProvider(ethersProvider)
      return { ethersProvider }
    }
  }

  return (
    <div className="mt-sm sm:mt-0">
      {address && (
        <div className="text-right">
          <div className="flex">
            {isValidConnectedNetwork && (
              <div className="flex flex flex-col font-sans text-sm font-bold sm:flex-row sm:items-center">
                <span className="mr-md">{deployedNetworkToReadable()}</span>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                  <Link to={`/${address}`} className="flex items-center">
                    <span className="mr-1">{crunchAddress(address)}</span>
                    <FaChevronRight size={12} />
                  </Link>
                </div>
              </div>
            )}
            {!isValidConnectedNetwork && (
              <div className="align-center flex">
                <FaExclamationTriangle className="text-danger-400" />
                <div className="text-danger-400 ml-xs">
                  Connect Wallet to <span className="uppercase">{deployedNetworkToReadable()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!address && (
        <HSButton onClick={connect} type="filled">
          Connect Wallet
        </HSButton>
      )}
    </div>
  )
}

export default ConnectButton
