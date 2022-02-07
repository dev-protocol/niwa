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
import HSButton from '../../components/HSButton'

interface TokenizeSubmitProps {}

const TokenizeSubmit: FunctionComponent<TokenizeSubmitProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [market, setMarket] = useState<UndefinedOr<Market>>()
  const [error, setError] = useState<UndefinedOr<string>>()
  const [isLoading, setIsLoading] = useState(false)
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
    navigate(`/properties/${propertyAddress}`)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Network"
            id="network"
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
          <FormField label="Dev Protocol Treasury Fee" id="fee" value="500,000" required disabled>
            <div className="flex text-sm">
              <span>What is the </span>
              <a
                href="https://initto.devprotocol.xyz/en/what-is-treasury/"
                target="_blank"
                className="ml-1 text-cyan-500"
                rel="noreferrer"
              >
                Dev Protocol Treasury Fee?
              </a>
            </div>
          </FormField>
        </div>

        <div className="float-right flex flex-col items-end">
          <div className="my-2 flex flow-column align-end">
            {error && <span className="text-danger-400">Error tokenizing asset: *{error}</span>}
            {khaosError && <span className="text-danger-400">Khaos Error: *{khaosError}</span>}
            {tokenizeError && <span className="text-danger-400">*{tokenizeError}</span>}
          </div>

          <HSButton context="submit" type="filled" isDisabled={submitDisabled()} onClick={submit}>
            Sign and submit
          </HSButton>
        </div>
      </div>
    </div>
  )
}

export default TokenizeSubmit
