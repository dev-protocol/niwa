import { FunctionComponent, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Market } from '../../const'
import { getMarketFromString } from '../../utils/utils'
import PageHeader from '../../components/PageHeader'
import GithubForm from './GithubForm'
import YouTubeForm from './YouTubeForm'
import { TokenizeContext } from '../../context/tokenizeContext'
import BackButton from '../../components/BackButton'

interface TokenizeFormPageProps {}

const TokenizeFormPage: FunctionComponent<TokenizeFormPageProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { market, setMarket } = useContext(TokenizeContext)

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    setMarket(_market)

    if (_market === Market.INVALID) {
      navigate('/tokenize')
      return
    }
  }, [params, navigate, setMarket, market])

  return (
    <div>
      <BackButton title="Tokenize" path="/tokenize" />
      <PageHeader title="Invitation Request" />
      {market === Market.GITHUB && <GithubForm />}
      {market === Market.YOUTUBE && <YouTubeForm />}
    </div>
  )
}

export default TokenizeFormPage
