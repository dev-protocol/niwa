interface ImportMetaEnv {
  readonly VITE_L2_NETWORK: 'arbitrum-one' | 'polygon-mainnet' | 'polygon-mumbai'
  readonly VITE_INFURA_PROJECT_ID: string
  readonly VITE_BASE_INFURA_ENDPOINT: string
  readonly VITE_IS_ROOT: string
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
