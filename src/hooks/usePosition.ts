import { useProvider } from '../context/walletContext'
import { UndefinedOr } from '@devprotocol/util-ts'
import { providers } from 'ethers'
import { createSTokensContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'
import { useCallback, useState } from 'react'
import { ERROR_MSG } from '../const'

export const getPosition = async ({
  provider,
  tokenId,
  sTokenAddress
}: {
  provider: providers.BaseProvider
  tokenId: number
  sTokenAddress: string
}) => {
  const sTokens = createSTokensContract(provider)(sTokenAddress)
  return await sTokens.positions(tokenId)
}

export const usePosition = () => {
  const { nonConnectedEthersProvider } = useProvider()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<UndefinedOr<string>>()
  const callback = useCallback(
    async (tokenId: number) => {
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
        return await getPosition({
          provider: nonConnectedEthersProvider,
          tokenId,
          sTokenAddress: networkContracts.sTokens
        })
      } catch (error) {
        setError(`Fetching sToken Positions of ${tokenId}`)
        setIsLoading(false)
        return
      }
    },
    [nonConnectedEthersProvider]
  )
  return { fetchPosition: callback, error, isLoading }
}
