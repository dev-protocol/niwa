import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UndefinedOr } from '@devprotocol/util-ts'
import { Market } from '../../const'
import { getMarketFromString } from '../../utils/utils'
import PageHeader from '../../components/PageHeader'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import { ethers } from 'ethers'
import GithubForm from './GithubForm'
import YouTubeForm from './YouTubeForm'

interface TokenizeFormPageProps {}

const TokenizeFormPage: FunctionComponent<TokenizeFormPageProps> = () => {
  const params = useParams()
  const [market, setMarket] = useState<UndefinedOr<Market>>()
  const [network, setNetwork] = useState<UndefinedOr<ethers.providers.Network>>()
  const [address, setAddress] = useState('')
  const web3Context = useWeb3Provider()
  const navigate = useNavigate()

  useEffect(() => {
    const { market } = params
    if (getMarketFromString(market) === Market.INVALID) {
      navigate('/tokenize')
      return
    }

    setMarket(getMarketFromString(market))
  }, [params, navigate])

  const detectNetwork = useCallback(async () => {
    if (web3Context?.web3Provider) {
      const net = await web3Context?.web3Provider.detectNetwork()
      setNetwork(net)
    }
  }, [web3Context, setNetwork])

  useEffect(() => {
    if (web3Context?.web3Provider) {
      const provider = web3Context.web3Provider
      detectNetwork()
      ;(async () => {
        const userAddress = await provider.getSigner().getAddress()
        setAddress(userAddress)
      })()
    }
  }, [web3Context, detectNetwork])

  return (
    <div>
      <PageHeader title="Invitation Request" />
      {market === Market.GITHUB && <GithubForm network={network} address={address} />}
      {market === Market.YOUTUBE && <YouTubeForm />}
    </div>
  )
}

export default TokenizeFormPage
