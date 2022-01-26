import { FunctionComponent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Market } from '../../const'
import { getMarketFromString } from '../../utils/utils'
import { UndefinedOr } from '@devprotocol/util-ts'

interface AuthCallbackPageProps {}

const AuthCallbackPage: FunctionComponent<AuthCallbackPageProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [market, setMarket] = useState<UndefinedOr<Market>>()

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    setMarket(_market)

    if (_market !== Market.YOUTUBE) {
      navigate('/tokenize')
      return
    }

    // TODO: verify access_token
  }, [params, navigate, setMarket, market])

  return (
    <div>
      <p>waiting...</p>
    </div>
  )
}

export default AuthCallbackPage
