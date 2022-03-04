import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '../../../components/Card'
import Detail from '../../../components/Detail'
import { crunchAddress, toDisplayAmount } from '../../../utils/utils'
import { useSTokensPositionsOfProperty } from './useSTokensPositionsOfProperty'

interface PropertyStakersPageProps {}

const PropertyStakersPage: React.FC<PropertyStakersPageProps> = () => {
  const { hash } = useParams()
  const { sTokensPositionsOfProperty, error } = useSTokensPositionsOfProperty(hash)

  useEffect(() => {
    console.log('sTokensPositionsOfProperty: ', sTokensPositionsOfProperty)
  }, [sTokensPositionsOfProperty])

  return (
    <>
      {error && <p className="text-red">{error}</p>}
      <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
        {sTokensPositionsOfProperty &&
          sTokensPositionsOfProperty.map((pos, i) => (
            <Card key={i}>
              <div className="grid grid-cols-2 gap-1">
                <Link to={`/${pos.owner}`}>
                  <Detail label="Owner" valueElem={<span>{crunchAddress(pos.owner)}</span>} />
                </Link>

                <Detail label="Amount" valueElem={<span>{toDisplayAmount(pos.amount)}</span>} />
                <Detail label="Pending Reward" valueElem={<span>{toDisplayAmount(pos.pendingReward)}</span>} />
                <Detail label="Cumulative Reward" valueElem={<span>{toDisplayAmount(pos.cumulativeReward)}</span>} />
                <Detail label="Price" valueElem={<span>{toDisplayAmount(pos.price)}</span>} />
              </div>
            </Card>
          ))}
      </div>
    </>
  )
}

export default PropertyStakersPage
