import { createPropertyFactoryContract } from '@devprotocol/dev-kit/l2'
import { whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import useSWR from 'swr'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { SWRCachePath } from '../../const/cache-path'
import { useProvider } from '../../context/walletContext'
import { getPropertyData, mapProviderToDevContracts } from '../../utils/utils'

export const getUserPropertyList = async (provider: providers.JsonRpcProvider, address?: string) => {
  if (!address || address === EMPTY_USER_TOKEN_PATH) {
    return []
  }
  const networkDevContracts = await mapProviderToDevContracts(provider)
  if (!networkDevContracts) {
    return
  }
  const propertyFactoryContract = createPropertyFactoryContract(provider)(networkDevContracts.propertyFactory)
  const properties = await propertyFactoryContract.getPropertiesOfAuthor(address)
  const calls = properties.map(_address => getPropertyData(provider, _address))
  const propertyData = await Promise.all(calls)
  return propertyData
}

export const useUserPropertiesList = (userAddress?: string) => {
  const { nonConnectedEthersProvider } = useProvider()
  const { data, error } = useSWR(
    SWRCachePath.getUserPropertyList(userAddress),
    () => whenDefined(nonConnectedEthersProvider, client => getUserPropertyList(client, userAddress)),
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
