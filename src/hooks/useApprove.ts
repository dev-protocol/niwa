import { useProvider } from '../context/walletContext'
import { UndefinedOr } from '@devprotocol/util-ts'
import { constants, providers } from 'ethers'
import { createDevContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'
import { useCallback, useState } from 'react'
import { ERROR_MSG } from '../const'

export const approve = async ({
  provider,
  spenderAddress,
  tokenAddress
}: {
  provider: providers.BaseProvider
  spenderAddress: string
  tokenAddress: string
}) => {
  const dev = createDevContract(provider)(tokenAddress)
  return await dev.approve(spenderAddress, constants.MaxUint256.toString())
}

// For testing
export const revoke = async ({
  provider,
  spenderAddress
}: {
  provider: providers.BaseProvider
  spenderAddress: string
}) => {
  const networkContracts = await mapProviderToDevContracts(provider)
  if (!networkContracts) {
    return
  }

  const dev = createDevContract(provider)(networkContracts.token)
  return await dev.approve(spenderAddress, constants.Zero.toString())
}

export const useDevApprove = () => {
  const { ethersProvider } = useProvider()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<UndefinedOr<string>>()
  const callback = useCallback(
    async (spenderAddress: string) => {
      setIsLoading(true)
      setError(undefined)
      if (!ethersProvider) {
        setIsLoading(false)
        setError(ERROR_MSG.no_provider)
        return
      }

      const networkContracts = await mapProviderToDevContracts(ethersProvider)
      if (!networkContracts) {
        setIsLoading(false)
        setError(ERROR_MSG.invalid_network)
        return
      }

      try {
        setIsLoading(false)
        return await approve({
          provider: ethersProvider,
          spenderAddress,
          tokenAddress: networkContracts.token
        })
      } catch (error) {
        setError(`Error approving ${spenderAddress}`)
        setIsLoading(false)
        return
      }
    },
    [ethersProvider]
  )
  return { approve: callback, error, isLoading }
}
