import { FunctionComponent, useEffect, useState } from 'react'
import { EMPTY_USER_TOKEN_PATH } from '../../const'
import { useProvider } from '../../context/walletContext'
import HomeNavItem from './HomeNavitem'

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { ethersProvider } = useProvider()
  const [userTokensPath, setUserTokensPath] = useState(EMPTY_USER_TOKEN_PATH)
  useEffect(() => {
    if (!ethersProvider) {
      setUserTokensPath(EMPTY_USER_TOKEN_PATH)
      return
    }
    ;(async () => {
      const address = await ethersProvider.getSigner().getAddress()
      setUserTokensPath(address ?? EMPTY_USER_TOKEN_PATH)
    })()
  }, [ethersProvider])

  return (
    <div className="flex justify-center">
      <nav className="pt-12">
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded drop-shadow">
          <HomeNavItem title="Tokens" path={userTokensPath} message="Launch your project tokens and manage them" />
        </div>
        <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded drop-shadow">
          <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" />
        </div>
      </nav>
    </div>
  )
}

export default Home
