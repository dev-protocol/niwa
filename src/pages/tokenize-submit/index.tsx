import { UndefinedOr } from '@devprotocol/util-ts'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import FormField from '../../components/Form'
import { Market } from '../../const'
import { TokenizeContext } from '../../context/tokenizeContext'
import { getMarketFromString, marketToReadable } from '../../utils/utils'
import { useCreateAndAuthenticate, useCreateKhaosPubSign } from './tokenize-submit.hooks'
import DPLTitleBar from '../../components/DPLTitleBar'

interface TokenizeSubmitProps {}

const TokenizeSubmit: FunctionComponent<TokenizeSubmitProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [market, setMarket] = useState<UndefinedOr<Market>>()
  const [error, setError] = useState<UndefinedOr<string>>('')
  const [isLoading, setIsLoading] = useState(false)
  const { network, address, isValid, assetName, tokenName, tokenSymbol, personalAccessToken, validateForm } =
    useContext(TokenizeContext)
  const { createKhaosPubSign } = useCreateKhaosPubSign()
  const { createAndAuthenticate } = useCreateAndAuthenticate()

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    if (_market === Market.INVALID) {
      navigate('/tokenize')
      return
    }

    setMarket(_market)
  }, [params, navigate, setMarket, market])

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

    const pubSig = await createKhaosPubSign({ assetName, personalAccessToken, signId: 'github-market' })
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
    setIsLoading(false)
    navigate(`/tokens/${propertyAddress}`)
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
      <DPLTitleBar title="Tokenize" />
      <div>
        <FormField
          label="Network"
          id="network"
          helper="Minting only available on Arbitrum and Polyon."
          value={network?.name ?? ''}
          placeholder="Please Connect Wallet"
          disabled
          required
        />
        <FormField
          label="Your Wallet Address"
          id="address"
          value={address}
          placeholder="Please Connect Wallet"
          disabled
          required
        />
        <FormField
          label="GitHub Repository Name"
          placeholder="owner_name/repository_name"
          id="repoName"
          value={assetName}
          disabled
          required
        />
        <FormField label="Token Name" id="tokenName" value={tokenName} required disabled />
        <FormField label="Token Symbol" id="tokenSymbol" value={tokenSymbol} required disabled />
        <FormField label="Personal Access Token" id="pac" value={personalAccessToken} required disabled />
        <FormField label="Supply" id="supply" value="10,000,000" required disabled />
        <FormField label="Dev Protocol Treasury Fee" id="fee" value="500,000" required disabled />

        <div className="flex text-sm">
          <span>What is the </span>
          <a
            href="https://initto.devprotocol.xyz/en/what-is-treasury/"
            target="_blank"
            className="ml-1"
            rel="noreferrer"
          >
            Dev Protocol Treasury Fee?
          </a>
        </div>

        <div className="float-right flex flex-col items-end">
          <div className="h-4 mb-2">
            {error && <span className="text-sm font-bold text-red-500 italic">Error tokenizing asset: *{error}</span>}
          </div>

          <button
            onClick={submit}
            className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded px-4 py-2 ${
              submitDisabled() ? 'opacity-60' : 'opacity-100'
            }`}
            disabled={submitDisabled()}
          >
            Sign and submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default TokenizeSubmit
