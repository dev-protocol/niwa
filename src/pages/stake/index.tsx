import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import { isNumberInput } from '../../utils/utils'

interface StakePageProps {}

const StakePage: React.FC<StakePageProps> = () => {
  const [searchParams] = useSearchParams()
  const { hash } = useParams()
  const [amount, setAmount] = useState(0)
  const { propertyDetails, isLoading, error } = usePropertyDetails(hash)

  useEffect(() => {
    const _amount = searchParams.get('amount')
    if (_amount && isNumberInput(_amount)) {
      setAmount(+_amount)
    }
  }, [searchParams])

  return (
    <>
      {!isLoading && propertyDetails && (
        <div>
          <BackButton title="Back" path={`/properties/${hash}`} />
          <DPLTitleBar title={`Stake ${amount} on ${propertyDetails.propertyName}`} />
        </div>
      )}
      {isLoading && <span>loading...</span>}
      {error && <span className="text-danger-400">{error}</span>}
    </>
  )
}

export default StakePage
