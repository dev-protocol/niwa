import { FunctionComponent, useEffect, useState } from 'react'
import { Market } from '../../const'
import { FaGithub, FaYoutube } from 'react-icons/fa'
import { PropertyContract } from '@devprotocol/dev-kit/l2'
import { AddressContractContainer } from '../../types/AddressContractContainer'
import { utils, BigNumber } from 'ethers'
import { Link } from 'react-router-dom'
import { usePropertyDetails } from '../../hooks/usePropertyDetails'
import { crunchAddress } from '../../utils/utils'
import Card from '../../components/Card'
import { SectionLoading } from '../../components/Spinner'

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
        <Link to={`/properties/${property.address}`}>
          <Card>
            <div className="flex flex-col"></div>
            <div className="font-bold">
              {propertyDetails.propertyName} ({propertyDetails.propertySymbol})
            </div>
            <div className="w-full text-gray-500">{crunchAddress(address)}</div>
            <div className="flex">
              <div className="flex items-center">
                <div>
                  {userHoldAmount} <span className="ml-1 text-sm"> / {supply}</span>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center">
              {propertyDetails.market === Market.GITHUB && <FaGithub />}
              {propertyDetails.market === Market.YOUTUBE && <FaYoutube />}
              <span className="ml-2">{propertyDetails.id}</span>
            </div>
          </Card>
        </Link>
      )}
      {isLoading && <SectionLoading />}
      {error && (
        <Card isDisabled={true}>
          <div className={`break-words`}>{error}</div>
        </Card>
      )}
    </>
  )
}

export default UserTokenListItem
