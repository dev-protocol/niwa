import React from 'react'
import BackButton from '../../components/BackButton'
import { useParams } from 'react-router-dom'
import UserTokenListItem from './UserTokenListItem'

import DPLTitleBar from '../../components/DPLTitleBar'
import HSButton from '../../components/HSButton'
import { HSCard, HSCardContents } from '../../components/HSCard'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { useUserPropertiesList } from './fetchUserProperties.hook'

interface UserPropertiesListPageProps {
  // Props
}

const UserPropertiesListPage: React.FC<UserPropertiesListPageProps> = () => {
  const { userAddress } = useParams()
  const { userProperties } = useUserPropertiesList(userAddress)

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
              <UserTokenListItem key={property.address} property={property} userAddress={userAddress} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPropertiesListPage
