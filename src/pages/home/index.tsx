import React from 'react'
import HomeNavItem from './HomeNavitem'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="grid-2">
      <HomeNavItem title="Tokens" path="/tokenize" message="Launch your project tokens and manage them" />
      <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" />
    </section>
  )
}

export default Home
