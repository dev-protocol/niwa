import { useProvider } from '../context/walletContext'
import { UndefinedOr } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import { createSTokensContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'
import { useCallback, useState } from 'react'
import { ERROR_MSG } from '../const'

export const getPositionsOfOwner = async ({
  provider,
  userAddress,
  sTokenAddress
}: {
  provider: providers.BaseProvider
  userAddress: string
  sTokenAddress: string
}) => {
  const sTokens = createSTokensContract(provider)(sTokenAddress)
  return await sTokens.positionsOfOwner(userAddress)
}

export const usePositionsOfOwner = () => {
  const { nonConnectedEthersProvider } = useProvider()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<UndefinedOr<string>>()
  const callback = useCallback(
    async (userAddress: string) => {
      setIsLoading(true)
      setError(undefined)
      if (!nonConnectedEthersProvider) {
        setIsLoading(false)
        setError(ERROR_MSG.no_provider)
        return
      }

      const networkContracts = await mapProviderToDevContracts(nonConnectedEthersProvider)
      if (!networkContracts) {
        setIsLoading(false)
        setError(ERROR_MSG.invalid_network)
        return
      }

      try {
        setIsLoading(false)
        return await getPositionsOfOwner({
          provider: nonConnectedEthersProvider,
          userAddress,
          sTokenAddress: networkContracts.sTokens
        })
      } catch (error) {
        setError(`Fetching sToken Positions of ${userAddress}`)
        setIsLoading(false)
        return
      }
    },
    [nonConnectedEthersProvider]
  )
  return { fetchPositionsOfOwner: callback, error, isLoading }
}
