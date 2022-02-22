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

    case Market.DISCORD:
      return Market.DISCORD

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

    case Market.DISCORD:
      return 'Discord'

    default:
      return 'Invalid'
  }
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
      return Promise.reject('Invalid network')
  }
}

type MarketAddressOptions = {
  github: string
  youtube: string
  discord: string
}

export const getNetworkMarketAddresses = async (
  provider: ethers.providers.BaseProvider
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
      return Promise.reject('Invalid network')
  }
}

export const selectMarketAddressOption = (market: Market, options: MarketAddressOptions): UndefinedOr<string> => {
  switch (market) {
    case Market.GITHUB:
      return options.github

    case Market.YOUTUBE:
      return options.youtube

    case Market.DISCORD:
      return options.discord

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

export const infuraBaseEndpoint = import.meta.env.VITE_INFURA_BASE_ENDPOINT
export const infuraProjectId = import.meta.env.VITE_INFURA_PROJECT_ID

export const infuraEndpoint = () =>
  infuraBaseEndpoint && infuraProjectId ? `${infuraBaseEndpoint}/${infuraProjectId}` : undefined

export const getPropertyData = async (provider: providers.JsonRpcProvider, address: string) => {
  return createPropertyContract(provider)(address)
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

export const deployedNetworkToReadable = () => {
  switch (import.meta.env.VITE_L2_NETWORK) {
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

export const getExplorerUrl = () => {
  switch (import.meta.env.VITE_L2_NETWORK) {
    case 'arbitrum-one':
      return 'https://explorer.arbitrum.io'
    case 'arbitrum-rinkeby':
      return 'https://rinkeby-explorer.arbitrum.io'
    case 'polygon-mainnet':
      return 'https://polygonscan.com'
    case 'polygon-mumbai':
      return 'https://mumbai.polygonscan.com'
  }
}

export const getMajorDexUrl = () => {
  switch (import.meta.env.VITE_L2_NETWORK) {
    case 'arbitrum-one':
      return 'https://app.uniswap.org/#/swap?chain=arbitrum'
    case 'arbitrum-rinkeby':
      return undefined
    case 'polygon-mainnet':
      return 'https://quickswap.exchange/#/swap?outputCurrency=0xA5577D1cec2583058A6Bd6d5DEAC44797c205701'
    case 'polygon-mumbai':
      return undefined
  }
}
