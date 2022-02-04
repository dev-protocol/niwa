import { UndefinedOr } from '@devprotocol/util-ts'
import { BigNumber, constants, utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import HowItWorks from '../../components/HowItWorks'
import { ERROR_MSG } from '../../const'
import { useProvider } from '../../context/walletContext'
import { useDevAllowance } from '../../hooks/useAllowance'
import { useDevApprove } from '../../hooks/useApprove'
import { usePositionsOfOwner } from '../../hooks/usePositionsOfOwner'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import { filterNewPosition, isNumberInput, mapProviderToDevContracts } from '../../utils/utils'
import StakeStep from './StakeStep'
import { useLockup } from './useLockup'

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
  const { lockup, isLoading: lockupLoading } = useLockup()
  const { fetchPositionsOfOwner } = usePositionsOfOwner()
  const [userPosition, setUserPosition] = useState<UndefinedOr<number>>()
  const [isStakingComplete, setIsStakingComplete] = useState(false)
  const navigate = useNavigate()

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

    console.log(utils.parseUnits(`${amount}`).toString())

    const userAddress = await ethersProvider.getSigner().getAddress()
    const existingUserPositions = await fetchPositionsOfOwner(userAddress)
    console.log('existing user positions are: ', existingUserPositions)

    const success = await lockup(hash, utils.parseUnits(`${amount}`))
    if (!success) {
      setError('There was an error staking')
      return
    }

    const newUserPositions = await fetchPositionsOfOwner(userAddress)
    console.log('new user positions are: ', newUserPositions)
    if (!newUserPositions) {
      setError('No user positions found')
      return
    }
    const newPosition = filterNewPosition(newUserPositions, existingUserPositions)
    if (!newPosition) {
      console.error('error finding new position...')
      console.log('existing positions: ', existingUserPositions)
      console.log('new positions: ', newUserPositions)
      setError('Error filter new user position')
      return
    }
    setUserPosition(newPosition)
    setIsStakingComplete(true)
  }

  const navigateToPosition = async () => {
    navigate(`https://stakes.social/profile/positions/${userPosition}`)
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
            <div className="flex flow-column">
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
                label="Approve your DEV tokens for stakeability"
                isDisabled={!allowance || allowance.isZero() || lockupLoading || isStakingComplete}
                isComplete={isStakingComplete}
                isVisible={allowance && allowance.gt(0) ? true : false}
                onClick={lockupHandler}
              />
              <StakeStep
                name="Complete"
                btnText="See your staking position on Stakes.social"
                label={`You've staked ${amount} and received sTokens!`}
                isDisabled={!isStakingComplete}
                isComplete={isStakingComplete}
                isVisible={isStakingComplete}
                onClick={navigateToPosition}
              />
            </div>
          )}
        </div>
      )}
      {isLoading && <span>loading...</span>}
      {error && <span className="text-danger-400">{error}</span>}
      <HowItWorks />
    </>
  )
}

export default StakePage
