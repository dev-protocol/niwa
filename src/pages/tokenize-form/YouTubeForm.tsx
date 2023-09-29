import { FunctionComponent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'
import HSButton from '../../components/HSButton'
import gLogo from '../../img/g-logo.png'
import { FORM_HINT } from '../../const'
import { TokenizeWindowState } from '../../types/TokenizeWindowState'
import TermsModal from './TermsModal'

interface YouTubeFormProps {
  isPopup: boolean
}

const YouTubeForm: FunctionComponent<YouTubeFormProps> = ({ isPopup }) => {
  const navigate = useNavigate()
  const {
    network,
    address,
    tokenName,
    setTokenName,
    tokenSymbol,
    setTokenSymbol,
    setAgreedToTerms,
    isValid,
    personalAccessToken,
    assetName
  } = useContext(TokenizeContext)
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false)

  const onAuthYoutubeAccount = () => {
    const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID
    const redirectUri = encodeURI((import.meta.env.VITE_YOUTUBE_AUTH_REDIRECT_URI as string) || '')
    const scope = encodeURI(
      'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email'
    )
    const tokenizePageState: TokenizeWindowState = {
      isPopup
    }
    const stateParam = encodeURIComponent(window.btoa(JSON.stringify(tokenizePageState)))
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&state=${stateParam}`

    window.location.assign(url)
  }

  const onPreview = () => {
    if (!isValid) {
      return
    }

    setAgreedToTerms(true)

    navigate(isPopup ? '/tokenize/youtube/preview?popup=true' : '/tokenize/youtube/preview')
  }

  return (
    <div className="flex flex-col">
      {assetName && personalAccessToken ? (
        <>
          <div className="my-8 grid grid-cols-1 gap-sm md:grid-cols-2">
            <p>Channel ID: {assetName}</p>
          </div>
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
            <FormField
              label="Network"
              id="network"
              required={true}
              value={network?.name ?? ''}
              placeholder="Please Connect Wallet"
              disabled={true}
            >
              <span className="mb-6 text-sm font-bold">Minting only available on Arbitrum and Polyon.</span>
            </FormField>
            <FormField
              label="Your Wallet Address"
              id="address"
              required={true}
              value={address}
              placeholder="Please Connect Wallet"
              disabled={true}
            />
            <FormField
              label="Token Name"
              id="tokenName"
              required={true}
              value={tokenName}
              onChange={val => setTokenName(val)}
            />
            <FormField
              label="Token Symbol"
              id="tokenSymbol"
              required={true}
              value={tokenSymbol}
              onChange={val => {
                if (val.length <= 4) {
                  setTokenSymbol(val.toUpperCase())
                }
              }}
            >
              <span className="text-sm">{FORM_HINT.symbol_length}</span>
            </FormField>
          </div>

          <div className="float-right flex flex-col items-end">
            <HSButton context="submit" type="filled" isDisabled={!isValid} onClick={() => setIsTermsModalVisible(true)}>
              Preview
            </HSButton>
          </div>
          <TermsModal visible={isTermsModalVisible} onConfirm={async () => onPreview()} />
        </>
      ) : (
        <div className="flex flex-col">
          <div>
            <h2 className="text-lg font-bold">Authorize your YouTube Account</h2>
            <p className="mb-sm">
              To authorize your YouTube account, we will use your Google account (YouTube Data API).
            </p>
            <button
              className="mb-sm flex items-center rounded bg-white shadow"
              style={{ height: '40px', padding: '0 8px' }}
              type="submit"
              onClick={onAuthYoutubeAccount}
            >
              <img src={gLogo} style={{ width: '18px' }} />
              <span
                className="font-bold"
                style={{ fontFamily: 'Roboto', marginLeft: '16px', fontSize: '14px', color: 'rgba(0, 0, 0, .54)' }}
              >
                Sign in with Google
              </span>
            </button>
            <h2 className="text-lg font-bold">Why is Google OAuth necessary?</h2>
            <ul className="list-disc pl-sm">
              <li>To verify you are the owner of the YouTube channel.</li>
              <li>To eliminate spoofing.</li>
              <li>We use only the readonly API to get the channel id info.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default YouTubeForm
