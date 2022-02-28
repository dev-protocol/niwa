import { UndefinedOr } from '@devprotocol/util-ts'
import { BigNumber, constants, utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButton from '../../../components/BackButton'
import Card from '../../../components/Card'
import { DPLHr } from '../../../components/DPLHr'
import DPLTitleBar from '../../../components/DPLTitleBar'
import HowItWorks from '../../../components/HowItWorks'
import { SectionLoading } from '../../../components/Spinner'
import { ERROR_MSG } from '../../../const'
import { useProvider } from '../../../context/walletContext'
import { useDevAllowance } from '../../../hooks/useAllowance'
import { useDevApprove } from '../../../hooks/useApprove'
import { usePropertyDetails } from '../../../hooks/usePropertyDetails'
import { isNumberInput, mapProviderToDevContracts } from '../../../utils/utils'
import StakeStep from './StakeStep'
import { useLockup } from './useLockup'

interface StakePageProps {}

const StakePage: React.FC<StakePageProps> = () => {
  const [searchParams] = useSearchParams()
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState<UndefinedOr<string>>()
  const { ethersProvider, isValidConnectedNetwork } = useProvider()
  const { lockup, isLoading: lockupLoading } = useLockup()
  const [isStakingComplete, setIsStakingComplete] = useState(false)
  const [lockupAddress, setLockupAddress] = useState<UndefinedOr<string>>()
  const { fetchAllowance, isLoading: allowanceIsLoading, error: allowanceError } = useDevAllowance()
  const { approve, isLoading: approveIsLoading, error: approveError } = useDevApprove()
  const [allowance, setAllowance] = useState<UndefinedOr<BigNumber>>()
  const navigate = useNavigate()

  const { hash } = useParams()
  const { propertyDetails, isLoading, error: propertyDetailsError } = usePropertyDetails(hash)

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

  const lockupHandler = async () => {
    if (!hash) {
      setError(ERROR_MSG.no_property_address)
      return
    }
    if (amount <= 0) {
      setError('Insufficient amount')
      return
    }
    if (!ethersProvider) {
      setError(ERROR_MSG.no_provider)
      return
    }

    const success = await lockup(hash, utils.parseUnits(`${amount}`))
    if (!success) {
      setError('There was an error staking')
      return
    }

    setIsStakingComplete(true)
  }

  const navigateToUserPositions = async () => {
    if (!ethersProvider) {
      return
    }

    navigate(`/${await ethersProvider.getSigner().getAddress()}/positions`)
  }

  const approveHandler = async () => {
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
      {propertyDetails && (
        <div>
          <BackButton title="Back" path={`/properties/${hash}`} />
          <DPLTitleBar title={`Stake ${amount} on ${propertyDetails.propertyName}`} className="mb-md" />
          <div className="mb-md flex w-full">
            {(!ethersProvider || !isValidConnectedNetwork) && (
              <div className="my-lg w-full">
                <Card isDisabled={true}>
                  <div className="my-lg flex items-center justify-center py-lg">
                    <FaExclamationTriangle color="orange" />
                    <span className="ml-1 font-bold text-gray-500">Please connect wallet to stake.</span>
                  </div>
                </Card>
              </div>
            )}
            {ethersProvider && isValidConnectedNetwork && (
              <div className="grid gap-24">
                <StakeStep
                  name="Approve"
                  label="Approve your DEV tokens for stakeability"
                  btnText="Approve"
                  isDisabled={allowance?.gt(0) || allowanceIsLoading || approveIsLoading || allowanceIsLoading}
                  isComplete={allowance?.gt(0) ?? false}
                  isVisible={true}
                  onClick={approveHandler}
                />
                <StakeStep
                  name="Stake"
                  btnText="Stake"
                  label="Stake your Dev Tokens"
                  isDisabled={
                    !allowance || allowance.isZero() || lockupLoading || isStakingComplete || !isValidConnectedNetwork
                  }
                  isComplete={isStakingComplete}
                  isVisible={true}
                  onClick={lockupHandler}
                />
                <StakeStep
                  name="Complete"
                  btnText="See your staking positions"
                  label={`You've staked ${amount} and received sTokens!`}
                  isDisabled={!isStakingComplete}
                  isComplete={false}
                  isVisible={isStakingComplete}
                  onClick={navigateToUserPositions}
                />
              </div>
            )}
          </div>
          <DPLHr />

          <HowItWorks />
        </div>
      )}
      {isLoading && <SectionLoading />}
      {error && <span className="text-danger-400">{error}</span>}
    </>
  )
}

export default StakePage
