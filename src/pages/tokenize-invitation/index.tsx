import { UndefinedOr } from '@devprotocol/util-ts'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormField from '../../components/Form'
import PageHeader from '../../components/PageHeader'
import { Market } from '../../const/market.const'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import { getMarketFromString } from '../../utils/utils'

interface InvitationRequestPageProps {}

const InvitationRequestPage: FunctionComponent<InvitationRequestPageProps> = () => {
  const params = useParams()
  const [_market, setMarket] = useState<UndefinedOr<Market>>()
  const [repoUrl, setRepoUrl] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [userName, setUserName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [discordUserName, setDiscordUserName] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [termsAgreement, setTermsAgreement] = useState(false)
  const [subscribe, setSubscribe] = useState(false)
  const [userAddress, setUserAddress] = useState<UndefinedOr<string>>()
  const web3Context = useWeb3Provider()

  useEffect(() => {
    const { market } = params
    setMarket(getMarketFromString(market))
  }, [params])

  const validateForm = useCallback(() => {
    console.log('validate form hit...')
    if (!termsAgreement) {
      setFormValid(false)
      return
    }

    if (repoUrl.length <= 0) {
      setFormValid(false)
      return
    }

    if (userName.length <= 0) {
      setFormValid(false)
      return
    }

    // validate email address
    if (
      !emailAddress
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
  }, [emailAddress, repoUrl.length, termsAgreement, userAddress, userName.length])

  useEffect(() => validateForm(), [repoUrl, userName, emailAddress, termsAgreement, userAddress, validateForm])

  useEffect(() => {
    if (web3Context?.web3Provider) {
      const provider = web3Context.web3Provider
      ;(async () => {
        const userAddress = await provider.getSigner().getAddress()
        setUserAddress(userAddress)
      })()
    }
  }, [web3Context])

  const submit = () => {
    if (!formValid) {
      return
    }
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
          value={repoUrl}
          placeholder="https://github.com/..."
          onChange={val => setRepoUrl(val)}
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
          value={emailAddress}
          onChange={val => setEmailAddress(val)}
        />

        <FormField
          label="Your Discord username on Dev Protocol's server"
          id="discordUserName"
          value={discordUserName}
          onChange={val => setDiscordUserName(val)}
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
          <input name="subscribe" type="checkbox" checked={subscribe} onChange={() => setSubscribe(!subscribe)} />
          <span className="ml-2 text-sm font-bold">Subscribe to our newsletter</span>
        </label>
      </div>

      <div className="float-right flex flex-col items-end">
        <button
          type="submit"
          className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded px-4 py-2 ${
            formValid ? 'opacity-100' : 'opacity-60'
          }`}
          disabled={!formValid}
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
