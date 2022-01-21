import { FunctionComponent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/Form'
import { TokenizeContext } from '../../context/tokenizeContext'

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
    setPersonalAccessToken
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
        onChange={val => setTokenSymbol(val)}
      />

      <FormField
        label="Personal Access Token"
        id="pac"
        required={true}
        value={personalAccessToken}
        onChange={val => setPersonalAccessToken(val)}
      />

      <div className="flex flex-col text-sm">
        <a
          href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
          target="_blank"
          rel="noreferrer"
        >
          Create a Personal Access Token without any scopes.
        </a>
        <span>The PAT is confidentially authenticated using the Khaos oracle.</span>
      </div>

      <div className="float-right flex flex-col items-end">
        <button
          type="submit"
          className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded px-4 py-2 ${
            isValid ? 'opacity-100' : 'opacity-60'
          }`}
          disabled={!isValid}
          onClick={submit}
        >
          Preview
        </button>
      </div>
    </div>
  )
}

export default GithubForm
