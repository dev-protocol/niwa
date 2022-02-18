import { whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import useSWR from 'swr'
import { SWRCachePath } from '../const/cache-path'
import { useProvider } from '../context/walletContext'
import { getPropertyData } from '../utils/utils'

export const getPropertyBalances = async (provider: providers.JsonRpcProvider, propertyAddress?: string) => {
  if (!propertyAddress) {
    return
  }
  const balances = await (await getPropertyData(provider, propertyAddress)).getBalances()
  return balances
}

export const usePropertyBalances = (propertyAddress?: string) => {
  const { nonConnectedEthersProvider } = useProvider()
  const { data, error } = useSWR(
    SWRCachePath.getUserPropertyList(propertyAddress),
    () => whenDefined(nonConnectedEthersProvider, client => getPropertyBalances(client, propertyAddress)),
    {
      onError: err => {
        console.log(err)
      },
      revalidateOnFocus: false,
      focusThrottleInterval: 0
    }
  )
  return { propertyBalances: data, error }
}
