import { FunctionComponent, useContext, useState } from 'react'
import { FaYoutube } from 'react-icons/fa'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'
import HSButton from '../../components/HSButton'

interface YouTubeFormProps {}

const YouTubeForm: FunctionComponent<YouTubeFormProps> = () => {
  const [isValid] = useState(true)
  const {
    network,
    address,
  } = useContext(TokenizeContext)

  const submit = () => {
    if (!isValid) {
      return
    }

    const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID
    const redirectUri = encodeURI(import.meta.env.VITE_YOUTUBE_AUTH_REDIRECT_URI as string || '')
    const scope = encodeURI('https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email')
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`

    console.log(url)
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

      <div className="float-right flex flex-col items-end">
        <HSButton
          context="submit"
          type="filled"
          isDisabled={!isValid}
          onClick={submit}
        >
          Authorize YouTube Account
        </HSButton>
      </div>
    </div>
  )
}

export default YouTubeForm
