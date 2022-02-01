import { useProvider } from '../context/walletContext'
import useSWR from 'swr'
import { SWRCachePath } from '../const/cache-path'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import { createMarketContract, createMarketFactoryContract, MarketContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'
import { AddressContractContainer } from '../types/AddressContractContainer'

export const getEnabledMarkets = async (
  provider: providers.BaseProvider
): Promise<UndefinedOr<AddressContractContainer<MarketContract>[]>> => {
  const networkDevContracts = await mapProviderToDevContracts(provider)
  if (!networkDevContracts) {
    return
  }
  const marketFactory = createMarketFactoryContract(provider)(networkDevContracts.marketFactory)
  const enabledMarkets = await marketFactory.getEnabledMarkets()
  const markets = enabledMarkets.map(address => ({ address, contract: createMarketContract(provider)(address) }))
  return markets
}

export const useEnabledMarkets = () => {
  const { nonConnectedEthersProvider } = useProvider()
  const { data, error } = useSWR(
    SWRCachePath.getEnabledMarkets(),
    () => whenDefined(nonConnectedEthersProvider, client => getEnabledMarkets(client)),
    {
      onError: err => {
        console.log(err)
      },
      revalidateOnFocus: false,
      focusThrottleInterval: 0
    }
  )
  return { enabledMarkets: data, error }
}
