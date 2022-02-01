import React from 'react'
import HomeNavItem from './HomeNavitem'
import STokenPositionDetail from '../supporters'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
<<<<<<< HEAD
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

=======
>>>>>>> 5e1ab509468ac48846ce6e660d3340146e5735fb
  return (
    <section className="grid-2">
      <HomeNavItem title="Tokens" path="/tokenize" message="Launch your project tokens and manage them" />
      <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" />
    </section>
  )
}

export default Home
