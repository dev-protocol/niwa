import { useProvider } from '../context/walletContext'
import useSWR from 'swr'
import { SWRCachePath } from '../const/cache-path'
import { whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import { createMarketFactoryContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'

const getEnabledMarkets = async (provider: providers.BaseProvider) => {
  const networkDevContracts = await mapProviderToDevContracts(provider)
  if (!networkDevContracts) {
    return
  }
  const marketFactory = createMarketFactoryContract(provider)(networkDevContracts.marketFactory)
  const enabledMarkets = await marketFactory.getEnabledMarkets()
  return enabledMarkets
}

export const useUserPropertiesList = () => {
  const { nonConnectedEthersProvider } = useProvider()
  const { data, error } = useSWR(
    SWRCachePath.getUserPropertyList(),
    () => whenDefined(nonConnectedEthersProvider, client => getEnabledMarkets(client)),
    {
      onError: err => {
        console.log(err)
      },
      revalidateOnFocus: false,
      focusThrottleInterval: 0
    }
  )
  return { userProperties: data, error }
}
