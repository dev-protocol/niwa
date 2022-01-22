import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import { UserToken } from '../../types/userToken'
import { useNavigate, useParams } from 'react-router-dom'
import UserTokenListItem from './UserTokenListItem'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import DPLTitleBar from '../../components/DPLTitleBar'
import HSButton from '../../components/HSButton'
import { HSCard, HSCardContents } from '../../components/HSCard'

interface TokensPageProps {
  // Props
}

const TokensPage: React.FC<TokensPageProps> = () => {
  const web3Context = useWeb3Provider()
  const navigate = useNavigate()
  const { userAddress } = useParams()
  const [userTokens, _setUserTokens] = useState<UserToken[]>([])

  useEffect(() => {
    const userProvider = web3Context?.web3Provider
    if (!userProvider) {
      navigate(`/${EMPTY_USER_TOKEN_PATH}`)
      return
    }
    ;(async () => {
      const address = await userProvider.getSigner().getAddress()
      navigate(`/${address}` ?? `/${EMPTY_USER_TOKEN_PATH}`)
    })()
  }, [web3Context, navigate])

  useEffect(() => {
    if (userAddress === EMPTY_USER_TOKEN_PATH) {
      return
    }

    // TODO: fetch user tokens here
  }, [userAddress])

  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Tokens" />
      <div>
        <div className="row-between mb-lg">
          <h2 className="fs-h3">Your Tokens</h2>
          <HSButton link="/tokenize" type="filled">
            + Create Token
          </HSButton>
        </div>
        {userTokens.length <= 0 && (
          <HSCard className="border-surface-400">
            <HSCardContents>You have no tokens</HSCardContents>
          </HSCard>
        )}
        {userTokens.length > 0 && (
          <div className="flex flex-col">
            {userTokens.map(token => (
              <UserTokenListItem key={token.hash} userToken={token} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TokensPage
