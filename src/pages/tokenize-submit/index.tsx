import { UndefinedOr } from '@devprotocol/util-ts'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { Market } from '../../const'
import { TokenizeContext } from '../../context/tokenizeContext'
import { getMarketFromString, marketToReadable } from '../../utils/utils'
import { useCreateAndAuthenticate, useCreateKhaosPubSign } from './tokenize-submit.hooks'
import DPLTitleBar from '../../components/DPLTitleBar'
import TokenizeResult from './TokenizeResult'
import TokenizePreviewSubmit from './TokenizePreviewSubmit'

interface TokenizeSubmitProps {}

const TokenizeSubmit: FunctionComponent<TokenizeSubmitProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [market, setMarket] = useState<UndefinedOr<Market>>()
  const [error, setError] = useState<UndefinedOr<string>>()
  const [isLoading, setIsLoading] = useState(false)
  const [newPropertyAddress, setNewPropertyAddress] = useState<UndefinedOr<string>>()
  const { network, address, isValid, assetName, tokenName, tokenSymbol, personalAccessToken, validateForm } =
    useContext(TokenizeContext)
  const { createKhaosPubSign, error: khaosError } = useCreateKhaosPubSign()
  const { createAndAuthenticate, error: tokenizeError } = useCreateAndAuthenticate()

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    if (_market === Market.INVALID) {
      navigate('/tokenize')
      return
    }

    setMarket(_market)
  }, [params, navigate, setMarket, market])

  useEffect(() => {
    if (tokenizeError) {
      setError(tokenizeError)
    }
    if (khaosError) {
      setError(khaosError)
    }
  }, [tokenizeError, khaosError])

  useEffect(() => {
    validateForm()
  }, [validateForm])

  const submit = async () => {
    setIsLoading(true)
    if (!isValid) {
      setError('Form invalid')
      setIsLoading(false)
      return
    }

    const pubSig = await createKhaosPubSign({
      assetName,
      personalAccessToken,
      signId: market === Market.YOUTUBE ? 'youtube-market' : 'github-market'
    })
    if (!pubSig) {
      setError('No pubsig found')
      setIsLoading(false)
      return
    }

    if (!market) {
      setError('No market set')
      setIsLoading(false)
      return
    }

    const propertyAddress = await createAndAuthenticate(tokenName, tokenSymbol, assetName, pubSig, market)
    if (!propertyAddress) {
      setError('No property address created')
      setIsLoading(false)
      return
    }
    setNewPropertyAddress(propertyAddress)
    setIsLoading(false)
  }

  const submitDisabled = () => {
    return !isValid || isLoading
  }

  return (
    <div>
      <BackButton
        title={market === Market.INVALID ? 'Tokenize' : `Tokenize ${marketToReadable(market)} Form`}
        path={market === Market.INVALID ? '/tokenize' : `/tokenize/${marketToReadable(market).toLowerCase()}`}
      />
      <DPLTitleBar title="Tokenize" className="mb-md" />

      {!isLoading && !error && !newPropertyAddress && (
        <TokenizePreviewSubmit
          networkName={network?.name ?? ''}
          address={address}
          assetName={assetName}
          tokenName={tokenName}
          tokenSymbol={tokenSymbol}
          pat={personalAccessToken}
          isDisabled={submitDisabled()}
          market={market}
          submit={submit}
        />
      )}

      {(isLoading || error || newPropertyAddress) && (
        <div className="mt-lg">
          <TokenizeResult
            newPropertyAddress={newPropertyAddress}
            errorMessage={error}
            isLoading={isLoading}
            market={market}
          />
        </div>
      )}
    </div>
  )
}

export default TokenizeSubmit
