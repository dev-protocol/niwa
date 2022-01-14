import { useState } from 'react'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import { sign } from '../../utils/utils'

export const INVITATION_URL = 'https://dev-invitation.azurewebsites.net/api'

export interface InvitationResult {
  success: boolean
}

export const postInvitation = ({
  asset,
  email,
  discord,
  signMessage,
  market,
  name,
  role,
  url,
  useCase,
  ask,
  newsletter,
  signature
}: {
  asset: string
  email: string
  discord: string
  signMessage: string
  market: string
  name: string
  role: string
  url: string
  useCase: string
  ask: string
  newsletter?: boolean
  signature?: string
}): Promise<InvitationResult> =>
  fetch(`${INVITATION_URL}/invitation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      asset,
      email,
      discord,
      signature,
      name,
      role,
      url,
      useCase,
      ask,
      market,
      newsletter,
      message: signMessage
    })
  }).then(res => res.json())

export const usePostInvitation = () => {
  const web3Context = useWeb3Provider()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const postInvitationHandler = async ({
    asset,
    email,
    discord,
    market,
    name,
    role,
    url,
    useCase,
    ask,
    newsletter
  }: {
    asset: string
    email: string
    discord: string
    market: string
    name: string
    role: string
    url: string
    useCase: string
    ask: string
    newsletter: boolean
  }) => {
    const signMessage = `invitation: ${asset}`
    const signature = await sign(web3Context?.web3Provider, signMessage)
    if (signature === undefined) {
      return { success: false }
    }

    setIsLoading(true)

    return postInvitation({
      asset,
      email,
      discord,
      signMessage,
      market,
      signature,
      name,
      role,
      url,
      useCase,
      ask,
      newsletter
    })
      .then(result => {
        setIsLoading(false)
        return result
      })
      .catch(err => {
        setIsLoading(false)
        return Promise.reject(err)
      })
  }

  return { postInvitationHandler, isLoading }
}
