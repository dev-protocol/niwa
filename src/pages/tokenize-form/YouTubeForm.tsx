import { FunctionComponent, useContext, useState } from 'react'
import { FaYoutube } from 'react-icons/fa'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'
import HSButton from '../../components/HSButton'
import TermsCheckBox from './TermsCheckBox'

interface YouTubeFormProps {}

const YouTubeForm: FunctionComponent<YouTubeFormProps> = () => {
  const [isValid] = useState(true)
  const { network, address, tokenName, setTokenName, tokenSymbol, setTokenSymbol, agreedToTerms, setAgreedToTerms } =
    useContext(TokenizeContext)

  const submit = () => {
    if (!isValid) {
      return
    }

    const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID
    const redirectUri = encodeURI((import.meta.env.VITE_YOUTUBE_AUTH_REDIRECT_URI as string) || '')
    const scope = encodeURI(
      'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email'
    )
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`

    window.location.assign(url)
  }

  return (
    <div>
      <FaYoutube />
      YouTube Market
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
        <span className="text-sm">Symbol should be 3 to 4 characters long (for example DEV)</span>
      </FormField>
      <TermsCheckBox isChecked={agreedToTerms} setAgreedToTerms={async () => setAgreedToTerms(val => !val)} />
      <div className="float-right flex flex-col items-end">
        <HSButton context="submit" type="filled" isDisabled={!isValid} onClick={submit}>
          Authorize YouTube Account
        </HSButton>
      </div>
    </div>
  )
}

export default YouTubeForm
