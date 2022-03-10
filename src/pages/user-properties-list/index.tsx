import React from 'react'
import BackButton from '../../components/BackButton'
import { useParams } from 'react-router-dom'
import UserTokenListItem from './UserTokenListItem'

import DPLTitleBar from '../../components/DPLTitleBar'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { useUserPropertiesList } from './fetchUserProperties.hook'
import { crunchAddress } from '../../utils/utils'
import Card from '../../components/Card'
import { NavTabItem, NavTabs } from '../../components/NavTabs'
import CopyButton from '../../components/CopyButton'

interface UserPropertiesListPageProps {
  // Props
}

const UserPropertiesListPage: React.FC<UserPropertiesListPageProps> = () => {
  const { userAddress } = useParams()
  const { userProperties } = useUserPropertiesList(userAddress)

  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title={`Address: ${userAddress ? crunchAddress(userAddress) : ''}`} />
      <div className="items-align mb-sm flex">
        <span className="mr-1 text-sm font-bold text-gray-400">{userAddress}</span>
        <CopyButton textToCopy={userAddress ?? ''} />
      </div>

      <NavTabs>
        <NavTabItem title="Properties" path={`#`} />
        <NavTabItem title="Positions" path={`/${userAddress}/positions`} />
      </NavTabs>

      <div>
        {userProperties && userProperties.length <= 0 && (
          <Card>
            <span>You have no tokens</span>
          </Card>
        )}
      </div>
      <div>
        {userAddress && userAddress !== EMPTY_USER_TOKEN_PATH && userProperties && userProperties.length > 0 && (
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
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
