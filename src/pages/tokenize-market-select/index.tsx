import { FunctionComponent } from 'react'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import TokenizeLink from './TokenizeLink'
import { FaGithub, FaYoutube } from 'react-icons/fa'

interface TokenizeMarketSelectProps {}

const TokenizeMarketSelect: FunctionComponent<TokenizeMarketSelectProps> = () => {
  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Create New Token" />

      <section className="mb-lg">
        <h2 className="fs-h3 mb-md">Tokenize Your Project</h2>
        <div className="grid-2">
          <TokenizeLink
            title="GitHub"
            icon={<FaGithub size="24px" />}
            details="Tokenize your GitHub repository to make OSS more active"
            path="/tokenize/github"
          />

          <TokenizeLink
            title="YouTube"
            icon={<FaYoutube color="red" size="24px" />}
            details="Tokenize your YouTube channel to pursue what you love"
            path="#"
            disabled
          />
        </div>
      </section>
    </div>
  )
}

export default TokenizeMarketSelect
