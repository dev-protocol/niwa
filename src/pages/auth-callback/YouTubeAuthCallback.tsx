import { FunctionComponent, useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { Market } from '../../const'
import { TokenizeContext } from '../../context/tokenizeContext'
import { getMarketFromString, useQuery } from '../../utils/utils'
import { UndefinedOr } from '@devprotocol/util-ts'
import { TokenizeWindowState } from '../../types/TokenizeWindowState'

interface AuthCallbackPageProps {}

const YouTubeAuthCallbackPage: FunctionComponent<AuthCallbackPageProps> = () => {
  const params = useParams()
  const [error, setError] = useState<UndefinedOr<string>>()
  const { search, hash } = useLocation()
  const target = search ? search : hash
  const queryParams = useQuery(target)
  const navigate = useNavigate()
  const [isVerify, setIsVerify] = useState(false)
  const [market, setMarket] = useState<UndefinedOr<Market>>()

  const encodedStateParam: string = queryParams.state
  const decodedStateParam: TokenizeWindowState = JSON.parse(window.atob(decodeURIComponent(encodedStateParam)))

  const { isPopup, allowAccess } = decodedStateParam

  const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID
  const swrOptions = {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    focusThrottleInterval: 0
  }

  const accessToken = queryParams.access_token || ''
  const { data: verifyData } = useSWR(
    accessToken !== '' ? 'google/verify' : null,
    async () => {
      const verifyUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      return fetch(verifyUrl).then((res: any) => {
        return res.json().then((value: any) => {
          const email = value.email
          if (value.audience !== clientId) {
            throw new Error('invalid audience')
          }
          setIsVerify(true)
          return { email }
        })
      })
    },
    swrOptions
  )
  const { data: youtubeData } = useSWR(
    accessToken !== '' ? 'youtube/dataapi' : null,
    async () => {
      const youtubeDataApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=id,snippet,brandingSettings,statistics&mine=true&access_token=${accessToken}`
      return fetch(youtubeDataApiUrl).then((res: any) => {
        const data = res.json()
        return data.then((value: any) => {
          return value.items.map((item: any) => {
            const channelId = item.id
            const videoCount = item.statistics.videoCount
            const viewCount = item.statistics.viewCount
            const keywords = item.brandingSettings.channel.keywords
            const title = item.snippet.title
            const description = item.snippet.description
            return { channelId, videoCount, viewCount, keywords, title, description }
          })
        })
      })
    },
    swrOptions
  )
  const { setAssetName, setPersonalAccessToken } = useContext(TokenizeContext)

  const displayMessage = (msg: string) => {
    setError(msg)
    console.log(msg)
  }

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    setMarket(_market)

    if (_market !== Market.YOUTUBE) {
      return displayMessage('invalid market')
    }

    if (!accessToken || !verifyData || !youtubeData || !isVerify) {
      return displayMessage('invalid oauth')
    }

    setAssetName(youtubeData.pop().channelId)
    setPersonalAccessToken(accessToken)

    const redirectUri = new URL('/tokenize/youtube', location.origin)
    if (isPopup) {
      redirectUri.searchParams.set('popup', 'true')
    }

    if (allowAccess) {
      redirectUri.searchParams.set('allowAccess', 'true')
    }

    return navigate(redirectUri)
  }, [
    params,
    navigate,
    setMarket,
    market,
    youtubeData,
    isVerify,
    setPersonalAccessToken,
    accessToken,
    verifyData,
    setAssetName,
    isPopup,
    allowAccess
  ])

  return (
    <div>
      {error ? (
        <div className="align-end mb-sm mt-sm flex flex-col">
          {error && <span className="text-danger-400">Error tokenizing asset: *{error}</span>}
        </div>
      ) : (
        <p>waiting...</p>
      )}
    </div>
  )
}

export default YouTubeAuthCallbackPage
