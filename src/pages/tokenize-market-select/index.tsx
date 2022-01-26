import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FunctionComponent } from 'react'
import BackButton from '../../components/BackButton'
import PageHeader from '../../components/PageHeader'
import TokenizeLink from './TokenizeLink'

interface TokenizeMarketSelectProps {}

const TokenizeMarketSelect: FunctionComponent<TokenizeMarketSelectProps> = () => {
  return (
    <div>
      <BackButton title="Your Tokens" path="/tokens" />
      <PageHeader title="Create New Token" />

      <div className="mb-6">
        <h2 className="section-header mb-2">Tokenize Your Project</h2>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TokenizeLink
            title="GitHub"
            icon={faGithub}
            details="Tokenize your GitHub repository to make OSS more active"
            path="/tokenize/github"
          />

          <TokenizeLink
            title="YouTube"
            icon={faYoutube}
            iconColor="#e93323"
            details="Tokenize your YouTube channel to pursue what you love"
            disabled={false}
            path="/tokenize/youtube"
          />
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default TokenizeMarketSelect
