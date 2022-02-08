import { UndefinedOr } from '@devprotocol/util-ts'
import { BigNumber, providers } from 'ethers'
import { useCallback, useState } from 'react'
import { ERROR_MSG } from '../../const'
import { useProvider } from '../../context/walletContext'
import { positionsCreate } from '@devprotocol/dev-kit/agent'

export const lockup = async ({
  provider,
  propertyAddress,
  amount,
  userAddress
}: {
  provider: providers.BaseProvider
  propertyAddress: string
  amount: BigNumber
  userAddress: string
}) => {
  return await positionsCreate({
    provider: provider,
    destination: propertyAddress,
    amount: amount.toString(),
    from: userAddress
  })
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

      const userAddress = await ethersProvider.getSigner().getAddress()

      try {
        setIsLoading(false)
        const tx = await lockup({
          provider: ethersProvider,
          propertyAddress,
          amount,
          userAddress
        })
        console.log('tx is: ', tx)
        if (!tx) {
          setError(`Tx failed`)
          setIsLoading(false)
          return
        }
        const approve = await tx.approveIfNeeded()
        const stake = await approve.waitOrSkip()
        const res = await stake.wait()
        return res
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
