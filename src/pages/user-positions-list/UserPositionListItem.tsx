import React from 'react'
import { Link } from 'react-router-dom'
import { Position } from '../../types/Position'

interface UserPositionListItemProps {
  position: Position
}

const UserPositionListItem: React.FC<UserPositionListItemProps> = ({ position }) => {
  return (
    <Link to={`/properties/${position.property}`} className="flex flex-col mb-lg">
      <div className="w-full text-gray-300">{position.property}</div>
      <div className="w-full">Amount: {position.amount}</div>
      <div className="w-full">Price: {position.price}</div>
      <div className="w-full">cumulativeReward: {position.cumulativeReward}</div>
      <div className="w-full">pendingReward: {position.pendingReward}</div>
    </Link>
  )
}

export default UserPositionListItem
