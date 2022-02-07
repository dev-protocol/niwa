import { Positions } from '@devprotocol/dev-kit/l2'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Card from '../../components/Card'
import DPLTitleBar from '../../components/DPLTitleBar'
import { usePosition } from '../../hooks/usePosition'
import { usePositionsOfOwner } from '../../hooks/usePositionsOfOwner'
import UserPositionListItem from './UserPositionListItem'

interface UserPositionsListPageProps {}

const UserPositionsListPage: React.FC<UserPositionsListPageProps> = () => {
  const { userAddress } = useParams()
  const { fetchPositionsOfOwner } = usePositionsOfOwner()
  const { fetchPosition } = usePosition()
  const [userPositions, setUserPositions] = useState<Positions[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!userAddress) {
      return
    }
    ;(async () => {
      setIsLoading(true)
      setUserPositions([])
      const userPositionIds = await fetchPositionsOfOwner(userAddress)
      const positionCalls = userPositionIds?.map(async id => fetchPosition(id))
      if (!positionCalls) {
        return
      }
      const res = await Promise.all([...positionCalls])
      setUserPositions(res.filter((position): position is Positions => !!position))
      setIsLoading(false)
    })()
  }, [userAddress, fetchPositionsOfOwner, fetchPosition])

  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="User Positions" />
      <div>
        <div className="row-between mb-lg">
          <h2 className="fs-h3">{userAddress} Staked Property Positions</h2>
        </div>
        {!isLoading && (
          <>
            {userPositions && userPositions.length <= 0 && (
              <Card>
                <span>You have no positions</span>
              </Card>
            )}
            {userAddress && userPositions && userPositions.length > 0 && (
              <div className="flex flex-col">
                {userPositions.map((position, i) => (
                  <UserPositionListItem key={i} position={position} />
                ))}
              </div>
            )}
          </>
        )}
        {isLoading && <span>...loading</span>}
      </div>
    </div>
  )
}

export default UserPositionsListPage
