import { createPropertyFactoryContract } from '@devprotocol/dev-kit'
import { NetworkName } from '@devprotocol/khaos-core'
import { sign } from '@devprotocol/khaos-kit'
import { UndefinedOr } from '@devprotocol/util-ts'
import { useCallback, useState } from 'react'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import { mapProviderToDevContracts } from '../../utils/utils'

type ICreateKhaosPubSignParams = {
  signId: string // ie 'github-market'
  networkName: NetworkName
  personalAccessToken: string
  assetName: string // ie the github slug like "dev-protocol/protocol"
}

export const useCreateKhaosPubSign = async () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<UndefinedOr<Error>>()
  const web3Context = useWeb3Provider()

  const callback = useCallback(
    async ({ networkName, personalAccessToken, signId = 'github-market', assetName }: ICreateKhaosPubSignParams) => {
      setIsLoading(true)
      setError(undefined)
      const userProvider = web3Context?.web3Provider
      if (!userProvider) {
        setError(Error('no provider found'))
        return
      }

      try {
        const signMessage = await userProvider.getSigner().signMessage(assetName)
        const signer = await sign(signId, networkName)
        const res = await signer({
          signature: signMessage,
          secret: personalAccessToken,
          message: assetName
        })
        return res.publicSignature
      } catch (error) {
        setError(error instanceof Error ? error : Error(`fail to sign ${signId} market asset`))
      }
    },
    [web3Context?.web3Provider]
  )

  return { createKhaosPubSign: callback, isLoading, error }
}

export const useCreateAndAuthenticate = () => {
  const web3Context = useWeb3Provider()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  const callback = useCallback(
    async (tokenName: string, tokenSymbol: string, marketAddress: string, assetName: string, khaosPubSig: string) => {
      setIsLoading(true)
      setError(undefined)

      const userProvider = web3Context?.web3Provider
      if (!userProvider) {
        setError(Error('no provider found'))
        return
      }

      try {
        const networkDevContracts = await mapProviderToDevContracts(userProvider)
        if (!networkDevContracts) {
          Promise.reject('Invalid network')
          return
        }
        const propertyFactoryContract = await createPropertyFactoryContract(userProvider)(
          networkDevContracts.propertyFactory
        )
        const created = await propertyFactoryContract.createAndAuthenticate(
          tokenName,
          tokenSymbol,
          marketAddress,
          [assetName, khaosPubSig],
          {
            metricsFactoryAddress: networkDevContracts.metricsFactory
          }
        )

        await created.waitForAuthentication()

        setIsLoading(false)

        return created.property
      } catch (error) {
        setError(error instanceof Error ? error : Error(`failed to create and authenticate asset`))
      }
    },
    [web3Context?.web3Provider]
  )

  return { createAndAuthenticate: callback, isLoading, error }
}
