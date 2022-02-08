import { FunctionComponent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Market } from '../../const'
import { getMarketFromString, marketToReadable } from '../../utils/utils'
import DPLTitleBar from '../../components/DPLTitleBar'
import GithubForm from './GithubForm'
import YouTubeForm from './YouTubeForm'
import BackButton from '../../components/BackButton'
import { UndefinedOr } from '@devprotocol/util-ts'
import TitleSubSection from '../../components/TitleSubSection'
import { FaGithub, FaYoutube } from 'react-icons/fa'

interface TokenizeFormPageProps {}

const TokenizeFormPage: FunctionComponent<TokenizeFormPageProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [market, setMarket] = useState<UndefinedOr<Market>>()

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
      <DPLTitleBar title="Tokenize GitHub Form" classNames="mb-md" />
      <TitleSubSection>
        <div className="flex items-center">
          {market === Market.GITHUB && <FaGithub />}
          {market === Market.YOUTUBE && <FaYoutube color="red" />}
          <span className="ml-1">{marketToReadable(market)} Project Information</span>
        </div>
      </TitleSubSection>
      {market === Market.GITHUB && <GithubForm />}
      {market === Market.YOUTUBE && <YouTubeForm />}
    </div>
  )
}

export default TokenizeFormPage
