import { MarketContract } from '@devprotocol/dev-kit/l2'
import { UndefinedOr } from '@devprotocol/util-ts'
import { useState } from 'react'
import useSWR from 'swr'
import { Market } from '../const'
import { SWRCachePath } from '../const/cache-path'
import { useProvider } from '../context/walletContext'
import { AddressContractContainer } from '../types/AddressContractContainer'
import { getMarketFromString, getPropertyData, matchMarketToAsset } from '../utils/utils'
import { getEnabledMarkets } from './useEnabledMarkets'
import { getAssetsByProperties } from './useMetrics'

export type PropertyDetails = {
  propertyName: string
  propertySymbol: string
  id: UndefinedOr<string>
  marketAddress: string
  market: Market
}

export const usePropertyDetails = (propertyAddress?: string) => {
  const { nonConnectedEthersProvider } = useProvider()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<UndefinedOr<string>>('')

  const matchMarket = async (propertyAddress: string, enabledMarkets: AddressContractContainer<MarketContract>[]) => {
    const flatten = await Promise.all(
      enabledMarkets.map(async m => ({
        market: m,
        properties: await m.contract.getAuthenticatedProperties()
      }))
    )

    const matchingMarket = flatten.find(m => {
      return m.properties.includes(propertyAddress)
    })?.market

    if (!matchingMarket) {
      return
    }
    const market = getMarketFromString(await matchingMarket.contract.name())
    return {
      market,
      address: matchingMarket.address
    }
  }

  const onError = (message: string) => {
    setError(message)
    setIsLoading(false)
  }

  const { data } = useSWR(
    SWRCachePath.usePropertyDetails(propertyAddress),
    async () => {
      if (!propertyAddress) {
        setError('No property address provided')
        return
      }
      setError(undefined)
      setIsLoading(true)

      const [propertyData, enabledMarkets, assetProperties] = await Promise.all([
        getPropertyData(nonConnectedEthersProvider, propertyAddress),
        getEnabledMarkets(nonConnectedEthersProvider),
        getAssetsByProperties(nonConnectedEthersProvider, propertyAddress)
      ])

      if (!propertyData) {
        onError(`No Property Data found for ${propertyAddress}`)
        return
      }

      if (!enabledMarkets) {
        onError('No enabled markets found. Please try again later')
        return
      }

      if (!assetProperties || assetProperties.length <= 0) {
        onError(`No properties found for ${propertyAddress}`)
        return
      }

      const [propertyName, propertySymbol] = await Promise.all([propertyData.name(), propertyData.symbol()])

      const matchingMarket = await matchMarket(propertyAddress, enabledMarkets)
      if (!matchingMarket) {
        onError(`No matching market found`)
        return
      }

      const assetProperty = matchMarketToAsset(matchingMarket.address, assetProperties)
      const id = assetProperty?.id

      setIsLoading(false)

      return {
        propertyName,
        propertySymbol,
        id,
        marketAddress: matchingMarket.address,
        market: matchingMarket.market
      }
    },
    {
      onError: err => {
        console.log(err)
        setError(err)
        setIsLoading(false)
      },
      revalidateOnFocus: false,
      focusThrottleInterval: 0
    }
  )
  return { propertyDetails: data, error, isLoading }
}
