export const SWRCachePath = {
  getPropertyData: (propertyAddress?: string) => `propertyData/${propertyAddress}`,
  getUserPropertyList: (address?: string) => `userPropertyList/${address}`,
  getEnabledMarkets: () => `enabledMarkets`
} as const
