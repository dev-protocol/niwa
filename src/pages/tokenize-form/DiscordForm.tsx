import { FunctionComponent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'
import HSButton from '../../components/HSButton'
import { FORM_HINT } from '../../const'
import { TokenizeWindowState } from '../../types/TokenizeWindowState'
import TermsModal from './TermsModal'

interface DiscordFormProps {
  isPopup: boolean
}

const DiscordForm: FunctionComponent<DiscordFormProps> = ({ isPopup }) => {
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

  const onAuthDiscordAccount = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    const redirectUri = encodeURI((import.meta.env.VITE_DISCORD_AUTH_REDIRECT_URI as string) || '')

    const scope = encodeURI('guilds')
    const tokenizePageState: TokenizeWindowState = {
      isPopup
    }
    const stateParam = encodeURIComponent(window.btoa(JSON.stringify(tokenizePageState)))
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&prompt=consent&state=${stateParam}`

    window.location.assign(url)
  }

  const onPreview = () => {
    if (!isValid) {
      return
    }

    setAgreedToTerms(true)

    navigate(isPopup ? '/tokenize/discord/preview?popup=true' : '/tokenize/discord/preview')
  }

  return (
    <div className="flex flex-col">
      {assetName && personalAccessToken ? (
        <>
          <div className="my-8 grid grid-cols-1 gap-sm md:grid-cols-2">
            <p>Server ID: {assetName}</p>
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
        <div className="float-right flex flex-col items-center">
          <HSButton context="submit" type="filled" isDisabled={false} onClick={onAuthDiscordAccount}>
            Authorize Discord Account
          </HSButton>
        </div>
      )}
    </div>
  )
}

export default DiscordForm
