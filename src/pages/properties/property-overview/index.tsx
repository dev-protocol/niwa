import React from 'react'
import { useParams } from 'react-router-dom'
import StakeOption from './StakeOption'
import HowItWorks from '../../../components/HowItWorks'
import { DPLHr } from '../../../components/DPLHr'
import { TweetLarge } from '../../../components/Tweet'
import { usePropertyOutlet } from '..'

interface TokenProps {}

const PropertyOverviewPage: React.FC<TokenProps> = () => {
  const { hash } = useParams()
  const { propertyDetails, propertyDetailsError } = usePropertyOutlet()
  const options = [
    {
      amount: 10,
      name: 'candy',
      isCustom: false
    },
    {
      amount: 100,
      name: 'coffee',
      isCustom: false
    },
    {
      amount: 500,
      name: 'bento',
      isCustom: false
    },
    {
      name: 'custom',
      isCustom: true
    }
  ]

  return (
    <div>
      {propertyDetails && hash && (
        <>
          <div className="mb-24 grid grid-cols-1 gap-sm sm:grid-cols-2">
            {hash &&
              options.map(option => (
                <StakeOption
                  key={option.name}
                  fixedAmount={option.amount}
                  optionName={option.name}
                  isCustom={option.isCustom}
                  propertyAddress={hash}
                />
              ))}
          </div>
          <p className="text-center">
            <TweetLarge
              params={{
                text: `I found a cool social token $${propertyDetails.propertySymbol}. Check it out on #Niwaxyz !`,
                url: `${location.href}`
              }}
            >
              Share and grow this project together
            </TweetLarge>
          </p>
          <DPLHr />

          <HowItWorks />
        </>
      )}

      {propertyDetailsError && <div className="text-red-500">{propertyDetailsError}</div>}
    </div>
  )
}

export default PropertyOverviewPage
