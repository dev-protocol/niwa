import { UndefinedOr } from '@devprotocol/util-ts'
import { useState } from 'react'
import { isError } from '../utils/utils'

export const useAddToWalletList = () => {
  const [error, setError] = useState<UndefinedOr<string>>()
  const callback = async (tokenSymbol: string, newPropertyAddress: string) => {
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
      setError(isError(error) ? error.message : `${error}`)
    }
  }
  return { addToWalletList: callback, error }
}
