import React from 'react'
import FormField from '../../components/Form'
import HSButton from '../../components/HSButton'
import { Market } from '../../const'

interface TokenizePreviewSubmitProps {
  networkName: string
  address: string
  assetName: string
  tokenName: string
  tokenSymbol: string
  pat: string
  market?: Market
  isDisabled: boolean
  submit: () => {}
}

const TokenizePreviewSubmit: React.FC<TokenizePreviewSubmitProps> = ({
  networkName,
  address,
  assetName,
  tokenName,
  tokenSymbol,
  pat,
  market,
  isDisabled,
  submit
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
        <FormField
          label="Network"
          id="network"
          value={networkName}
          placeholder="Please Connect Wallet"
          disabled
          required
        />
        <FormField
          label="Your Wallet Address"
          id="address"
          value={address}
          placeholder="Please Connect Wallet"
          disabled
          required
        />
        <FormField
          label={market === Market.YOUTUBE ? 'YouTube Channel ID' : 'GitHub Repository Name'}
          placeholder="owner_name/repository_name"
          id="repoName"
          value={assetName}
          disabled
          required
        />
        <FormField label="Token Name" id="tokenName" value={tokenName} required disabled />
        <FormField label="Token Symbol" id="tokenSymbol" value={tokenSymbol} required disabled />
        <FormField label="Personal Access Token" id="pac" value={pat} required disabled />
        <FormField label="Supply" id="supply" value="10,000,000" required disabled />
        <FormField label="Dev Protocol Treasury Fee" id="fee" value="500,000" required disabled>
          <div className="flex text-sm">
            <span>What is the </span>
            <a
              href="https://initto.devprotocol.xyz/en/what-is-treasury/"
              target="_blank"
              className="ml-1 text-link"
              rel="noreferrer"
            >
              Dev Protocol Treasury Fee?
            </a>
          </div>
        </FormField>
      </div>

      <div className="float-right flex flex-col items-end">
        <HSButton context="submit" type="filled" isDisabled={isDisabled} onClick={submit}>
          Sign and submit
        </HSButton>
      </div>
    </div>
  )
}

export default TokenizePreviewSubmit
