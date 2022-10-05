import React from 'react'
import { FaDiscord, FaGithubSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { DEPLOYMENTS } from '../../const'
import { DPLHr } from '../DPLHr'
import FooterImg from '../../img/FOOTER_IMG_Powered by Dev Protocol.svg'

interface FooterProps {}

interface DPLFooterProps {
  className?: string
}

const DPLFooter: React.FC<DPLFooterProps> = ({ className, children }) => {
  return (
    <footer className={`mt-lg ${className}`}>
      <DPLHr />
      <div className="py-md ">{children}</div>
    </footer>
  )
}

const DPLFooterSection: React.FC<DPLFooterProps> = ({ children }) => {
  return <div className="grid justify-items-start gap-8">{children}</div>
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <DPLFooter className="relative">
      <div className="flex justify-between">
        <DPLFooterSection>
          <div className="grid gap-4">
            <ul className="text-sm">
              <p className="text-md font-bold">Network</p>
              <li>
                <a href={DEPLOYMENTS.arbitrum_one}>Arbitrium</a>
              </li>
              <li>
                <a href={DEPLOYMENTS.polygon_mainnet}>Polygon</a>
              </li>
            </ul>
            <ul className="text-sm">
              <p className="text-md font-bold">Testnet</p>
              <li className="text-sm">
                <a href={DEPLOYMENTS.polygon_mumbai}>Polygon Mumbai</a>
              </li>
            </ul>
          </div>
          <ul className="grid grid-flow-col gap-4 text-sm text-gray-400">
            <li>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
          <ul className="grid grid-flow-col gap-4 text-sm">
            <li>
              <a className="align-center flex gap-1" href="https://github.com/dev-protocol/niwa">
                <FaGithubSquare size="1.2rem" /> GitHub
              </a>
            </li>
            <li>
              <a className="align-center flex gap-1" href="https://discord.gg/VwJp4KM">
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
