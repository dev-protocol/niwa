import { FunctionComponent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'
import HSButton from '../../components/HSButton'
import { isValidNetwork } from '../../utils/utils'
import { FORM_HINT } from '../../const'
import TermsModal from './TermsModal'

interface GithubFormProps {
  isPopup: boolean
}

const GithubForm: FunctionComponent<GithubFormProps> = ({ isPopup }) => {
  const navigate = useNavigate()
  const {
    network,
    address,
    isValid,
    assetName,
    setAssetName,
    tokenName,
    setTokenName,
    tokenSymbol,
    setTokenSymbol,
    personalAccessToken,
    setPersonalAccessToken,
    setAgreedToTerms
  } = useContext(TokenizeContext)

  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false)

  const submit = () => {
    if (!isValid) {
      return
    }

    setAgreedToTerms(true)

    navigate(isPopup ? '/tokenize/github/preview?popup=true' : '/tokenize/github/preview')
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
        <FormField
          label="Network"
          id="network"
          required={true}
          value={network?.name ?? ''}
          placeholder="Please Connect Wallet"
          disabled={true}
          isError={!isValidNetwork(network?.chainId)}
        >
          <span className="text-sm">Minting only available on Arbitrum and Polyon.</span>
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
          label="GitHub Repository Name"
          placeholder="owner_name/repository_name"
          id="repoName"
          required={true}
          value={assetName}
          onChange={val => setAssetName(val)}
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
        <div>
          <FormField
            label="Personal Access Token"
            id="pac"
            required={true}
            value={personalAccessToken}
            onChange={val => setPersonalAccessToken(val)}
          >
            <span className="text-sm">The PAT is confidentially authenticated using the Khaos oracle.</span>

            <a
              href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-link text-link"
            >
              Create a Personal Access Token without any scopes.
            </a>
          </FormField>
        </div>
      </div>

      <div className="self-end">
        <HSButton context="submit" type="filled" isDisabled={!isValid} onClick={() => setIsTermsModalVisible(true)}>
          Preview
        </HSButton>
      </div>
      <TermsModal visible={isTermsModalVisible} onConfirm={async () => submit()} />
    </div>
  )
}

export default GithubForm
