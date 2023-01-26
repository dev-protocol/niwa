import { ChangeEvent, FunctionComponent, useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { Market } from '../../const'
import HSButton from '../../components/HSButton'
import { TokenizeContext } from '../../context/tokenizeContext'
import { getMarketFromString, useQuery } from '../../utils/utils'
import { UndefinedOr } from '@devprotocol/util-ts'

interface AuthCallbackPageProps {}

const DiscordAuthCallbackPage: FunctionComponent<AuthCallbackPageProps> = () => {
  const params = useParams()
  const [error, setError] = useState<UndefinedOr<string>>()
  const { search, hash } = useLocation()
  const target = search ? search : hash
  const queryParams = useQuery(target)
  const navigate = useNavigate()
  const [isVerify, setIsVerify] = useState(false)
  const [market, setMarket] = useState<UndefinedOr<Market>>()

  const encodedStateParam: string = queryParams.state
  const decodedStateParam: { isPopup: boolean } = JSON.parse(window.atob(decodeURIComponent(encodedStateParam)))
  const isPopup: boolean = decodedStateParam.isPopup

  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
  const clientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET
  const redirectUri = encodeURI((import.meta.env.VITE_DISCORD_AUTH_REDIRECT_URI as string) || '')
  const swrOptions = {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    focusThrottleInterval: 0
  }

  const oauthCode = queryParams.code
  const { data: verifyData } = useSWR(
    oauthCode !== '' ? 'discord/verify' : null,
    async () => {
      const verifyUrl = `https://discord.com/api/oauth2/token`
      const body = new URLSearchParams({
        client_id: clientId as string,
        client_secret: clientSecret as string,
        grant_type: 'authorization_code',
        code: (oauthCode as string) || '',
        redirect_uri: redirectUri
      })
      return fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      }).then((res: any) => {
        return res.json().then((value: any) => {
          if (value.scope !== 'guilds') {
            throw new Error('invalid audience')
          }
          value.access_token && setIsVerify(true)
          return { accessToken: value.access_token }
        })
      })
    },
    swrOptions
  )
  const { data: guildData } = useSWR(
    verifyData && verifyData.accessToken ? 'discord/dataapi' : null,
    async () => {
      const discordGuildApiUrl = `https://discord.com/api/users/@me/guilds`
      return fetch(discordGuildApiUrl, {
        headers: {
          Authorization: `Bearer ${verifyData.accessToken}`
        }
      }).then((res: any) => {
        const data = res.json()
        return data.then((datas: any) => {
          const ownerGuilds = datas.filter((d: any) => d.owner)
          return ownerGuilds
        })
      })
    },
    swrOptions
  )
  const { assetName, setAssetName, setPersonalAccessToken } = useContext(TokenizeContext)

  const displayMessage = (msg: string) => {
    setError(msg)
    console.log(msg)
  }

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    setMarket(_market)

    if (_market !== Market.DISCORD) {
      return displayMessage('invalid market')
    }

    if (verifyData === undefined || guildData === undefined) {
      return
    }

    if (!isVerify) {
      return displayMessage('invalid oauth')
    }

    setPersonalAccessToken(verifyData?.accessToken)
  }, [params, navigate, setMarket, market, guildData, isVerify, setPersonalAccessToken, verifyData, setAssetName])

  const onChange = (v: ChangeEvent<HTMLInputElement>) => {
    setAssetName(v.target.value)
  }

  const onSubmit = () => {
    if (!assetName) {
      return setError('select guild')
    }
    return navigate(isPopup ? '/tokenize/discord?popup=true' : '/tokenize/discord')
  }

  return (
    <div className="flex flex-col">
      {error && (
        <div className="align-end mb-sm mt-sm flex flex-col">
          {error && <span className="text-danger-400">Error tokenizing asset: *{error}</span>}
        </div>
      )}
      {verifyData && guildData ? (
        <div>
          <div>
            {guildData.length === 0 && <p>You do not have your own discord server (guild)</p>}
            <form className="flex flex-col gap-4">
              {guildData.map((d: any, idx: number) => {
                return (
                  <label className="flex flex-row items-center gap-2" key={idx}>
                    <input type="radio" name="guild" value={d.id} onChange={onChange} />
                    {d.icon === null ? (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                        <div className="text-xl text-black">{d.name.slice(0, 2)}</div>
                      </div>
                    ) : (
                      <img
                        className="h-16 w-16 rounded-full"
                        src={`https://cdn.discordapp.com/icons/${d.id}/${d.icon}.png`}
                        alt={`${d.name} guild icon`}
                      />
                    )}
                    <span className="text-xl">
                      {d.id} (Guild Name: {d.name})
                    </span>
                  </label>
                )
              })}
              <div className="float-right flex flex-col items-center">
                <HSButton type="filled" isDisabled={false} onClick={onSubmit}>
                  Select
                </HSButton>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>waiting...</p>
      )}
    </div>
  )
}

export default DiscordAuthCallbackPage
