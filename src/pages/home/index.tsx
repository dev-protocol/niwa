import React, { useEffect, useState } from 'react'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { useWeb3Provider } from '../../context/web3ProviderContext'
import HomeNavItem from './HomeNavitem'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const web3Context = useWeb3Provider()
  const [userTokensPath, setUserTokensPath] = useState(EMPTY_USER_TOKEN_PATH)
  useEffect(() => {
    const userProvider = web3Context?.web3Provider
    if (!userProvider) {
      setUserTokensPath(EMPTY_USER_TOKEN_PATH)
      return
    }
    ;(async () => {
      const address = await userProvider.getSigner().getAddress()
      setUserTokensPath(address ?? EMPTY_USER_TOKEN_PATH)
    })()
  }, [web3Context])

  return (
    <section className="grid-2">
      <HomeNavItem title="Tokens" path={userTokensPath} message="Launch your project tokens and manage them" />
      <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" />
    </section>
  )
}

export default Home
