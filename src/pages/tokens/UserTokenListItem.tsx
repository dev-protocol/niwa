import { FunctionComponent, useEffect, useState } from 'react'
import { Market } from '../../const'
import { FaGithub, FaYoutube } from 'react-icons/fa'
import { PropertyContract } from '@devprotocol/dev-kit/l2'
import { AddressContractContainer } from '../../types/AddressContractContainer'
import { utils, BigNumber } from 'ethers'
import { Link } from 'react-router-dom'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'

interface UserTokenListItemProps {
  property: AddressContractContainer<PropertyContract>
  userAddress: string
}

const UserTokenListItem: FunctionComponent<UserTokenListItemProps> = ({ property, userAddress }) => {
  const [supply, setSupply] = useState('10,000,000')
  const [userHoldAmount, setUserHoldAmount] = useState('0')
  const { address, contract } = property

  const { propertyDetails, isLoading, error } = usePropertyDetails(property.address)

  const bnFormatString = (amount: string) => {
    const formatted = utils.formatUnits(amount)
    return BigNumber.from(+formatted)
      .toNumber()
      .toLocaleString()
  }

  useEffect(() => {
    ;(async () => {
      setSupply(bnFormatString(await contract.totalSupply()))
      setUserHoldAmount(bnFormatString(await contract.balanceOf(userAddress)))
    })()
  }, [contract, userAddress])

  return (
    <>
      {propertyDetails && !isLoading && (
        <Link to={`/properties/${property.address}`} className="flex flex-col mb-lg">
          <div className="w-full text-gray-300">{address}</div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3">
            <div className="font-bold">
              {propertyDetails.propertyName} ({propertyDetails.propertySymbol})
            </div>
            <div className="flex items-center">
              <span className="font-bold">
                {userHoldAmount} {propertyDetails.propertySymbol}
              </span>
              <span className="text-sm ml-xs"> out of {supply}</span>
            </div>
          </div>
          <div className="w-full flex items-center">
            {propertyDetails.market === Market.GITHUB && <FaGithub />}
            {propertyDetails.market === Market.YOUTUBE && <FaYoutube />}
            <span className="ml-xs">{propertyDetails.id}</span>
          </div>
        </Link>
      )}
      {isLoading && <div className="mb-lg">loading...</div>}
      {error && <div className="mb-lg">{error}</div>}
    </>
  )
}

export default UserTokenListItem
