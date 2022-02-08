import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DPLTitleBar from '../../components/DPLTitleBar'
import { FaQuestionCircle, FaShareAlt, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { Market } from '../../const'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import StakeOption from './StakeOption'
import HowItWorks from '../../components/HowItWorks'
import { crunchAddress, deployedNetworkToReadable, getExplorerUrl } from '../../utils/utils'
import { SectionLoading } from '../../components/Spinner'

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
    <div className="flex flex-col">
      {propertyDetails && !isLoading && (
        <>
          <div className="flex justify-between items-center">
            <DPLTitleBar title={propertyDetails?.propertySymbol ?? ''} />
            {/* <FaShareAlt color="lightgray" /> */}
          </div>

          <div className="font-bold text-gray-400 text-sm">{hash}</div>
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
              className="text-sm text-link flex items-center mb-md"
              target="_blank"
              href={`${getExplorerUrl()}/address/${hash}`}
              rel="noreferrer"
            >
              <span className="mr-1">View on {deployedNetworkToReadable()} Explorer</span>
              <FaExternalLinkAlt size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm mb-24">
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
          <HowItWorks />
        </>
      )}

      {isLoading && <SectionLoading />}

      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default PropertyPage
