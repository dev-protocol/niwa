import React, { useCallback, useEffect } from 'react'
import HSButton from '../../components/HSButton'
import { SectionLoading } from '../../components/Spinner'
import { Market } from '../../const'

interface TokenizeResultProps {
  isLoading: boolean
  errorMessage?: string
  newPropertyAddress?: string
  market?: Market
  tokenSymbol: string
}

const TokenizeResult: React.FC<TokenizeResultProps> = ({
  isLoading,
  errorMessage,
  newPropertyAddress,
  market,
  tokenSymbol
}) => {
  const addToWalletList = useCallback(async () => {
    const tokenDecimals = 18

    try {
      if (!window.ethereum) {
        return
      }

      window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: newPropertyAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals // The number of decimals in the token
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [tokenSymbol, newPropertyAddress])

  useEffect(() => {
    if (!newPropertyAddress || (newPropertyAddress && newPropertyAddress === '')) {
      return
    }

    addToWalletList()

    // add to wallet list
  }, [addToWalletList, newPropertyAddress])

  return (
    <>
      {isLoading && <SectionLoading />}
      {!isLoading && (
        <>
          {newPropertyAddress && (
            <div>
              <h2 className="mb-sm w-full text-2xl">Tokenization Success</h2>
              <div className="flex flex-col justify-between sm:flex-row">
                <div className="flex flex-col">
                  <h3>Your Token</h3>
                  <span>{newPropertyAddress}</span>
                </div>
                <HSButton link={`/properties/${newPropertyAddress}`} type="filled" label="View Your Token" />
              </div>
            </div>
          )}
          {!newPropertyAddress && (
            <div>
              <h2 className="mb-sm w-full text-2xl">Tokenization Error</h2>
              <div className="flex justify-between">
                <span>{errorMessage ?? `Error tokenizing ${market} property`}</span>
                <HSButton
                  link={`/tokenize/${market ? market.toLowerCase() : ''}`}
                  type="filled"
                  label="Back to Tokenization"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default TokenizeResult
