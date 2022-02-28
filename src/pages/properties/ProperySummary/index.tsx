import React from 'react'
import { FaDiscord, FaExternalLinkAlt, FaGithub, FaQuestionCircle, FaYoutube } from 'react-icons/fa'
import { Market } from '../../../const'
import { PropertyDetails } from '../../../hooks/usePropertyDetails'
import { crunchAddress, deployedNetworkToReadable, getExplorerUrl } from '../../../utils/utils'
import DPLTitleBar from '../../../components/DPLTitleBar'
import { NavTabItem, NavTabs } from '../../../components/NavTabs'

interface PropertySummaryHeadProps {
  propertyDetails: PropertyDetails
  hash: string
}

const PropertySummaryHead: React.FC<PropertySummaryHeadProps> = ({ propertyDetails, hash }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <DPLTitleBar title={propertyDetails?.propertySymbol ?? ''} />
        {/* <FaShareAlt color="lightgray" /> */}
      </div>
      <div className="text-sm font-bold text-gray-400">{hash}</div>
      <div className="flex justify-between">
        <div className="flex items-center">
          {propertyDetails.market === Market.GITHUB && (
            <>
              <FaGithub color="#000" />
              <a href={`https://github.com/${propertyDetails?.id}`} target="_blank" rel="noreferrer">
                <span className="ml-1 font-bold">{`github.com/${propertyDetails?.id}`}</span>
              </a>
            </>
          )}
          {propertyDetails.market === Market.YOUTUBE && (
            <>
              <FaYoutube color="red" />
              <a href={`https://www.youtube.com/channel/${propertyDetails?.id}`} target="_blank" rel="noreferrer">
                <span className="ml-1 font-bold">{`youtube.com/channel/${crunchAddress(
                  propertyDetails?.id ?? ''
                )}`}</span>
              </a>
            </>
          )}

          {propertyDetails.market === Market.DISCORD && (
            <>
              <FaDiscord color="#5865F2" />
              <a href={`https://discord.com/channels/${propertyDetails?.id}`} target="_blank" rel="noreferrer">
                <span className="ml-1 font-bold">{`discord.com/channels/${crunchAddress(
                  propertyDetails?.id ?? ''
                )}`}</span>
              </a>
            </>
          )}

          {propertyDetails.market === Market.INVALID && <FaQuestionCircle color="#333" />}
        </div>
      </div>
      <div className="flex justify-start">
        <a
          className="mb-sm flex items-center text-sm text-link"
          target="_blank"
          href={`${getExplorerUrl()}/address/${hash}`}
          rel="noreferrer"
        >
          <span className="mr-1">View on {deployedNetworkToReadable()} Explorer</span>
          <FaExternalLinkAlt size={12} />
        </a>
      </div>
      <NavTabs>
        <NavTabItem title="Details" path={`/properties/${hash}`} />
        <NavTabItem title="Holders" path={`/properties/${hash}/holders`} />
      </NavTabs>
    </>
  )
}

export default PropertySummaryHead
