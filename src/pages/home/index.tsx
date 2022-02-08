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
        className="bg-grad-orange bg-center bg-no-repeat bg-cover"
      />
      <HomeNavItem
        title="Holders"
        isDisabled={true}
        message="Send your tokens to community members and manage them"
        isExternal={false}
        className="bg-grad-blue bg-center bg-no-repeat bg-cover"
      />
      <HomeNavItem
        title="sTokens"
        isDisabled={true}
        message="View your supporters and manage sTokens"
        isExternal={false}
        className="bg-grad-blue bg-center bg-no-repeat bg-cover"
      />
      <HomeNavItem
        title="Perks"
        isDisabled={true}
        message="Offer perks and get more support"
        isExternal={false}
        className="bg-grad-blue bg-center bg-no-repeat bg-cover"
      />
      <HomeNavItem
        title="Growth"
        isDisabled={true}
        message="Grow your project and make friends"
        isExternal={false}
        className="bg-grad-blue bg-center bg-no-repeat bg-cover"
      />
    </section>
  )
}

export default Home
