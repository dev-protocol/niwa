import { addresses, marketAddresses } from '@devprotocol/dev-kit'
import { UndefinedOr } from '@devprotocol/util-ts'
import { ethers } from 'ethers'
import { it, describe, expect, beforeEach } from 'vitest'
import { Market } from '../const'
import {
  getMarketFromString,
  getNetworkMarketAddresses,
  isValidNetwork,
  mapProviderToDevContracts,
  marketToReadable,
  selectMarketAddressOption
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

  describe('mapProviderToDevContracts', () => {
    it('should correctly map network addresses by chain id', async () => {
      const chainId = 421611 // arbitrum testnet
      const provider = new ethers.providers.InfuraProvider(chainId)
      const contracts = await mapProviderToDevContracts(provider)
      expect(contracts?.token).to.eq(addresses.arbitrum.rinkeby.token)
    })

    it('should reject mapping unsupported network', async () => {
      const chainId = 1 // L1 is unsupported on niwa
      const provider = new ethers.providers.InfuraProvider(chainId)
      await expect(mapProviderToDevContracts(provider)).rejects.toEqual('Invalid network')
    })
  })

  describe('getNetworkMarketAddresses', () => {
    it('should correctly map market addresses by chain id', async () => {
      const chainId = 421611 // arbitrum testnet
      const provider = new ethers.providers.InfuraProvider(chainId)
      const addresses = await getNetworkMarketAddresses(provider)
      expect(addresses?.github).to.eq(marketAddresses.arbitrum.rinkeby.github)
    })
    it('should reject mapping unsupported network', async () => {
      const chainId = 1 // L1 is unsupported on niwa
      const provider = new ethers.providers.InfuraProvider(chainId)
      await expect(getNetworkMarketAddresses(provider)).rejects.toEqual('Invalid network')
    })
  })

  describe('selectMarketAddressOption', async () => {
    let chainId,
      provider,
      marketOptions: UndefinedOr<{
        github: string
        youtube: string // arbitrum testnet
      }>

    beforeEach(async () => {
      chainId = 421611 // arbitrum testnet
      provider = new ethers.providers.InfuraProvider(chainId)
      marketOptions = await getNetworkMarketAddresses(provider)
    })

    it('should correctly select from options', async () => {
      const marketAddress = selectMarketAddressOption(Market.GITHUB, marketOptions!)
      expect(marketAddress).to.eq(marketOptions?.github)
    })
    it('should fail with invalid market', () => {
      const marketAddress = selectMarketAddressOption(Market.INVALID, marketOptions!)
      expect(marketAddress).to.eq(undefined)
    })
  })
})

export {}
