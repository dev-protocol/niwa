import { FunctionComponent } from 'react'
import { Market } from '../../const'
import { UserToken } from '../../types/userToken'
import { FaGithub, FaYoutube } from 'react-icons/fa'

interface UserTokenListItemProps {
  userToken: UserToken
}

const UserTokenListItem: FunctionComponent<UserTokenListItemProps> = ({ userToken }) => {
  return (
    <div className="border-2 border-grey-500 rounded-lg flex flex-col py-2 px-4 mb-4">
      <div className="w-full text-gray-300">{userToken.hash}</div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3">
        <div className="font-bold">
          {userToken.tokenName} ({userToken.tokenSymbol})
        </div>
        <div className="flex items-center">
          <span className="font-bold">
            {userToken.holdAmount.toNumber()} {userToken.tokenSymbol}
          </span>
          <span className="text-sm ml-1"> out of {userToken.totalAmount.toNumber()}</span>
        </div>
      </div>
      <div className="w-full flex items-center">
        {userToken.market === Market.GITHUB && <FaGithub />}
        {userToken.market === Market.YOUTUBE && <FaYoutube />}
        <span>{userToken.creatorName}</span>
      </div>
    </div>
  )
}

export default UserTokenListItem
