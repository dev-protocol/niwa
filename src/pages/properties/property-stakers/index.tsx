import React, { useEffect } from 'react'
import { FaFunnelDollar } from 'react-icons/fa'
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
      <>
        {sTokensPositionsOfProperty && (
          <>
            {sTokensPositionsOfProperty.length > 0 && (
              <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
                {sTokensPositionsOfProperty.map((pos, i) => (
                  <Card key={i}>
                    <div className="grid grid-cols-2 gap-1">
                      <Link to={`/${pos.owner}`}>
                        <Detail label="Owner" valueElem={<span>{crunchAddress(pos.owner)}</span>} />
                      </Link>

                      <Detail label="Amount" valueElem={<span>{toDisplayAmount(pos.amount)}</span>} />
                      <Detail label="Pending Reward" valueElem={<span>{toDisplayAmount(pos.pendingReward)}</span>} />
                      <Detail
                        label="Cumulative Reward"
                        valueElem={<span>{toDisplayAmount(pos.cumulativeReward)}</span>}
                      />
                      <Detail label="Price" valueElem={<span>{toDisplayAmount(pos.price)}</span>} />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {sTokensPositionsOfProperty.length <= 0 && (
              <div className="w-full">
                <Card>
                  <div className="flex flex-col items-center py-md">
                    <div className="mb-md flex h-16 w-16 items-center justify-center rounded-full bg-heading-texture from-primary to-secondary bg-cover">
                      <FaFunnelDollar size={32} color="white" />
                    </div>

                    <span className="mb-sm font-semibold">No stakers found for this property.</span>
                    <span className="text-link">
                      <Link to={`/properties/${hash}`}>Stake Now</Link>
                    </span>
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </>
    </>
  )
}

export default PropertyStakersPage
