import { createSTokensContract } from '@devprotocol/dev-kit/l2'
import { sign } from '@devprotocol/khaos-kit'
import { UndefinedOr } from '@devprotocol/util-ts'
import { useCallback, useState } from 'react'
import { Market } from '../../const'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import {
    getNetworkMarketAddresses,
    getValidNetworkName,
    mapProviderToDevContracts,
    selectMarketAddressOption
} from '../../utils/utils'

type ICreateKhaosPubSignParams = {
    signId: string // ie 'github-market'
    personalAccessToken: string
    assetName: string // ie the github slug like "dev-protocol/protocol"
}

export const useCreateKhaosPubSign = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<UndefinedOr<Error>>()
    const web3Context = useWeb3Provider()

    const callback = useCallback(
        async ({ personalAccessToken, assetName, signId = 'github-market' }: ICreateKhaosPubSignParams) => {
            setIsLoading(true)
            setError(undefined)
            const userProvider = web3Context?.web3Provider
            if (!userProvider) {
                setError(Error('no provider found'))
                setIsLoading(false)
                return
            }

            try {
                const networkName = await getValidNetworkName(userProvider)
                if (!networkName) {
                    setError(Error('no valid network name found'))
                    setIsLoading(false)
                    return
                }

                const signMessage = await userProvider.getSigner().signMessage(assetName)
                const signer = await sign(signId, networkName)
                const res = await signer({
                    signature: signMessage,
                    secret: personalAccessToken,
                    message: assetName
                })

                setIsLoading(false)
                return res.publicSignature
            } catch (error) {
                setError(error instanceof Error ? error : Error(`fail to sign ${signId} market asset`))
                setIsLoading(false)
                console.log(error)
            }
        },
        [web3Context?.web3Provider]
    )

    return { createKhaosPubSign: callback, isLoading, error }
}

export const useSTokenPosition = () => {
    const web3Context = useWeb3Provider()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()

    const callback = useCallback(
        async (property: string, market: Market) => {
            setIsLoading(true)
            setError(undefined)

            const userProvider = web3Context?.web3Provider
            if (!userProvider) {
                setError(Error('no provider found'))
                setIsLoading(false)
                return
            }

            try {
                const networkDevContracts = await mapProviderToDevContracts(userProvider)
                if (!networkDevContracts) {
                    setError(Error('Invalid network'))
                    setIsLoading(false)
                    return
                }
                const sTokenManagerContract = await createSTokensContract(userProvider)(
                    networkDevContracts.sTokens
                )
                const tmp = sTokenManagerContract.positionsOfProperty(property) // これでpropertyに紐づくtokenIdが取得できる
                const tmp2 = sTokenManagerContract.positionsOfOwner(property) // これでownerに紐づくtokenIdが取得できる

                setIsLoading(false)
                return tmp
            } catch (error) {
                console.log(error)
                setError(error instanceof Error ? error : Error(`failed to create and authenticate asset`))
                setIsLoading(false)
            }
        },
        [web3Context?.web3Provider]
    )

    return { createAndAuthenticate: callback, isLoading, error }
}