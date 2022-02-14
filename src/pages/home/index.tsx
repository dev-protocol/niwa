import React from 'react'
import HomeNavItem from '../../components/HomeNavItem'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="grid grid-cols-1 gap-sm sm:grid-cols-2">
      <HomeNavItem
        title="Tokens"
        path="/tokenize"
        message="Launch your property tokens with Proof of Ownership"
        isExternal={false}
      />
      <HomeNavItem
        title="Share"
        isDisabled={true}
        message="Send your tokens to community members and manage them"
        isExternal={false}
      />
      <HomeNavItem title="Perks" isDisabled={true} message="Offer perks and get more support" isExternal={false} />
      <HomeNavItem title="Apps" isDisabled={true} message="Find ways to grow your project" isExternal={false} />
    </section>
  )
}

export default Home
