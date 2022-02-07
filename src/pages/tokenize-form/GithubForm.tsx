import { FunctionComponent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'
import HSButton from '../../components/HSButton'
import { isValidNetwork } from '../../utils/utils'
import TermsCheckBox from './TermsCheckBox'

interface GithubFormProps {}

const GithubForm: FunctionComponent<GithubFormProps> = () => {
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
    agreedToTerms,
    setAgreedToTerms
  } = useContext(TokenizeContext)

  const submit = () => {
    if (!isValid) {
      return
    }

    navigate('/tokenize/github/preview')
  }

  return (
    <div>
      <FormField
        label="Network"
        id="network"
        helper="Minting only available on Arbitrum and Polyon."
        required={true}
        value={network?.name ?? ''}
        placeholder="Please Connect Wallet"
        disabled={true}
        isError={!isValidNetwork(network?.chainId)}
      />
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
        helper="Symbol should be 3 to 4 characters long (for example DEV)"
        id="tokenSymbol"
        required={true}
        value={tokenSymbol}
        onChange={val => {
          if (val.length <= 4) {
            setTokenSymbol(val.toUpperCase())
          }
        }}
      />
      <FormField
        label="Personal Access Token"
        id="pac"
        required={true}
        value={personalAccessToken}
        onChange={val => setPersonalAccessToken(val)}
      />
      <a
        href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
        target="_blank"
        rel="noreferrer"
        className="hs-link fs-body"
      >
        Create a Personal Access Token without any scopes.
      </a>
      <p className="fs-small mb-sm">The PAT is confidentially authenticated using the Khaos oracle.</p>

      <TermsCheckBox isChecked={agreedToTerms} setAgreedToTerms={async () => setAgreedToTerms(val => !val)} />

      <div className="row-end">
        <HSButton context="submit" type="filled" isDisabled={!isValid} onClick={submit}>
          Preview
        </HSButton>
      </div>
    </div>
  )
}

export default GithubForm
