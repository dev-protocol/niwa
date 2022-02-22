import { UndefinedOr } from '@devprotocol/util-ts'
import React from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import Card from '../../components/Card'
import { SectionLoading } from '../../components/Spinner'
import { PropertyDetails, usePropertyDetails } from '../../hooks/usePropertyDetails'

interface PropertyOutletProps {}

type ContextType = {
  propertyDetails: PropertyDetails | null
  isPropertyDetailsLoading: boolean
  propertyDetailsError: UndefinedOr<String>
}

export function usePropertyOutlet() {
  return useOutletContext<ContextType>()
}

const PropertyOutlet: React.FC<PropertyOutletProps> = () => {
  const { hash } = useParams()
  const { propertyDetails, isLoading, error } = usePropertyDetails(hash)

  return (
    <div>
      {hash && propertyDetails && !isLoading && (
        <>
          <Outlet context={{ propertyDetails, isPropertyDetailsLoading: isLoading, propertyDetailsError: error }} />
        </>
      )}
      {isLoading && <SectionLoading />}
      {error && (
        <Card>
          <div className="text-red-500">{error}</div>
        </Card>
      )}
    </div>
  )
}

export default PropertyOutlet
