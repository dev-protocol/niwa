import React from 'react'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'

interface WaitMarketPageProps {}

const WaitMarketPage: React.FC<WaitMarketPageProps> = () => {
  return (
    <>
      <BackButton title="Select Market" path="/tokenize" />
      <DPLTitleBar className="mb-sm" title="YouTube Coming Soon!" />
      <div className="text-lg">
        Please wait and watch{' '}
        <a className="text-link" href="https://discord.gg/cxHyurdTuM" target="_blank" rel="noreferrer">
          #🌈 niwa channel
        </a>{' '}
        on our Discord
      </div>
    </>
  )
}

export default WaitMarketPage
