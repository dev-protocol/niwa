import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import { HSCard, HSCardContents } from '../../components/HSCard'
import { usePosition } from '../../hooks/usePosition'
import { usePositionsOfOwner } from '../../hooks/usePositionsOfOwner'
import { Position } from '../../types/Position'
import UserPositionListItem from './UserPositionListItem'

interface UserPositionsListPageProps {}

const UserPositionsListPage: React.FC<UserPositionsListPageProps> = () => {
  const { userAddress } = useParams()
  const { fetchPositionsOfOwner } = usePositionsOfOwner()
  const { fetchPosition } = usePosition()
  const [userPositions, setUserPositions] = useState<Position[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!userAddress) {
      return
    }
    ;(async () => {
      const positions: Position[] = []
      setIsLoading(true)
      setUserPositions(positions)
      const userPositionIds = await fetchPositionsOfOwner(userAddress)
      const positionCalls = userPositionIds?.map(async id => fetchPosition(id))
      if (!positionCalls) {
        return
      }
      const res = await Promise.all([...positionCalls])
      setUserPositions(
        res.map(
          pos =>
            ({
              property: pos?.property,
              amount: pos?.amount,
              price: pos?.price,
              cumulativeReward: pos?.cumulativeReward,
              pendingReward: pos?.pendingReward
            } as Position)
        ) ?? []
      )
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
              <HSCard className="border-surface-400">
                <HSCardContents>You have no positions</HSCardContents>
              </HSCard>
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
