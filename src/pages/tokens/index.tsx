import React, { useEffect } from 'react'
import BackButton from '../../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import UserTokenListItem from './UserTokenListItem'

import DPLTitleBar from '../../components/DPLTitleBar'
import HSButton from '../../components/HSButton'
import { HSCard, HSCardContents } from '../../components/HSCard'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { useProvider } from '../../context/walletContext'
import { useUserPropertiesList } from './fetchUserProperties.hook'
import { useEnabledMarkets } from '../../hooks/useEnabledMarkets'

interface TokensPageProps {
  // Props
}

const TokensPage: React.FC<TokensPageProps> = () => {
  const { ethersProvider } = useProvider()
  const navigate = useNavigate()
  const { userAddress } = useParams()
  const { userProperties } = useUserPropertiesList(userAddress)
  const { enabledMarkets } = useEnabledMarkets()

  useEffect(() => {
    if (!ethersProvider) {
      navigate(`/${EMPTY_USER_TOKEN_PATH}`)
      return
    }
    ;(async () => {
      const address = await ethersProvider.getSigner().getAddress()
      navigate(`/${address}` ?? `/${EMPTY_USER_TOKEN_PATH}`)
    })()
  }, [ethersProvider, navigate])

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
        {userProperties && userProperties.length <= 0 && (
          <HSCard className="border-surface-400">
            <HSCardContents>You have no tokens</HSCardContents>
          </HSCard>
        )}
        {userAddress && userAddress !== EMPTY_USER_TOKEN_PATH && userProperties && userProperties.length > 0 && (
          <div className="flex flex-col">
            {userProperties.map(property => (
              <UserTokenListItem
                key={property.address}
                property={property}
                enabledMarkets={enabledMarkets}
                userAddress={userAddress}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TokensPage
