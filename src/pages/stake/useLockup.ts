import { UndefinedOr } from '@devprotocol/util-ts'
import { BigNumber, providers } from 'ethers'
import { createLockupContract } from '@devprotocol/dev-kit/l2'
import { useCallback, useState } from 'react'
import { ERROR_MSG } from '../../const'
import { mapProviderToDevContracts } from '../../utils/utils'
import { useProvider } from '../../context/walletContext'

export const lockup = async ({
  provider,
  lockupAddress,
  propertyAddress,
  amount
}: {
  provider: providers.BaseProvider
  lockupAddress: string
  propertyAddress: string
  amount: BigNumber
}) => {
  const lockup = createLockupContract(provider)(lockupAddress)
  return await lockup.depositToProperty(propertyAddress, amount.toString())
}

export const useLockup = () => {
  const { ethersProvider } = useProvider()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<UndefinedOr<string>>()
  const callback = useCallback(
    async (propertyAddress: string, amount: BigNumber) => {
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
        return await lockup({
          provider: ethersProvider,
          lockupAddress: networkContracts.lockup,
          propertyAddress,
          amount
        })
      } catch (error) {
        console.error(error)
        setError(`Error staking on ${propertyAddress}`)
        setIsLoading(false)
        return
      }
    },
    [ethersProvider]
  )
  return { lockup: callback, error, isLoading }
}
