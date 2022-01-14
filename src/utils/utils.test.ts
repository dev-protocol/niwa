import { it, describe, expect, assert } from 'vitest'
import { Market } from '../const'
import { getMarketFromString, isValidNetwork, marketToReadable } from './utils'

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
})

export {}
