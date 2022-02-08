import { UndefinedOr } from '@devprotocol/util-ts'
import { utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Card from '../../components/Card'
import { DPLHr } from '../../components/DPLHr'
import DPLTitleBar from '../../components/DPLTitleBar'
import HowItWorks from '../../components/HowItWorks'
import { SectionLoading } from '../../components/Spinner'
import { ERROR_MSG } from '../../const'
import { useProvider } from '../../context/walletContext'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import { isNumberInput } from '../../utils/utils'
import StakeStep from './StakeStep'
import { useLockup } from './useLockup'

interface StakePageProps {}

const StakePage: React.FC<StakePageProps> = () => {
  const [searchParams] = useSearchParams()
  const { hash } = useParams()
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState<UndefinedOr<string>>()
  const { propertyDetails, isLoading, error: propertyDetailsError } = usePropertyDetails(hash)
  const { ethersProvider, isValidConnectedNetwork } = useProvider()
  const { lockup, isLoading: lockupLoading } = useLockup()
  const [isStakingComplete, setIsStakingComplete] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setError(propertyDetailsError)
  }, [propertyDetailsError])

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

  return (
    <>
      {!isLoading && propertyDetails && (
        <div>
          <BackButton title="Back" path={`/properties/${hash}`} />
          <DPLTitleBar title={`Stake ${amount} on ${propertyDetails.propertyName}`} classNames="mb-md" />
          <div className="mb-md flex w-full">
            {!ethersProvider && (
              <div className="my-lg w-full">
                <Card isDisabled={true}>
                  <div className="flex justify-center items-center my-lg py-lg">
                    <FaExclamationTriangle color="orange" />
                    <span className="font-bold text-gray-500 ml-1">Please connect wallet to stake.</span>
                  </div>
                </Card>
              </div>
            )}
            {ethersProvider && (
              <div className="grid gap-24">
                <StakeStep
                  name="Stake"
                  btnText="Stake"
                  label="Stake your Dev Tokens"
                  isDisabled={lockupLoading || isStakingComplete || !isValidConnectedNetwork}
                  isComplete={isStakingComplete}
                  isVisible={true}
                  onClick={lockupHandler}
                />
                <StakeStep
                  name="Complete"
                  btnText="See your staking positions"
                  label={`You've staked ${amount} and received sTokens!`}
                  isDisabled={!isStakingComplete}
                  isComplete={isStakingComplete}
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
