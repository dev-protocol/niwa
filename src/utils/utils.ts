import { addresses, marketAddresses } from '@devprotocol/dev-kit'
import { UndefinedOr } from '@devprotocol/util-ts'
import { ethers, providers } from 'ethers'
import { DEPLOYMENTS, Market } from '../const'
import { NetworkName } from '@devprotocol/khaos-core'
import { createPropertyContract } from '@devprotocol/dev-kit/l2'
import { AssetProperty } from '../hooks/useMetrics'

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

export const mapProviderToDevContracts = async (provider: ethers.providers.BaseProvider) => {
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

type MarketAddressOptions = {
  github: string
}

export const getNetworkMarketAddresses = async (
  provider: ethers.providers.Web3Provider
): Promise<UndefinedOr<MarketAddressOptions>> => {
  const network = await provider.getNetwork()
  switch (network.chainId) {
    case 421611: // // arbitrum testnet
      return marketAddresses.arbitrum.rinkeby
    case 42161: // arbitrum mainnet
      return marketAddresses.arbitrum.one
    case 137: // polygon mainnet
      return marketAddresses.polygon.mainnet
    case 80001: // polygon testnet
      return marketAddresses.polygon.mumbai
    default:
      Promise.reject('Invalid network')
      return
  }
}

export const selectMarketAddressOption = (market: Market, options: MarketAddressOptions): UndefinedOr<string> => {
  switch (market) {
    case Market.GITHUB:
      return options.github

    default:
      return
  }
}

export const getValidNetworkName = (chainId: number): UndefinedOr<NetworkName> => {
  switch (chainId) {
    case 421611: // // arbitrum testnet
      return 'arbitrum-rinkeby'
    case 42161: // arbitrum mainnet
      return 'arbitrum-one'
    case 137: // polygon mainnet
      return 'polygon-mainnet'
    case 80001: // polygon testnet
      return 'polygon-mumbai'
    default:
      return undefined
  }
}

export const isError = (err: unknown): err is Error => err instanceof Error

export type UnwrapFunc<T> = T extends (...arg: any) => Promise<infer U> ? U : T

export const infuraBaseEndpoint = import.meta.env.VITE_INFURA_BASE_ENDPOINT
export const infuraProjectId = import.meta.env.VITE_INFURA_PROJECT_ID

export const infuraEndpoint = () => `${infuraBaseEndpoint}/${infuraProjectId}`

export const getPropertyData = async (provider: providers.JsonRpcProvider, address: string) => {
  return await createPropertyContract(provider)(address)
}

export const matchMarketToAsset = (targetMarket: string, assetProperties: AssetProperty[]) => {
  return assetProperties.find(p => p.market === targetMarket)
}

const validNumber = new RegExp(/^\d*\.?\d*$/)

export const isNumberInput = (str: string): boolean => {
  return validNumber.test(str)
}

export const connectedNetworkMatchesDeployment = (chainId: number) => {
  return getValidNetworkName(chainId) === import.meta.env.VITE_L2_NETWORK
}

export const getDeploymentUrlByChainId = (chainId: number): UndefinedOr<string> => {
  switch (chainId) {
    case 421611: // arbitrum testnet
      return DEPLOYMENTS.arbitrum_rinkeby
    case 42161: // arbitrum mainnet
      return DEPLOYMENTS.arbitrum_one
    case 137: // polygon mainnet
      return DEPLOYMENTS.polygon_mainnet
    case 80001: // polygon testnet
      return DEPLOYMENTS.polygon_mumbai
    default:
      return undefined
  }
}

export const deployedNetworkToReadable = (
  net: 'arbitrum-one' | 'arbitrum-rinkeby' | 'polygon-mainnet' | 'polygon-mumbai'
) => {
  switch (net) {
    case 'arbitrum-one':
      return 'Arbitrum'

    case 'arbitrum-rinkeby':
      return 'Arbitrum Rinkeby'

    case 'polygon-mainnet':
      return 'Polygon'

    case 'polygon-mumbai':
      return 'Polygon Mumbai'
  }
}

export const crunchAddress = (address: string) => {
  return address.length > 6
    ? `${address.substring(2, 6)}...${address.substring(address.length - 4, address.length)}`
    : ''
}

export const filterNewPosition = (newPositions: readonly number[], oldPositions?: readonly number[]) => {
  // Previously user had no positions
  // If new positions exist, return the first
  if (!oldPositions || oldPositions.length <= 0) {
    if (newPositions.length === 1) {
      return newPositions[0]
    } else {
      return undefined
    }
  }

  // Filter through new positions and remove if they also exist in old positions
  const filteredNewPositions = newPositions.filter(pos => !oldPositions?.includes(pos))
  return filteredNewPositions.length === 1 ? filteredNewPositions[0] : undefined
}
