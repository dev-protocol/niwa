import { useProvider } from '../context/walletContext'
import useSWR from 'swr'
import { SWRResponse } from 'swr'
import { SWRCachePath } from '../const/cache-path'
import { UndefinedOr, whenDefined, whenDefinedAll } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import {
  createMarketBehaviorContract,
  createMarketContract,
  createMetricsContract,
  createMetricsFactoryContract
} from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'
import { getMarket } from './useMarket'

const metricsOfProperty = async (provider: providers.BaseProvider, address?: string) => {
  if (!address) {
    return
  }
  const networkDevContracts = await mapProviderToDevContracts(provider)
  if (!networkDevContracts) {
    return
  }
  const metricsFactory = createMetricsFactoryContract(provider)(networkDevContracts.metricsFactory)
  const metricsAddresses = await metricsFactory.metricsOfProperty(address)
  return metricsAddresses
}

export const getId = async (provider: providers.BaseProvider, marketBehavior: string, metricsAddress: string) => {
  const marketBehaviorContract = createMarketBehaviorContract(provider)(marketBehavior)
  const id = await marketBehaviorContract.getId(metricsAddress)
  return id
}

export const getMarketMetrics = async (provider: providers.BaseProvider, marketAddress: string) => {
  const networkDevContracts = await mapProviderToDevContracts(provider)
  if (!networkDevContracts) {
    return
  }
  const metrics = createMetricsContract(provider)(marketAddress)
  return metrics.market()
}

export const getMarketMetricsById = async (provider: providers.BaseProvider, marketAddress: string, id: string) => {
  const market = createMarketContract(provider)(marketAddress)
  const behavior = await market.behavior()
  const marketBehavior = createMarketBehaviorContract(provider)(behavior)
  const metricsAddress = await marketBehavior.getMetrics(id) // for example github repo name or youtube channel id
  return metricsAddress
}

export type AssetProperty = {
  market: UndefinedOr<string>
  id: UndefinedOr<string>
}

export const useGetAssetsByProperties = (propertyAddress?: string): SWRResponse<UndefinedOr<AssetProperty[]>, any> => {
  const { nonConnectedEthersProvider } = useProvider()
  return useSWR(SWRCachePath.useGetAssetsByProperties(propertyAddress), () =>
    whenDefinedAll([nonConnectedEthersProvider, propertyAddress], async ([client, property]) => {
      const metrics = await metricsOfProperty(client, property)
      const markets = await whenDefined(metrics, met => Promise.all(met.map(m => getMarketMetrics(client, m))))
      const behaviors = await whenDefined(markets, marks =>
        Promise.all(marks.map(mak => whenDefined(mak, async m => (await getMarket(client, m))?.behavior())))
      )
      const ids = await whenDefinedAll([behaviors, metrics], ([behav, mets]) =>
        Promise.all(behav.map((beh, i) => whenDefinedAll([beh, mets[i]], ([b, m]) => getId(client, b, m))))
      )
      const res = whenDefinedAll([ids, markets], ([idx, marks]) => marks.map((market, i) => ({ market, id: idx[i] })))
      return res
    })
  )
}
