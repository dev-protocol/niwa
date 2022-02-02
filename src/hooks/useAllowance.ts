import { useProvider } from '../context/walletContext'
import { UndefinedOr } from '@devprotocol/util-ts'
import { BigNumber, providers } from 'ethers'
import { createDevContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'
import { useCallback, useState } from 'react'
import { ERROR_MSG } from '../const'

export const getAllowance = async ({
  provider,
  spenderAddress,
  tokenAddress,
  userAddress
}: {
  provider: providers.BaseProvider
  spenderAddress: string
  tokenAddress: string
  userAddress: string
}) => {
  const dev = createDevContract(provider)(tokenAddress)
  return BigNumber.from((await dev.allowance(userAddress, spenderAddress)) ?? 0)
}

export const useDevAllowance = () => {
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

      const [userAddress, networkContracts] = await Promise.all([
        ethersProvider.getSigner().getAddress(),
        mapProviderToDevContracts(ethersProvider)
      ])
      if (!networkContracts) {
        setIsLoading(false)
        setError(ERROR_MSG.invalid_network)
        return
      }

      setIsLoading(false)
      return await getAllowance({
        provider: ethersProvider,
        spenderAddress,
        tokenAddress: networkContracts.token,
        userAddress
      })
    },
    [ethersProvider]
  )
  return { fetchAllowance: callback, error, isLoading }
}
