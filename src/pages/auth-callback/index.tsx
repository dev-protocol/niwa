import { FunctionComponent, useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { Market } from '../../const'
import { TokenizeContext } from '../../context/tokenizeContext'
import { getMarketFromString } from '../../utils/utils'
import { useCreateKhaosPubSign, useCreateAndAuthenticate } from '../tokenize-submit/tokenize-submit.hooks'
import { UndefinedOr } from '@devprotocol/util-ts'

interface AuthCallbackPageProps {}

interface QueryString {
  [key: string]: string
}

const AuthCallbackPage: FunctionComponent<AuthCallbackPageProps> = () => {
  const params = useParams()
  const { search, hash } = useLocation()
  const target = search ? search : hash
  const queryParams = target
    .slice(1)
    .split('&')
    .map((str) => [str.split('=')[0], str.split('=')[1]])
    .reduce((acc, a) => {
      acc[a[0]] = a[1];
      return acc;
    }, {} as QueryString)
  const navigate = useNavigate()
  const [isVerify, setIsVerify] = useState(false)
  const [market, setMarket] = useState<UndefinedOr<Market>>()

  const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID
  const swrOptions = {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    focusThrottleInterval: 0,
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
  const {
    tokenName,
    tokenSymbol,
  } = useContext(TokenizeContext)
  const { createKhaosPubSign, error: khaosError } = useCreateKhaosPubSign()
  const { createAndAuthenticate, error: tokenizeError } = useCreateAndAuthenticate()

  console.log('verify:', verifyData, youtubeData, accessToken, params, queryParams)

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    setMarket(_market)

    if (_market !== Market.YOUTUBE) {
      navigate('/tokenize')
      return
    }

    if (!accessToken || !verifyData || !youtubeData || !isVerify) {
      return
    }

    // get pubsign with khaos
    const personalAccessToken = accessToken
    const assetName = youtubeData.channelId
    createKhaosPubSign({
      personalAccessToken,
      assetName,
      signId: 'youtube-market',
    }).then((pubSig?: string) => {
      if (!pubSig) {
        return navigate('/tokenize')
      }
      createAndAuthenticate(tokenName, tokenSymbol, assetName, pubSig, _market)
        .then((propertyAddress?: string) => {
          if (!propertyAddress) {
            return navigate('/tokenize')
          }
          return navigate(`/properties/${propertyAddress}`)
        })
    })
  }, [params, navigate, setMarket, market, youtubeData])

  return (
    <div>
      <p>waiting...</p>
    </div>
  )
}

export default AuthCallbackPage
