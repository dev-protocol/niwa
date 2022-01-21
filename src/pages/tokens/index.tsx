import { FunctionComponent, useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import { UserToken } from '../../types/userToken'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserTokenListItem from './UserTokenListItem'
import PageHeader from '../../components/PageHeader'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import { EMPTY_USER_TOKEN_PATH } from '../../const'

interface TokensPageProps {}

const TokensPage: FunctionComponent<TokensPageProps> = () => {
  const web3Context = useWeb3Provider()
  const navigate = useNavigate()
  const { userAddress } = useParams()
  const [userTokens, _setUserTokens] = useState<UserToken[]>([])

  useEffect(() => {
    const userProvider = web3Context?.web3Provider
    if (!userProvider) {
      navigate(`/${EMPTY_USER_TOKEN_PATH}`)
      return
    }
    ;(async () => {
      const address = await userProvider.getSigner().getAddress()
      navigate(`/${address}` ?? `/${EMPTY_USER_TOKEN_PATH}`)
    })()
  }, [web3Context, navigate])

  useEffect(() => {
    if (userAddress === EMPTY_USER_TOKEN_PATH) {
      return
    }

    // TODO: fetch user tokens here
  }, [userAddress])

  return (
    <div>
      <BackButton title="Home" path="/" />
      <PageHeader title="Tokens" />
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="section-header">Your Tokens</h2>
          <Link to="/tokenize" className="text-blue-500">
            <span>+ Create New Token</span>
          </Link>
        </div>
        {userTokens.length <= 0 && (
          <Link to="/tokenize" className="border-2 border-grey-500 rounded-lg flex justify-center py-12">
            <span className="text-blue-500 font-bold">Create your first token!</span>
          </Link>
        )}
        {userTokens.length > 0 && (
          <div className="flex flex-col">
            {userTokens.map(token => (
              <UserTokenListItem key={token.hash} userToken={token} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TokensPage
