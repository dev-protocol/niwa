import { FunctionComponent } from 'react'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import TokenizeLink from './TokenizeLink'
import { FaGithub, FaLightbulb, FaTwitter, FaYoutube } from 'react-icons/fa'

interface TokenizeMarketSelectProps {}

const TokenizeMarketSelect: FunctionComponent<TokenizeMarketSelectProps> = () => {
  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Create New Token" sub="Tokenize Your Project" />

      <section className="mb-lg">
        <h2 className="fs-h3 mb-md"></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm w-full">
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
            disabled={false}
            path="/tokenize/youtube"
          />

          <TokenizeLink
            title="Twitter"
            icon={<FaTwitter color="lightblue" size="24px" />}
            details="Tokenize your Twitter account to make your community more active"
            disabled={true}
            path="/tokenize/youtube"
          />

          <TokenizeLink
            title="?????????"
            icon={<FaLightbulb color="orange" size="24px" />}
            details="Suggest platform integration requests in the forum"
            disabled={true}
            path="/tokenize/youtube"
          />
        </div>
      </section>
    </div>
  )
}

export default TokenizeMarketSelect
