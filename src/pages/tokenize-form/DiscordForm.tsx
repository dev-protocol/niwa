import { FunctionComponent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'
import HSButton from '../../components/HSButton'
import TermsCheckBox from './TermsCheckBox'
import { FORM_HINT } from '../../const'

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
    agreedToTerms,
    setAgreedToTerms,
    isValid,
    personalAccessToken,
    assetName
  } = useContext(TokenizeContext)

  const onAuthDiscordAccount = () => {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    const redirectUri = encodeURI((import.meta.env.VITE_DISCORD_AUTH_REDIRECT_URI as string) || '')

    const scope = encodeURI('guilds')
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${
      isPopup ? `${redirectUri}?popup=true` : redirectUri
    }&scope=${scope}&response_type=code&prompt=consent`

    window.location.assign(url)
  }

  const onPreview = () => {
    if (!isValid) {
      return
    }
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
          <TermsCheckBox isChecked={agreedToTerms} setAgreedToTerms={async () => setAgreedToTerms(val => !val)} />
          <div className="float-right flex flex-col items-end">
            <HSButton context="submit" type="filled" isDisabled={!isValid} onClick={onPreview}>
              Preview
            </HSButton>
          </div>
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
