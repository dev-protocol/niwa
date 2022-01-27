import React, { useEffect, useState } from 'react'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { useProvider } from '../../context/walletContext'
import HomeNavItem from './HomeNavitem'
import STokenPositionDetail from '../supporters'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const { ethersProvider } = useProvider()
  const [userTokensPath, setUserTokensPath] = useState(EMPTY_USER_TOKEN_PATH)
  useEffect(() => {
    if (!ethersProvider) {
      setUserTokensPath(EMPTY_USER_TOKEN_PATH)
      return
    }
    ; (async () => {
      const address = await ethersProvider.getSigner().getAddress()
      setUserTokensPath(address ?? EMPTY_USER_TOKEN_PATH)
    })()
  }, [ethersProvider])

  return (
    <section className="grid-2">
      <HomeNavItem title="Tokens" path={userTokensPath} message="Launch your project tokens and manage them" />
      <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" />
    </section>
  )
}

export default Home
