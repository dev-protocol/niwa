import { providers } from 'ethers'
import { whenDefined } from '@devprotocol/util-ts'
import React, { useEffect, useState } from 'react'
import { useProvider } from '../../context/walletContext'
import HSButton from '../HSButton'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaExclamationTriangle } from 'react-icons/fa'
import { crunchAddress, deployedNetworkToReadable } from '../../utils/utils'
import { WagmiConfig } from 'wagmi'
import { watchWalletClient } from '@wagmi/core'
import { polygonMumbai, polygon, mainnet } from 'wagmi/chains'
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from '@web3modal/wagmi/react'

type ConnectButtonParams = {}

const web3ModalProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || ''
const chains = [polygonMumbai, polygon, mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId: web3ModalProjectId, appName: 'Niwa' })
createWeb3Modal({ wagmiConfig, projectId: web3ModalProjectId, chains })

const ConnectButton: React.FC<ConnectButtonParams> = () => {
  const [address, setAddress] = useState<string | null>(null)

  const web3Modal = useWeb3Modal()
  const { ethersProvider, setEthersProvider, isValidConnectedNetwork } = useProvider()

  useEffect(() => {
    watchWalletClient({}, wallet => {
      whenDefined(wallet, async wal => {
        const connectedProvider = wal.transport
        const newProvider = whenDefined(connectedProvider, p => new providers.Web3Provider(p))
        setEthersProvider(newProvider)
      }) ?? setEthersProvider(undefined)
    })
  })

  useEffect(() => {
    const getProvider = async (): Promise<void> => {
      if (ethersProvider) {
        const currentAddress = await ethersProvider.getSigner().getAddress()
        setAddress(currentAddress)
      } else {
        setAddress(null)
      }
    }

    getProvider()
  }, [ethersProvider])

  return (
    <WagmiConfig config={wagmiConfig}>
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
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-red-400" />
                  <div className="text-danger-400 ml-1">
                    Connect Wallet to <span className="uppercase">{deployedNetworkToReadable()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {!address && (
          <HSButton onClick={() => web3Modal.open()} type="filled">
            Connect Wallet
          </HSButton>
        )}
      </div>
    </WagmiConfig>
  )
}

export default ConnectButton
