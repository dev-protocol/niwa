import { addresses } from '@devprotocol/dev-kit'
import { UndefinedOr } from '@devprotocol/util-ts'
import { ethers, providers } from 'ethers'
import { Market } from '../const'

export const getMarketFromString = (market: UndefinedOr<string>): Market => {
  switch (market?.toUpperCase()) {
    case Market.GITHUB:
      return Market.GITHUB

    case Market.YOUTUBE:
      return Market.YOUTUBE

    default:
      return Market.INVALID
  }
}

export const marketToReadable = (market: UndefinedOr<Market>): string => {
  switch (market) {
    case Market.GITHUB:
      return 'GitHub'

    case Market.YOUTUBE:
      return 'YouTube'

    default:
      return 'Invalid'
  }
}

// TODO: can this be removed now that Invitation has been removed?
export const sign = async (
  provider: UndefinedOr<providers.Web3Provider> | null,
  inputMessage: string
): Promise<UndefinedOr<string>> => {
  if (provider) {
    const signer = provider.getSigner()

    const address = await signer.getAddress()
    if (!address) {
      return undefined
    }

    const signature = await signer.signMessage(inputMessage)
    return signature
  }
  return undefined
}

export const isValidNetwork = (chainId: UndefinedOr<number>) => {
  switch (chainId) {
    case 421611: // arbitrum testnet
    case 42161: // arbitrum mainnet
    case 137: // polygon mainnet
    case 80001: // polygon testnet
      return true

    default:
      return false
  }
}

export const mapProviderToDevContracts = async (provider: ethers.providers.Web3Provider) => {
  const network = await provider.getNetwork()
  switch (network.chainId) {
    case 421611: // // arbitrum testnet
      return addresses.arbitrum.rinkeby
    case 42161: // arbitrum mainnet
      return addresses.arbitrum.one
    case 137: // polygon mainnet
      return addresses.polygon.mainnet
    case 80001: // polygon testnet
      return addresses.polygon.mumbai
    default:
      Promise.reject('Invalid network')
      break
  }
}
