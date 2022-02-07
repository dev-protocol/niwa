import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import { useParams } from 'react-router-dom'
import UserTokenListItem from './UserTokenListItem'

import DPLTitleBar from '../../components/DPLTitleBar'
import { HSCard, HSCardContents } from '../../components/HSCard'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { useUserPropertiesList } from './fetchUserProperties.hook'
import { crunchAddress } from '../../utils/utils'

interface UserPropertiesListPageProps {
  // Props
}

const UserPropertiesListPage: React.FC<UserPropertiesListPageProps> = () => {
  const { userAddress } = useParams()
  const { userProperties } = useUserPropertiesList(userAddress)

  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Properties" sub={`${userAddress ? crunchAddress(userAddress) : '...'} Properties`} />
      <div>
        {userProperties && userProperties.length <= 0 && (
          <HSCard className="border-surface-400">
            <HSCardContents>You have no tokens</HSCardContents>
          </HSCard>
        )}
      </div>
      <div>
        {userAddress && userAddress !== EMPTY_USER_TOKEN_PATH && userProperties && userProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
