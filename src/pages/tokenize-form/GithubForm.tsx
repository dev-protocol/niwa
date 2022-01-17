import { UndefinedOr } from '@devprotocol/util-ts'
import { ethers } from 'ethers'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import FormField from '../../components/Form'
import { isValidNetwork } from '../../utils/utils'

interface GithubFormProps {
  network: UndefinedOr<ethers.providers.Network>
  address: string
}

const GithubForm: FunctionComponent<GithubFormProps> = ({ network, address }) => {
  const [formValid, setFormValid] = useState(false)
  const [repoName, setRepoName] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [personalAccessToken, setPersonalAccessToken] = useState('')

  const validateForm = useCallback(() => {
    if (repoName.length <= 0) {
      setFormValid(false)
      return
    }

    if (tokenName.length < 3) {
      setFormValid(false)
      return
    }

    if (!isValidNetwork(network?.chainId)) {
      setFormValid(false)
      return
    }
    if (tokenSymbol.length < 3 || tokenSymbol.length > 4) {
      setFormValid(false)
      return
    }
    if (personalAccessToken.length <= 0) {
      setFormValid(false)
      return
    }

    setFormValid(true)
  }, [repoName.length, tokenName.length, tokenSymbol.length, personalAccessToken.length, network?.chainId])

  useEffect(() => validateForm(), [repoName, tokenName, tokenSymbol, personalAccessToken, validateForm])

  const submit = () => {
    if (!formValid) {
      return
    }
  }

  return (
    <form onSubmit={submit}>
      <FormField
        label="Network"
        id="network"
        required={true}
        value={network?.name ?? ''}
        placeholder="Please Connect Wallet"
        disabled={true}
        onChange={() => {}} // this is handled by connecting wallet
      />
      <div className="text-sm font-bold mb-6">Minting only available on Arbitrum and Polyon.</div>

      <FormField
        label="Your Wallet Address"
        id="address"
        required={true}
        value={address}
        placeholder="Please Connect Wallet"
        disabled={true}
        onChange={() => {}} // this is handled by connecting wallet
      />

      <FormField
        label="GitHub Repository Name"
        placeholder="owner_name/repository_name"
        id="repoName"
        required={true}
        value={repoName}
        onChange={val => setRepoName(val)}
      />

      <FormField
        label="Token Name"
        placeholder=""
        id="tokenName"
        required={true}
        value={tokenName}
        onChange={val => setTokenName(val)}
      />

      <FormField
        label="Token Symbol"
        placeholder=""
        id="tokenSymbol"
        required={true}
        value={tokenSymbol}
        onChange={val => setTokenSymbol(val)}
      />

      <FormField
        label="Personal Access Token"
        placeholder=""
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
            formValid ? 'opacity-100' : 'opacity-60'
          }`}
          disabled={!formValid}
        >
          Sign and submit
        </button>
      </div>
    </form>
  )
}

export default GithubForm
