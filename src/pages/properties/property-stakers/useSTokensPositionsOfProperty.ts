import { createSTokensContract } from '@devprotocol/dev-kit/l2'
import { whenDefined } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import useSWR from 'swr'
import { SWRCachePath } from '../../../const/cache-path'
import { useProvider } from '../../../context/walletContext'
import { mapProviderToDevContracts } from '../../../utils/utils'

export const getSTokensPositionsOfProperty = async (
  provider: providers.JsonRpcProvider,
  sTokensAddress: string,
  propertyAddress?: string
) => {
  if (!propertyAddress) {
    return
  }
  const contract = createSTokensContract(provider)(sTokensAddress)
  const positionsOfProperty = await contract.positionsOfProperty(propertyAddress)

  const positionsCalls = positionsOfProperty.map(id => contract.positions(id))
  const ownerCalls = positionsOfProperty.map(id => contract.ownerOf(id))
  const positions = await Promise.all([...positionsCalls])
  const owners = await Promise.all([...ownerCalls])

  console.log('positions are: ', positions)
  console.log('owners are: ', owners)
  const res = positions.map((pos, i) => ({
    owner: owners[i],
    ...pos
  }))
  console.log('res is: ', res)

  return res
}

export const useSTokensPositionsOfProperty = (propertyAddress?: string) => {
  const { nonConnectedEthersProvider } = useProvider()
  const { data, error } = useSWR(
    SWRCachePath.getSTokensPositionsOfProperty(propertyAddress),
    () =>
      whenDefined(nonConnectedEthersProvider, async client => {
        const networkContracts = await mapProviderToDevContracts(nonConnectedEthersProvider)
        if (!networkContracts) {
          return
        }

        return getSTokensPositionsOfProperty(client, networkContracts.sTokens, propertyAddress)
      }),
    {
      onError: err => {
        console.log(err)
      },
      revalidateOnFocus: false,
      focusThrottleInterval: 0
    }
  )
  return { sTokensPositionsOfProperty: data, error }
}
