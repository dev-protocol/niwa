// TODO -> this is not being used for now delete me

import { useProvider } from '../context/walletContext'
import { UndefinedOr } from '@devprotocol/util-ts'
import { BigNumber, providers } from 'ethers'
import { createDevContract, createSTokensContract } from '@devprotocol/dev-kit/l2'
import { mapProviderToDevContracts } from '../utils/utils'
import { useCallback, useState } from 'react'
import { ERROR_MSG } from '../const'

export const getPositionsOfOwner = async (
  provider: providers.BaseProvider,
  userAddress: string,
  sTokensAddress: string
) => {
  const sTokensManager = createSTokensContract(provider)(sTokensAddress)
  return await sTokensManager.positionsOfOwner(userAddress)
}

// export const usePositionsOfOwner = () => {
//   const { nonConnectedEthersProvider } = useProvider()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<UndefinedOr<string>>()
//   const callback = useCallback(
//     async (spenderAddress: string) => {
//       setIsLoading(true)
//       setError(undefined)
//       if (!nonConnectedEthersProvider) {
//         setIsLoading(false)
//         setError(ERROR_MSG.no_provider)
//         return
//       }

//       const [networkContracts] = await Promise.all([
//         // ethersProvider.getSigner().getAddress(),
//         mapProviderToDevContracts(ethersProvider)
//       ])
//       if (!networkContracts) {
//         setIsLoading(false)
//         setError(ERROR_MSG.invalid_network)
//         return
//       }

//       networkContracts.sTokens

//       setIsLoading(false)
//       return await getAllowance({
//         provider: nonConnectedEthersProvider,
//         spenderAddress,
//         tokenAddress: networkContracts.token,
//         userAddress
//       })
//     },
//     [ethersProvider]
//   )
//   return { fetchAllowance: callback, error, isLoading }
// }
