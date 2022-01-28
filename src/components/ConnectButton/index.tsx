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
    const connectedProvider = await modalProvider.connect()
    const newProvider = whenDefined(connectedProvider, p => new providers.Web3Provider(p))
    setEthersProvider(newProvider)

    onChainChanged(connectedProvider.chainId)

    connectedProvider.on('chainChanged', (chainId: number) => {
      // TODO: handle connected chain change by routing to different deployments or alert message
      onChainChanged(chainId)
      window.location.reload()
    })
  }

  return (
    <>
      {address && (
        <div className="text-right">
          <div className="flex">
            <Link to={`/${address}`} className="hs-link">
              <div className="m[right]-2">
                {address.substring(2, 6)}
                ...
                {address.substring(address.length - 4, address.length)}
              </div>
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
