import { UndefinedOr } from '@devprotocol/util-ts'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import FormField from '../../components/Form'
import PageHeader from '../../components/PageHeader'
import { Market } from '../../const'
import { TokenizeContext } from '../../context/tokenizeContext'
import { getMarketFromString, marketToReadable } from '../../utils/utils'
import { useCreateAndAuthenticate, useCreateKhaosPubSign } from './tokenize-submit.hooks'

interface TokenizeSubmitProps {}

const TokenizeSubmit: FunctionComponent<TokenizeSubmitProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [market, setMarket] = useState<UndefinedOr<Market>>()
  const { network, address, isValid, assetName, tokenName, tokenSymbol, personalAccessToken } =
    useContext(TokenizeContext)
  const { createKhaosPubSign, isLoading: khaosIsLoading } = useCreateKhaosPubSign()
  const { createAndAuthenticate, isLoading: createLoading } = useCreateAndAuthenticate()

  useEffect(() => {
    const _market = getMarketFromString(params.market)

    if (_market === Market.INVALID) {
      navigate('/tokenize')
      return
    }

    setMarket(_market)
  }, [params, navigate, setMarket, market])

  const submit = async () => {
    if (!isValid) {
      return
    }

    const pubSig = await createKhaosPubSign({ assetName, personalAccessToken, signId: 'github-market' })
    if (!pubSig) {
      return
    }
    const propertyAddress = await createAndAuthenticate(tokenName, tokenSymbol, assetName, pubSig)
    navigate(`/tokens/${propertyAddress}`)
  }

  return (
    <div>
      <BackButton
        title={market === Market.INVALID ? 'Tokenize' : `Tokenize ${marketToReadable(market)} Form`}
        path={market === Market.INVALID ? '/tokenize' : `/tokenize/${marketToReadable(market).toLowerCase()}`}
      />
      <PageHeader title="Tokenize" />
      <form onSubmit={submit}>
        <FormField
          label="Network"
          id="network"
          required={true}
          value={network?.name ?? ''}
          placeholder="Please Connect Wallet"
          disabled={true}
        />
        <div className="text-sm font-bold mb-6">Minting only available on Arbitrum and Polyon.</div>

        <FormField
          label="Your Wallet Address"
          id="address"
          required={true}
          value={address}
          placeholder="Please Connect Wallet"
          disabled={true}
        />

        <FormField
          label="GitHub Repository Name"
          placeholder="owner_name/repository_name"
          id="repoName"
          required={true}
          value={assetName}
          disabled={true}
        />

        <FormField label="Token Name" id="tokenName" required={true} value={tokenName} disabled={true} />

        <FormField label="Token Symbol" id="tokenSymbol" required={true} value={tokenSymbol} disabled={true} />

        <FormField label="Personal Access Token" id="pac" required={true} value={personalAccessToken} disabled={true} />

        <FormField label="Supply" id="supply" required={true} value="10,000,000" disabled={true} />

        <FormField label="Dev Protocol Treasury Fee" id="fee" required={true} value="500,000" disabled={true} />

        <div className="flex text-sm mb-4">
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
          <button
            type="submit"
            className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded px-4 py-2 ${
              isValid ? 'opacity-100' : 'opacity-60'
            }`}
            disabled={!isValid || khaosIsLoading || createLoading}
          >
            Sign and submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default TokenizeSubmit
