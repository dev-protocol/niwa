import { FunctionComponent, useContext, useState } from 'react'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'

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
      <FontAwesomeIcon icon={faYoutube} className="mr-1" style={{ color: '#e93323' }} />
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
        <button
          type="submit"
          className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded px-4 py-2 ${
            isValid ? 'opacity-100' : 'opacity-60'
          }`}
          disabled={!isValid}
          onClick={submit}
        >
          Authorize YouTube Account
        </button>
      </div>
    </div>
  )
}

export default YouTubeForm
