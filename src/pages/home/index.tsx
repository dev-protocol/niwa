import { FunctionComponent } from 'react'
import HomeNavItem from './HomeNavitem'
import STokenPositionDetail from '../supporters'

interface HomeProps { }

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="flex justify-center">
      <nav className="pt-12">
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded drop-shadow">
          <HomeNavItem title="Tokens" path="/tokens" message="Launch your project tokens and manage them" />
        </div>
        <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded drop-shadow">
          <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" />
        </div>
      </nav>
      <STokenPositionDetail />
    </div>
  )
}

// 243, 170, 60
// 250, 250, 220

export default Home
