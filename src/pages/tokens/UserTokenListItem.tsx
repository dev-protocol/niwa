import { FunctionComponent, useEffect, useState } from 'react'
import { Market } from '../../const'
import { FaGithub, FaYoutube } from 'react-icons/fa'
import { MarketContract, PropertyContract } from '@devprotocol/dev-kit/l2'
import { AddressContractContainer } from '../../types/AddressContractContainer'
import { UndefinedOr } from '@devprotocol/util-ts'

interface UserTokenListItemProps {
  property: AddressContractContainer<PropertyContract>
  enabledMarkets: UndefinedOr<AddressContractContainer<MarketContract>[]>
  userAddress: string
}

const UserTokenListItem: FunctionComponent<UserTokenListItemProps> = ({ property, enabledMarkets, userAddress }) => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [supply, setSupply] = useState('')
  const [userHoldAmount, setUserHoldAmount] = useState('')
  const { address, contract } = property

  useEffect(() => {
    ;(async () => {
      setSymbol(await contract.symbol())
      setSupply(await contract.totalSupply())
      setUserHoldAmount(await contract.balanceOf(userAddress))
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
      // authenticatedProperties.indexOf()
    })
    if (!matchingMarket) {
      return
    }
    ;(async () => {
      console.log('matchingMarket.contract: ', matchingMarket.contract)
      const marketName = await matchingMarket.contract.name()
      console.log('market name is: ', marketName)
    })()
  }, [enabledMarkets, address])

  return (
    <div className="border-2 border-grey-500 rounded-lg flex flex-col py-2 px-4 mb-4">
      <div className="w-full text-gray-300">{address}</div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3">
        <div className="font-bold">
          {name} ({symbol})
        </div>
        <div className="flex items-center">
          <span className="font-bold">
            {/* {userToken.holdAmount.toNumber()} {symbol} */}
            {userHoldAmount} {symbol}
          </span>
          <span className="text-sm ml-1"> out of {supply}</span>
        </div>
      </div>
      {/* <div className="w-full flex items-center">
        {userToken.market === Market.GITHUB && <FaGithub />}
        {userToken.market === Market.YOUTUBE && <FaYoutube />}
        <span>{userToken.creatorName}</span>
      </div> */}
    </div>
  )
}

export default UserTokenListItem
