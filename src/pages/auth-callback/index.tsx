import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Market } from '../../const'
import BackButton from '../../components/BackButton'
import { getMarketFromString, marketToReadable } from '../../utils/utils'
import YouTubeAuthCallbackPage from './YouTubeAuthCallback'
import DiscordAuthCallbackPage from './DiscordAuthCallback'

interface AuthCallbackPageProps {}

const AuthCallbackPage: FunctionComponent<AuthCallbackPageProps> = () => {
  const params = useParams()
  const market = getMarketFromString(params.market)

  return (
    <div className="flex flex-col">
      <BackButton
        title={
          market === Market.YOUTUBE || market === Market.DISCORD
            ? `Tokenize ${marketToReadable(market)} Market`
            : 'Tokenize'
        }
        path={
          market === Market.YOUTUBE || market === Market.DISCORD ? `/tokenize/${market.toLowerCase()}` : '/tokenize'
        }
      />
      {market === Market.YOUTUBE ? (
        <YouTubeAuthCallbackPage />
      ) : market === Market.DISCORD ? (
        <DiscordAuthCallbackPage />
      ) : (
        <div>
          <p>invalid market</p>
        </div>
      )}
    </div>
  )
}

export default AuthCallbackPage
