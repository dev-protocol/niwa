export const SWRCachePath = {
  getPropertyData: (address?: string) => `propertyData/${address}`,
  getUserPropertyList: (address?: string) => `userPropertyList/${address}`,
  getEnabledMarkets: () => `enabledMarkets`,
  getMarket: (address: string) => `market/${address}`,
  getPropertyMetrics: (address: string) => `propertyMetrics/${address}`,
  useGetAssetsByProperties: (propertyAddress?: string) => `useGetAssetsByProperties/${propertyAddress}`,
  usePropertyDetails: (propertyAddress?: string) => `propertyDetails/${propertyAddress}`,
  getSTokensPositionsOfProperty: (propertyAddress?: string) => `sTokensPositionsOfProperty/${propertyAddress}`
} as const
