import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import Detail from '../../components/Detail'
import PropertySummaryHead from '../../components/ProperySummary'
import { SectionLoading } from '../../components/Spinner'
import { usePropertyBalances } from '../../hooks/usePropertyBalances'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import { crunchAddress, toDisplayAmount } from '../../utils/utils'

interface PropertyHoldersPageProps {}

const PropertyHoldersPage: React.FC<PropertyHoldersPageProps> = () => {
  const { hash } = useParams()
  const { propertyBalances, error: balancesError } = usePropertyBalances(hash)
  const { propertyDetails, isLoading, error: detailsError } = usePropertyDetails(hash)
  const [sortedBalances, setSortedBalances] = useState<{ account: string; balance: string }[]>()

  useEffect(() => {
    if (!propertyBalances) {
      return
    }
    const sorted = propertyBalances.map(pb => pb).sort((pb1, pb2) => +pb2.balance - +pb1.balance)
    setSortedBalances(sorted)
  }, [propertyBalances])

  return (
    <>
      {propertyDetails && hash && !isLoading && (
        <div>
          <PropertySummaryHead propertyDetails={propertyDetails} hash={hash} isActive="holders" />
          {sortedBalances && sortedBalances.length > 0 && (
            <div className="grid grid-cols-2 gap-sm">
              {sortedBalances.map(pb => (
                <Card key={pb.account}>
                  <Link to={`/${pb.account}`} className="flex flex-col">
                    <Detail label="Account" valueElem={<span>{crunchAddress(pb.account)}</span>} />
                    <Detail
                      label="Balance"
                      valueElem={
                        <div>
                          {toDisplayAmount(pb.balance)} <b>{propertyDetails.propertySymbol}</b>
                        </div>
                      }
                    />
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      {isLoading && <SectionLoading />}
      {balancesError && <span>{balancesError}</span>}
      {detailsError && <span>{detailsError}</span>}
    </>
  )
}

export default PropertyHoldersPage
