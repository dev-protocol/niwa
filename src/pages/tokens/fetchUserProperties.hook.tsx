import { createPropertyFactoryContract, PropertyContract } from '@devprotocol/dev-kit/l2'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import useSWR from 'swr'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { SWRCachePath } from '../../const/cache-path'
import { useProvider } from '../../context/walletContext'
import { AddressContractContainer } from '../../types/AddressContractContainer'
import { getPropertyData, mapProviderToDevContracts } from '../../utils/utils'

export const getUserPropertyList = async (
  provider: providers.JsonRpcProvider,
  userAddress?: string
): Promise<UndefinedOr<AddressContractContainer<PropertyContract>[]>> => {
  if (!userAddress || userAddress === EMPTY_USER_TOKEN_PATH) {
    return []
  }
  const networkDevContracts = await mapProviderToDevContracts(provider)
  if (!networkDevContracts) {
    return
  }
  const propertyFactoryContract = createPropertyFactoryContract(provider)(networkDevContracts.propertyFactory)
  const properties = await propertyFactoryContract.getPropertiesOfAuthor(userAddress)
  const calls = properties.map(async _address => {
    const contract = await getPropertyData(provider, _address)
    return {
      address: _address,
      contract
    }
  })
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
