import { whenDefinedAll } from '@devprotocol/util-ts'
import useSWR from 'swr'
import { SWRCachePath } from '../../const/cache-path'
import { useProvider } from '../../context/walletContext'
import { getPropertyData } from '../../utils/utils'

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
