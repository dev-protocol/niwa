import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropertySummaryHead from '../../components/ProperySummary'
import { SectionLoading } from '../../components/Spinner'
import { usePropertyBalances } from '../../hooks/usePropertyBalances'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'

interface PropertyHoldersPageProps {}

const PropertyHoldersPage: React.FC<PropertyHoldersPageProps> = () => {
  const { hash } = useParams()
  const { propertyBalances, error: balancesError } = usePropertyBalances(hash)
  const { propertyDetails, isLoading, error: detailsError } = usePropertyDetails(hash)

  useEffect(() => {
    console.log('BALANCES ERROR: ', balancesError)
  }, [balancesError])

  return (
    <>
      {propertyDetails && hash && (
        <PropertySummaryHead propertyDetails={propertyDetails} hash={hash} isActive="holders" />
      )}
      {isLoading && <SectionLoading />}
      {/* {balancesError && <span>{balancesError}</span>} */}
      {detailsError && <span>{detailsError}</span>}
    </>
  )
}

export default PropertyHoldersPage
