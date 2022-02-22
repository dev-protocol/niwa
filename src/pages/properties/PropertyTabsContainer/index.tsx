import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { usePropertyDetails } from '../../../hooks/usePropertyDetails'
import PropertySummaryHead from '../ProperySummary'

interface PropertyTabsContainerProps {}

const PropertyTabsContainer: React.FC<PropertyTabsContainerProps> = () => {
  const { hash } = useParams()
  const { propertyDetails, isLoading, error } = usePropertyDetails(hash)
  return (
    <>
      {' '}
      {hash && propertyDetails && !isLoading && (
        <>
          <PropertySummaryHead propertyDetails={propertyDetails} hash={hash} />
          <Outlet context={{ propertyDetails, isPropertyDetailsLoading: isLoading, propertyDetailsError: error }} />
        </>
      )}
    </>
  )
}

export default PropertyTabsContainer
