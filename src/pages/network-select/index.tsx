import React from 'react'
import HomeNavItem from '../../components/HomeNavItem'

interface NetworkSelectPageProps {}

const NetworkSelectPage: React.FC<NetworkSelectPageProps> = () => {
  return (
    <section className="grid grid-rows-2">
      <HomeNavItem
        title="Arbitrum"
        path="https://arbitrum.niwa.xyz/"
        message="Stake on your favorite projects using the Arbitrum Network"
        isExternal={true}
      />
      <HomeNavItem
        title="Polygon"
        path="https://polygon.niwa.xyz/"
        message="Stake on your favorite projects using the Polygon Network"
        isExternal={true}
      />
      <HomeNavItem
        title="Arbitrum Testnet"
        path="https://arbitrum-rinkeby.niwa.xyz/"
        message="Explore the Dev Protocol on the Arbitrum Testnet"
        isExternal={true}
      />
      <HomeNavItem
        title="Polygon Testnet"
        path="https://polygon-mumbai.niwa.xyz/"
        message="Explore the Dev Protocol on the Polygon Mumbai Testnet"
        isExternal={true}
      />
    </section>
  )
}

export default NetworkSelectPage
