import { FunctionComponent, useEffect, useState } from 'react'
import { Market } from '../../const'
import { FaGithub, FaYoutube } from 'react-icons/fa'
import { PropertyContract } from '@devprotocol/dev-kit/l2'
import { AddressContractContainer } from '../../types/AddressContractContainer'
import { utils, BigNumber } from 'ethers'
import { Link } from 'react-router-dom'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import { crunchAddress } from '../../utils/utils'

interface UserTokenListItemProps {
  property: AddressContractContainer<PropertyContract>
  userAddress: string
}

const UserTokenListItem: FunctionComponent<UserTokenListItemProps> = ({ property, userAddress }) => {
  const [supply, setSupply] = useState('10,000,000')
  const [userHoldAmount, setUserHoldAmount] = useState('0')
  const { address, contract } = property

  const { propertyDetails, isLoading, error } = usePropertyDetails(property.address)
  const cardStyles = 'shadow border border-transparent hover:border-gray-300'

  const bnFormatString = (amount: string) => {
    const formatted = utils.formatUnits(amount)
    return BigNumber.from(+formatted)
      .toNumber()
      .toLocaleString()
  }

  useEffect(() => {
    console.log('property details are: ', propertyDetails)
  }, [propertyDetails])

  useEffect(() => {
    ;(async () => {
      setSupply(bnFormatString(await contract.totalSupply()))
      setUserHoldAmount(bnFormatString(await contract.balanceOf(userAddress)))
    })()
  }, [contract, userAddress])

  return (
    <>
      {propertyDetails && !isLoading && (
        <Link to={`/properties/${property.address}`} className={`flex flex-col rounded py-4 px-8 ${cardStyles}`}>
          <div className="font-bold">
            {propertyDetails.propertyName} ({propertyDetails.propertySymbol})
          </div>
          <div className="w-full text-gray-500">{crunchAddress(address)}</div>
          <div className="flex">
            <div className="flex items-center">
              <div>
                {userHoldAmount} <span className="text-sm ml-1"> / {supply}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center">
            {propertyDetails.market === Market.GITHUB && <FaGithub />}
            {propertyDetails.market === Market.YOUTUBE && <FaYoutube />}
            <span className="ml-2">{propertyDetails.id}</span>
          </div>
        </Link>
      )}
      {isLoading && <div>loading...</div>}
      {error && <div className={`rounded py-4 px-8 ${cardStyles} break-words`}>{error}</div>}
    </>
  )
}

export default UserTokenListItem
