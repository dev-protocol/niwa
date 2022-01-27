export const SWRCachePath = {
  getPropertyData: (propertyAddress?: string) => `propertyData/${propertyAddress}`,
  getUserPropertyList: (address?: string) => `userPropertyList/${address}`,
  getEnabledMarkets: () => `enabledMarkets`,
  getMarket: (address: string) => `market/${address}`
  // getMarketMetrics: (address: string) => `marketMetrics/${address}`
} as const
