import { FunctionComponent, useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Market, TOKENIZE_STEP_LABELS } from '../../const'
import { getMarketFromString, marketToReadable, useQuery } from '../../utils/utils'
import DPLTitleBar from '../../components/DPLTitleBar'
import GithubForm from './GithubForm'
import YouTubeForm from './YouTubeForm'
import DiscordForm from './DiscordForm'
import BackButton from '../../components/BackButton'
import { UndefinedOr } from '@devprotocol/util-ts'
import TitleSubSection from '../../components/TitleSubSection'
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa'
import ProgressStepper from '../../components/ProgressStepper'

interface TokenizeFormPageProps {}

const TokenizeFormPage: FunctionComponent<TokenizeFormPageProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [market, setMarket] = useState<UndefinedOr<Market>>()

  const { search, hash } = useLocation()
  const target = search ? search : hash
  const queryParams = useQuery(target)
  const isPopup = Boolean(queryParams.popup)
  const allowAccess = Boolean(queryParams.allowAccess)

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    setMarket(_market)

    if (_market === Market.INVALID) {
      navigate('/tokenize')
      return
    }
  }, [params, navigate, setMarket, market])

  /**
   * Temporarily redirects to Airtable for KYC
   */
  useEffect(() => {
    if (!allowAccess) {
      window.location.href = 'https://airtable.com/shrQod8lRRlTlWOVH'
    }
  }, [])

  return (
    <div>
      <BackButton title="Select Market" path="/tokenize" />
      <DPLTitleBar
        title={market === Market.INVALID ? 'Tokenize' : `Tokenize ${marketToReadable(market)} Form`}
        className="mb-md"
      />

      <div className="flex justify-center">
        <ProgressStepper currentStep={1} completedStep={0} stepLabels={TOKENIZE_STEP_LABELS} />
      </div>

      <TitleSubSection>
        <div className="flex items-center">
          {market === Market.GITHUB && <FaGithub />}
          {market === Market.YOUTUBE && <FaYoutube color="red" />}
          {market === Market.DISCORD && <FaDiscord color="purple" />}
          <span className="ml-1">{marketToReadable(market)} Project Information</span>
        </div>
      </TitleSubSection>
      {market === Market.GITHUB && <GithubForm isPopup={isPopup} />}
      {market === Market.YOUTUBE && <YouTubeForm isPopup={isPopup} allowAccess={allowAccess} />}
      {market === Market.DISCORD && <DiscordForm isPopup={isPopup} allowAccess={allowAccess} />}
    </div>
  )
}

export default TokenizeFormPage
