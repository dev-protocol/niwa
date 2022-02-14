import React from 'react'
import { useParams } from 'react-router-dom'
import DPLTitleBar from '../../components/DPLTitleBar'
import { FaQuestionCircle, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { Market } from '../../const'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import StakeOption from './StakeOption'
import HowItWorks from '../../components/HowItWorks'
import { deployedNetworkToReadable, getExplorerUrl } from '../../utils/utils'
import { SectionLoading } from '../../components/Spinner'
import { DPLHr } from '../../components/DPLHr'
import { TweetLarge } from '../../components/Tweet'

interface TokenProps {}

const PropertyPage: React.FC<TokenProps> = () => {
  const { hash } = useParams()
  const { propertyDetails, isLoading, error } = usePropertyDetails(hash)
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
    <div className="grid">
      {propertyDetails && !isLoading && (
        <>
          <div className="flex items-center justify-between">
            <DPLTitleBar title={propertyDetails?.propertySymbol ?? ''} />
            {/* <FaShareAlt color="lightgray" /> */}
          </div>

          <div className="text-sm font-bold text-gray-400">{hash}</div>
          <div className="flex justify-between">
            <div className="flex items-center">
              {propertyDetails.market === Market.GITHUB && <FaGithub color="#000" />}
              {propertyDetails.market === Market.YOUTUBE && <FaGithub color="red" />}
              {propertyDetails.market === Market.INVALID && <FaQuestionCircle color="#333" />}
              <span className="ml-1 font-bold">{propertyDetails?.id}</span>
            </div>
          </div>
          <div className="flex justify-start">
            <a
              className="mb-md flex items-center text-sm text-link"
              target="_blank"
              href={`${getExplorerUrl()}/address/${hash}`}
              rel="noreferrer"
            >
              <span className="mr-1">View on {deployedNetworkToReadable()} Explorer</span>
              <FaExternalLinkAlt size={12} />
            </a>
          </div>

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

      {isLoading && <SectionLoading />}

      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default PropertyPage
