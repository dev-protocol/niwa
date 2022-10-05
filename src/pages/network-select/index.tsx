import React from 'react'
import HomeNavItem from '../../components/HomeNavItem'
import HSButton from '../../components/HSButton'
import Eyecatching from '../../img/og.png'

interface NetworkSelectPageProps {}

const NetworkSelectPage: React.FC<NetworkSelectPageProps> = () => {
  return (
    <article className="grid gap-6">
      <section className="grid gap-4">
        <img src={Eyecatching} className="rounded-lg shadow"></img>
        <p className="text-center">
          <HSButton link="/how-it-works" type="filled">
            How it works
          </HSButton>
        </p>
      </section>
      <section className="grid gap-4">
        <h2 className="text-6xl font-bold">Choose network</h2>
        <HomeNavItem
          title="Arbitrum"
          path="https://arbitrum.niwa.xyz/"
          message="Tokenize your project on Arbitrum"
          isExternal={true}
        />
        <HomeNavItem
          title="Polygon"
          path="https://polygon.niwa.xyz/"
          message="Tokenize your project on Polygon"
          isExternal={true}
        />
        <HomeNavItem
          title="Polygon Testnet"
          path="https://polygon-mumbai.niwa.xyz/"
          message="Explore tokenizing your project on the Polygon Testnet"
          isExternal={true}
        />
      </section>
    </article>
  )
}

export default NetworkSelectPage
