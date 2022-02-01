import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { usePropertyData } from './fetch-token-data.hook'
import DPLTitleBar from '../../components/DPLTitleBar'
import { FaQuestionCircle, FaShareAlt, FaGithub } from 'react-icons/fa'

interface TokenProps { }

const Token: React.FC<TokenProps> = () => {
  // const { hash } = useParams()
  const hash = '0xe45d65c6d6aA3e2a4c8aAcc0C8153778663fe794'
  const [assetName, setAssetName] = useState<readonly number[]>([])
  const [assetSymbol, setAssetSymbol] = useState<readonly number[]>([])
  const { propertyData, error } = usePropertyData(hash)

  useEffect(() => {
    console.log('property data updated: ', propertyData)
    if (!propertyData) {
      return
    }
    ; (async () => {
      setAssetName(await propertyData.positionsOfProperty('0x3A0E2d68bb08A5F8B35a751E7829BE89623246a6'))
      console.log('hi')
      console.log(await propertyData.positionsOfProperty('0x3A0E2d68bb08A5F8B35a751E7829BE89623246a6'))
      setAssetSymbol(await propertyData.positionsOfOwner('0xdE62195B5DF46D95D5349944E66E39d7C2a591f7'))
    })()
  }, [propertyData])

  return (
    <div className="flex flex-col">
      {propertyData && (
        <>
          <div className="flex justify-between items-center">
            {/* <DPLTitleBar title={assetSymbol} /> */}
            <FaShareAlt color="#fff" />
            {assetName}
            {assetSymbol}
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
