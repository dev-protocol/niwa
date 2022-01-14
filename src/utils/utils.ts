import { UndefinedOr } from '@devprotocol/util-ts'
import { providers } from 'ethers'
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
