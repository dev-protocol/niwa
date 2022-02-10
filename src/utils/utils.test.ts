import { addresses, marketAddresses } from '@devprotocol/dev-kit'
import { ethers } from 'ethers'
import { it, describe, expect } from 'vitest'
import { Market } from '../const'
import {
  getMarketFromString,
  getNetworkMarketAddresses,
  isValidNetwork,
  mapProviderToDevContracts,
  marketToReadable
} from './utils'

describe(`utils`, () => {
  it('getMarketFromString', () => {
    const market = getMarketFromString('github')
    expect(market).to.eq(Market.GITHUB)
    const undefinedMarket = getMarketFromString('abc')
    expect(undefinedMarket).to.eq(Market.INVALID)
  })

  it('marketToReadable', () => {
    const readable = marketToReadable(Market.GITHUB)
    expect(readable).to.eq('GitHub')
  })

  it('should check valid network', () => {
    const invalid = isValidNetwork(1)
    expect(invalid).to.eq(false)

    const polygon = isValidNetwork(137)
    expect(polygon).to.eq(true)
  })

  it('mapProviderToDevContracts: should correctly map network addresses by chain id', async () => {
    const chainId = 421611 // arbitrum testnet
    const provider = new ethers.providers.InfuraProvider(chainId)
    const contracts = await mapProviderToDevContracts(provider)
    expect(contracts?.token).to.eq(addresses.arbitrum.rinkeby.token)
  })

  it('mapProviderToDevContracts: should reject mapping unsupported network', async () => {
    const chainId = 1 // L1 is unsupported on niwa
    const provider = new ethers.providers.InfuraProvider(chainId)
    await expect(mapProviderToDevContracts(provider)).rejects.toEqual('Invalid network')
  })

  it('getNetworkMarketAddresses: should correctly map market addresses by chain id', async () => {
    const chainId = 421611 // arbitrum testnet
    const provider = new ethers.providers.InfuraProvider(chainId)
    const addresses = await getNetworkMarketAddresses(provider)
    expect(addresses?.github).to.eq(marketAddresses.arbitrum.rinkeby.github)
  })

  it('getNetworkMarketAddresses: should reject mapping unsupported network', async () => {
    const chainId = 1 // L1 is unsupported on niwa
    const provider = new ethers.providers.InfuraProvider(chainId)
    await expect(getNetworkMarketAddresses(provider)).rejects.toEqual('Invalid network')
  })
})

export {}
