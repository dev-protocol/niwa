import React from 'react'
import HomeNavItem from '../../components/HomeNavItem'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="grid-2">
      <HomeNavItem
        title="Tokens"
        path="/tokenize"
        message="Launch your project tokens and manage them"
        isExternal={false}
      />
      <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" isExternal={false} />
    </section>
  )
}

export default Home
