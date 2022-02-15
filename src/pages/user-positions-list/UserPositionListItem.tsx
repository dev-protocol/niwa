import { Positions } from '@devprotocol/dev-kit/l2'
import { utils } from 'ethers'
import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import { crunchAddress } from '../../utils/utils'

interface UserPositionListItemProps {
  position: Positions
}

const UserPositionListItem: React.FC<UserPositionListItemProps> = ({ position }) => {
  const detail = (label: string, value: string) => (
    <div>
      <span className="text-xs font-bold text-gray-400">{label}</span>
      <div className="overflow-hidden text-ellipsis font-normal">{value}</div>
    </div>
  )

  return (
    <Card>
      <Link to={`/properties/${position.property}`} className="grid grid-cols-1 gap-sm sm:grid-cols-2">
        {detail('Property', crunchAddress(position.property))}
        {detail('Amount', utils.formatEther(position.amount))}
        {detail('Price', utils.formatEther(position.price))}
        {detail('Cumulative Reward', utils.formatEther(position.cumulativeReward))}
        {detail('Pending Reward', utils.formatEther(position.pendingReward))}
      </Link>
    </Card>
  )
}

export default UserPositionListItem
