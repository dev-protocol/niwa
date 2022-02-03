import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { whenDefined } from '@devprotocol/util-ts'
import React, { useEffect, useState } from 'react'
import { useProvider } from '../../context/walletContext'
import HSButton from '../HSButton'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

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

type ConnectButtonParams = {
  onChainChanged(id: number): void
}

const ConnectButton: React.FC<ConnectButtonParams> = ({ onChainChanged }) => {
  const { ethersProvider, setEthersProvider } = useProvider()
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
    const provider = await modalProvider.connect()
    const updater = createProviderUpdater(provider)
    provider?.on('accountsChanged', updater)
    provider?.on('chainChanged', updater)
  }

  const createProviderUpdater = (provider: any) => {
    return () => {
      const ethersProvider = new providers.Web3Provider(provider)
      setEthersProvider(ethersProvider)
      return { ethersProvider }
    }
  }

  return (
    <>
      {address && (
        <div className="text-right">
          <div className="flex">
            <Link to={`/${address}`} className="hs-link">
              <span className="mr-xs">
                {address.substring(2, 6)}
                ...
                {address.substring(address.length - 4, address.length)}
              </span>
              <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      )}
      {!address && (
        <HSButton onClick={connect} type="filled">
          Connect Wallet
        </HSButton>
      )}
    </>
  )
}

export default ConnectButton
