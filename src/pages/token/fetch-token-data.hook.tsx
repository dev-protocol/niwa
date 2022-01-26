import { createPropertyContract } from '@devprotocol/dev-kit/l2'
import { whenDefinedAll } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import useSWR from 'swr'
import { SWRCachePath } from '../../const/cache-path'
import { useProvider } from '../../context/walletContext'

export const getPropertyData = async (provider: providers.JsonRpcProvider, address: string) => {
  return await createPropertyContract(provider)(address)
}

export const usePropertyData = (propertyAddress?: string) => {
  const { nonConnectedEthersProvider } = useProvider()
  const { data, error } = useSWR(
    SWRCachePath.getPropertyData(propertyAddress),
    () =>
      whenDefinedAll([nonConnectedEthersProvider, propertyAddress], ([client, property]) =>
        getPropertyData(client, property)
      ),
    {
      onError: err => {
        console.log(err)
      },
      revalidateOnFocus: false,
      focusThrottleInterval: 0
    }
  )
  return { propertyData: data, error }
}
