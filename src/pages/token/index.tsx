import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { usePropertyData } from './fetch-token-data.hook'
import DPLTitleBar from '../../components/DPLTitleBar'
import { FaQuestionCircle, FaShareAlt, FaGithub } from 'react-icons/fa'

interface TokenProps {}

const Token: React.FC<TokenProps> = () => {
  const { hash } = useParams()
  const [assetName, setAssetName] = useState('')
  const [assetSymbol, setAssetSymbol] = useState('')
  const { propertyData, error } = usePropertyData(hash)

  useEffect(() => {
    console.log('property data updated: ', propertyData)
    if (!propertyData) {
      return
    }
    ;(async () => {
      setAssetSymbol(await propertyData.symbol())
      setAssetName(await propertyData.name())
    })()
  }, [propertyData])

  return (
    <div className="flex flex-col">
      {propertyData && (
        <>
          <div className="flex justify-between items-center">
            <DPLTitleBar title={assetSymbol} />
            <FaShareAlt color="#fff" />
          </div>
          <div className="font-bold">{hash}</div>
          <div className="flex justify-between">
            <div className="flex">
              {/** TODO: dynamic icon depending on market */}
              <FaGithub color="#000" />
              <span>{assetName}</span>
            </div>
            <div>
              <Link to="#">
                <FaQuestionCircle color="#000" />
              </Link>
            </div>
          </div>
        </>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default Token
