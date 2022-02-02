import { UndefinedOr } from '@devprotocol/util-ts'
import { BigNumber, constants } from 'ethers'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useParams, useSearchParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import HSButton from '../../components/HSButton'
import { ERROR_MSG } from '../../const'
import { useProvider } from '../../context/walletContext'
import { useDevAllowance } from '../../hooks/useAllowance'
import { useDevApprove } from '../../hooks/useApprove'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import { isNumberInput, mapProviderToDevContracts } from '../../utils/utils'

interface StakePageProps {}

const StakePage: React.FC<StakePageProps> = () => {
  const [searchParams] = useSearchParams()
  const { hash } = useParams()
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState<UndefinedOr<string>>()
  const { propertyDetails, isLoading, error: propertyDetailsError } = usePropertyDetails(hash)
  const { fetchAllowance, isLoading: allowanceIsLoading, error: allowanceError } = useDevAllowance()
  const { ethersProvider } = useProvider()
  const [allowance, setAllowance] = useState<UndefinedOr<BigNumber>>()
  const { approve, isLoading: approveIsLoading, error: approveError } = useDevApprove()
  const [lockupAddress, setLockupAddress] = useState<UndefinedOr<string>>()

  useEffect(() => {
    if (!ethersProvider) {
      return
    }

    ;(async () => {
      const networkContracts = await mapProviderToDevContracts(ethersProvider)
      if (!networkContracts) {
        setError(ERROR_MSG.invalid_network)
        return
      }
      setLockupAddress(networkContracts.lockup)
      const _allowance = await fetchAllowance(networkContracts.lockup)
      console.log('allowance is: ', _allowance?.toString())
      setAllowance(_allowance)
    })()
  }, [ethersProvider, fetchAllowance])

  useEffect(() => {
    setError(propertyDetailsError ?? allowanceError ?? approveError)
  }, [propertyDetailsError, allowanceError, approveError])

  useEffect(() => {
    const _amount = searchParams.get('amount')
    if (_amount && isNumberInput(_amount)) {
      setAmount(+_amount)
    }
  }, [searchParams])

  const onApproveClick = async () => {
    if (!lockupAddress) {
      setError('Error finding DEV lockup address')
      return
    }

    const success = await approve(lockupAddress)
    console.log('success is: ', success)
    if (!success) {
      setError('Error approving Dev Lockup Contract')
      return
    }
    setAllowance(constants.MaxUint256)
  }

  return (
    <>
      {!isLoading && propertyDetails && (
        <div>
          <BackButton title="Back" path={`/properties/${hash}`} />
          <DPLTitleBar title={`Stake ${amount} on ${propertyDetails.propertyName}`} />
          {!ethersProvider && (
            <div>
              <span>Please connect wallet to stake.</span>
            </div>
          )}
          {ethersProvider && (
            <div className="grid-2">
              <div className="flex align-center">
                <b>Approval</b>
                <FaCheckCircle className="ml-xs" color={allowance?.gt(0) ? 'green' : 'grey'} />
              </div>
              <div className="flex flow-column">
                <span className="mb-sm">Approve your DEV tokens for stakeability</span>
                <HSButton
                  label="Approve"
                  type="filled"
                  isDisabled={allowance?.gt(0) || approveIsLoading || allowanceIsLoading}
                  onClick={onApproveClick}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {isLoading && <span>loading...</span>}
      {error && <span className="text-danger-400">{error}</span>}
    </>
  )
}

export default StakePage
