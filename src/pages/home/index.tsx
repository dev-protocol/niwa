import React from 'react'
import HomeNavItem from '../../components/HomeNavItem'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
      <HomeNavItem
        title="Tokens"
        path="/tokenize"
        message="Launch your property tokens with Proof of Ownership"
        isExternal={false}
      />
      <HomeNavItem
        title="Holders"
        isDisabled={true}
        message="Send your tokens to community members and manage them"
        isExternal={false}
      />
      <HomeNavItem
        title="sTokens"
        isDisabled={true}
        message="View your supporters and manage sTokens"
        isExternal={false}
      />
      <HomeNavItem title="Perks" isDisabled={true} message="Offer perks and get more support" isExternal={false} />
      <HomeNavItem title="Growth" isDisabled={true} message="Grow your project and make friends" isExternal={false} />
    </section>
  )
}

export default Home
