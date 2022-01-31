import { useProvider } from '../context/walletContext'
import useSWR from 'swr'
import { SWRCachePath } from '../const/cache-path'
import { whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import { createMarketContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'

export const getMarket = async (provider: providers.BaseProvider, marketAddress: string) => {
  const networkDevContracts = await mapProviderToDevContracts(provider)
  if (!networkDevContracts) {
    return
  }
  const marketContract = createMarketContract(provider)(marketAddress)
  return marketContract
}

export const useMarket = (marketAddress: string) => {
  const { nonConnectedEthersProvider } = useProvider()
  const { data, error } = useSWR(
    SWRCachePath.getMarket(marketAddress),
    () => whenDefined(nonConnectedEthersProvider, client => getMarket(client, marketAddress)),
    {
      onError: err => {
        console.log(err)
      },
      revalidateOnFocus: false,
      focusThrottleInterval: 0
    }
  )
  return { market: data, error }
}
