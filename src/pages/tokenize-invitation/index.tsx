import { UndefinedOr } from '@devprotocol/util-ts'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormField from '../../components/Form'
import PageHeader from '../../components/PageHeader'
import { Market } from '../../const'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import { getMarketFromString, marketToReadable } from '../../utils/utils'
import { usePostInvitation } from './hooks'

interface InvitationRequestPageProps {}

const InvitationRequestPage: FunctionComponent<InvitationRequestPageProps> = () => {
  const params = useParams()
  const [market, setMarket] = useState<UndefinedOr<Market>>()
  const [asset, setAsset] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [discord, setDiscord] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [termsAgreement, setTermsAgreement] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [userAddress, setUserAddress] = useState<UndefinedOr<string>>()
  const web3Context = useWeb3Provider()
  const { isLoading, postInvitationHandler } = usePostInvitation()

  useEffect(() => {
    const { market } = params
    setMarket(getMarketFromString(market))
  }, [params])

  const validateForm = useCallback(() => {
    if (!termsAgreement) {
      setFormValid(false)
      return
    }

    if (asset.length <= 0) {
      setFormValid(false)
      return
    }

    if (userName.length <= 0) {
      setFormValid(false)
      return
    }

    // validate email address
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setFormValid(false)
      return
    }

    // wallet connected?
    if (!userAddress || userAddress.length < 42) {
      setFormValid(false)
      return
    }

    setFormValid(true)
  }, [email, asset.length, termsAgreement, userAddress, userName.length])

  useEffect(() => validateForm(), [asset, userName, email, termsAgreement, userAddress, validateForm])

  useEffect(() => {
    if (web3Context?.web3Provider) {
      const provider = web3Context.web3Provider
      ;(async () => {
        const userAddress = await provider.getSigner().getAddress()
        setUserAddress(userAddress)
      })()
    }
  }, [web3Context])

  const submit = async () => {
    if (!formValid) {
      return
    }

    const _success = await postInvitationHandler({
      asset,
      email,
      discord,
      market: marketToReadable(market),
      name: userName,
      newsletter,
      ask: additionalInfo,
      role: '',
      useCase: '',
      url: asset
    })
  }

  return (
    <div>
      <PageHeader title="Invitation Request" />
      <form onSubmit={submit}>
        <FormField
          label="Ethereum Address"
          id="ethereumAddress"
          required={true}
          value={userAddress ?? ''}
          placeholder="0x00"
          disabled={true}
          onChange={() => {}} // this is handled by connecting wallet
        />

        <FormField
          label="URL of GitHub Repository"
          id="repoUrl"
          required={true}
          value={asset}
          placeholder="https://github.com/..."
          onChange={val => setAsset(val)}
        />

        <FormField
          label="Your name"
          id="userName"
          required={true}
          value={userName}
          onChange={val => setUserName(val)}
        />

        <FormField
          label="Your email address"
          id="emailAddress"
          required={true}
          value={email}
          onChange={val => setEmail(val)}
        />

        <FormField
          label="Your Discord username on Dev Protocol's server"
          id="discordUserName"
          value={discord}
          onChange={val => setDiscord(val)}
        />

        <FormField
          label="Additional info"
          placeholder="I'd like to say..."
          id="additionalInfo"
          value={additionalInfo}
          onChange={val => setAdditionalInfo(val)}
        />
      </form>

      <div>
        <label className="flex items-center">
          <input
            name="termsOfUse"
            type="checkbox"
            checked={termsAgreement}
            onChange={() => setTermsAgreement(prevCheck => !prevCheck)}
          />
          <span className="ml-2 text-sm font-bold">
            {' '}
            Agreement to{' '}
            <a href="#" target="_blank" className="text-blue-400">
              terms of use
            </a>{' '}
            and{' '}
            <a href="#" target="_blank" className="text-blue-400">
              code of conduct
            </a>
            .
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center mb-4">
          <input name="subscribe" type="checkbox" checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
          <span className="ml-2 text-sm font-bold">Subscribe to our newsletter</span>
        </label>
      </div>

      <div className="float-right flex flex-col items-end">
        <button
          type="submit"
          className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded px-4 py-2 ${
            formValid ? 'opacity-100' : 'opacity-60'
          }`}
          disabled={!formValid || isLoading}
        >
          Sign and submit
        </button>
        <Link to="#">
          <span className="text-blue-500 text-sm">Already have an invitation?</span>
        </Link>
      </div>
    </div>
  )
}

export default InvitationRequestPage
