import React from 'react'
import HomeNavItem from '../../components/HomeNavItem'

interface NetworkSelectPageProps {}

const NetworkSelectPage: React.FC<NetworkSelectPageProps> = () => {
  return (
    <section className="grid md:grid-rows-2">
      <HomeNavItem title="Tokens" path="/tokenize" message="Launch your project tokens and manage them" />
      <HomeNavItem title="Growth" path="/growth" message="Grow your project and make friends" />
    </section>
  )
}

export default NetworkSelectPage
