interface ImportMetaEnv {
  readonly VITE_L2_NETWORK: 'arbitrum-one' | 'arbitrum-rinkeby' | 'polygon-mainnet' | 'polygon-mumbai'
  readonly VITE_INFURA_PROJECT_ID: string
  readonly VITE_BASE_INFURA_ENDPOINT: string
  readonly VITE_IS_ROOT?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
