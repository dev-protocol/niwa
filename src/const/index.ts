export enum Market {
  GITHUB = 'GITHUB',
  YOUTUBE = 'YOUTUBE',
  DISCORD = 'DISCORD',
  INVALID = 'INVALID'
}

export const EMPTY_USER_TOKEN_PATH = '0x00'

export const ERROR_MSG = {
  no_provider: 'No user provider found. Is your wallet connected?',
  invalid_network: 'No valid network name found. Are you using L2 Arbitrum or Polygon?',
  no_matching_market_options: 'No matching market addresses found',
  no_matching_market: 'No matching market address found',
  no_property_address: 'No property address found'
} as const

export const FORM_HINT = {
  symbol_length: 'Symbol should be 3 to 4 characters long (for example DEV)'
} as const

export const DEPLOYMENTS = {
  arbitrum_rinkeby: 'https://arbitrum-rinkeby.niwa.xyz',
  arbitrum_one: 'https://arbitrum.niwa.xyz',
  polygon_mumbai: 'https://polygon-mumbai.niwa.xyz',
  polygon_mainnet: 'https://polygon.niwa.xyz'
}

export const NETWORK_RPC_URLS = {
  arbitrum_rinkeby: 'https://rinkeby.arbitrum.io/rpc',
  arbitrum_one: 'https://arb1.arbitrum.io/rpc',
  polygon_mumbai: 'https://rpc-mumbai.maticvigil.com/',
  polygon_mainnet: 'https://polygon-rpc.com/'
}

export const TOKENIZE_STEP_LABELS = ['Select Market', 'Enter Token Details', 'Create Token'] as const
