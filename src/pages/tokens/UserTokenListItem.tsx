import { FunctionComponent, useEffect, useState } from 'react'
import { Market } from '../../const'
import { FaGithub, FaYoutube } from 'react-icons/fa'
import { MarketContract, PropertyContract } from '@devprotocol/dev-kit/l2'
import { AddressContractContainer } from '../../types/AddressContractContainer'
import { UndefinedOr } from '@devprotocol/util-ts'
import { getMarketFromString, matchMarketToAsset } from '../../utils/utils'
import { useGetAssetsByProperties } from '../../hooks/useMetrics'
import { utils, BigNumber } from 'ethers'
import { Link } from 'react-router-dom'

interface UserTokenListItemProps {
  property: AddressContractContainer<PropertyContract>
  enabledMarkets: UndefinedOr<AddressContractContainer<MarketContract>[]>
  userAddress: string
}

const UserTokenListItem: FunctionComponent<UserTokenListItemProps> = ({ property, enabledMarkets, userAddress }) => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [supply, setSupply] = useState('10,000,000')
  const [userHoldAmount, setUserHoldAmount] = useState('0')
  const [market, setMarket] = useState<Market>()
  const [marketAddress, setMarketAddress] = useState('')
  const [id, setId] = useState('')
  const { address, contract } = property
  const assetsByProperties = useGetAssetsByProperties(property.address)

  useEffect(() => {
    const { data: assetProperties } = assetsByProperties
    if (!assetProperties || assetProperties.length <= 0) {
      return
    }
    setId(matchMarketToAsset(marketAddress, assetProperties)?.id ?? '')
  }, [assetsByProperties, marketAddress])

  const bnFormatString = (amount: string) => {
    const formatted = utils.formatUnits(amount)
    return BigNumber.from(+formatted)
      .toNumber()
      .toLocaleString()
  }

  useEffect(() => {
    ;(async () => {
      setSymbol(await contract.symbol())
      setSupply(bnFormatString(await contract.totalSupply()))
      setUserHoldAmount(bnFormatString(await contract.balanceOf(userAddress)))
      setName(await contract.name())
    })()
  }, [contract, userAddress])

  useEffect(() => {
    if (!enabledMarkets) {
      return
    }
    const matchingMarket = enabledMarkets.find(async market => {
      const authenticatedProperties = await market.contract.getAuthenticatedProperties()
      return authenticatedProperties.indexOf(address) >= 0 ? true : false
    })
    if (!matchingMarket) {
      setMarket(Market.INVALID)
      return
    }
    ;(async () => {
      const marketName = await matchingMarket.contract.name()
      setMarket(getMarketFromString(marketName))
      setMarketAddress(matchingMarket.address)
    })()
  }, [enabledMarkets, address])

  return (
    <Link to={`/tokens/${property.address}`} className="flex flex-col mb-lg">
      <div className="w-full text-gray-300">{address}</div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3">
        <div className="font-bold">
          {name} ({symbol})
        </div>
        <div className="flex items-center">
          <span className="font-bold">
            {userHoldAmount} {symbol}
          </span>
          <span className="text-sm ml-xs"> out of {supply}</span>
        </div>
      </div>
      <div className="w-full flex items-center">
        {market === Market.GITHUB && <FaGithub />}
        {market === Market.YOUTUBE && <FaYoutube />}
        <span className="ml-xs">{id}</span>
      </div>
    </Link>
  )
}

export default UserTokenListItem
