import React from 'react'
import { FaDiscord, FaGithubSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { DEPLOYMENTS } from '../../const'
import { DPLFooter, DPLFooterSection } from '../DPLFooter'
import FooterImg from '../../img/FOOTER_IMG_Powered by Dev Protocol.svg'

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <DPLFooter className="relative">
      <div className="flex justify-between">
        <DPLFooterSection>
          <div className="grid gap-4">
            <ul className="text-sm">
              <p className="font-bold text-md">Network</p>
              <li>
                <a href={DEPLOYMENTS.arbitrum_one}>Arbitrium</a>
              </li>
              <li>
                <a href={DEPLOYMENTS.polygon_mainnet}>Polygon</a>
              </li>
            </ul>
            <ul className="text-sm">
              <p className="font-bold text-md">Testnet</p>
              <li>
                <a href={DEPLOYMENTS.arbitrum_rinkeby}>Arbitrum Rinkeby</a>
              </li>
              <li className="text-sm">
                <a href={DEPLOYMENTS.polygon_mumbai}>Polygon Mumbai</a>
              </li>
            </ul>
          </div>
          <ul className="text-sm text-gray-400 grid grid-flow-col gap-4">
            <li>
              {/* <a href="https://github.com/dev-protocol/niwa/blob/main/TERMS-AND-CONDITIONS.md">Terms and Conditions</a> */}
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
          <ul className="text-sm grid grid-flow-col gap-4">
            <li>
              <a className="flex align-center gap-1" href="https://github.com/dev-protocol/niwa">
                <FaGithubSquare size="1.2rem" /> GitHub
              </a>
            </li>
            <li>
              <a className="flex align-center gap-1" href="https://discord.gg/VwJp4KM">
                <FaDiscord size="1.2rem" /> Discord
              </a>
            </li>
          </ul>
        </DPLFooterSection>
        <DPLFooterSection>
          <a href="https://devprotocol.xyz" target="_blank" rel="noreferrer">
            <img width="100px" height="auto" src={FooterImg} alt="Footer Image" />
          </a>
        </DPLFooterSection>
      </div>
    </DPLFooter>
  )
}

export default Footer
