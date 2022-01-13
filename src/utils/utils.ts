import { UndefinedOr } from '@devprotocol/util-ts'
import { Market } from '../const/market.const'

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

export const marketToReadable = (market: Market): string => {
  switch (market) {
    case Market.GITHUB:
      return 'GitHub'

    case Market.YOUTUBE:
      return 'YouTube'

    default:
      return 'Invalid'
  }
}
