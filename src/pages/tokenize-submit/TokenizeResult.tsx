import React, { useCallback, useEffect } from 'react'
import HSButton from '../../components/HSButton'
import { SectionLoading } from '../../components/Spinner'
import { Market } from '../../const'
import { useAddToWalletList } from '../../hooks/useAddToWalletList'

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
  const { addToWalletList } = useAddToWalletList()

  const addToUserWallet = useCallback(async () => {
    if (!newPropertyAddress || (newPropertyAddress && newPropertyAddress === '')) {
      return
    }
    addToWalletList(tokenSymbol, newPropertyAddress)
  }, [tokenSymbol, newPropertyAddress, addToWalletList])

  useEffect(() => {
    addToUserWallet()
  }, [addToUserWallet, newPropertyAddress])

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
