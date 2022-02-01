export enum Market {
  GITHUB = 'GITHUB',
  YOUTUBE = 'YOUTUBE',
  INVALID = 'INVALID'
}

export const EMPTY_USER_TOKEN_PATH = '0x00'

export const ERROR_MSG = {
  no_provider: 'No user provider found. Is your wallet connected?',
  invalid_network: 'No valid network name found. Are you using L2 Arbitrum or Polygon?',
  no_matching_market_options: 'No matching market addresses found',
  no_matching_market: 'No matching market address found'
} as const
