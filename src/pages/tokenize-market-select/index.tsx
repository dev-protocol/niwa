import { FunctionComponent, useContext, useEffect } from 'react'
import BackButton from '../../components/BackButton'
import DPLTitleBar from '../../components/DPLTitleBar'
import TokenizeLink from './TokenizeLink'
import { FaDiscord, FaGithub, FaLightbulb, FaTwitter, FaYoutube } from 'react-icons/fa'
import TitleSubSection from '../../components/TitleSubSection'
import { TokenizeContext } from '../../context/tokenizeContext'

interface TokenizeMarketSelectProps {}

const TokenizeMarketSelect: FunctionComponent<TokenizeMarketSelectProps> = () => {
  const { reset } = useContext(TokenizeContext)

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <div>
      <BackButton title="Home" path="/" />
      <DPLTitleBar title="Create New Token" className="mb-md" />
      <TitleSubSection>
        <h2>Tokenize Your Project</h2>
      </TitleSubSection>

      <section className="mb-lg">
        <h2 className="fs-h3 mb-md"></h2>
        <div className="grid w-full grid-cols-1 gap-sm sm:grid-cols-2">
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
            title="Discord"
            icon={<FaDiscord color="#7289da" size="24px" />}
            details="Tokenize your Discord Guild to pursue what you love"
            path="/tokenize/discord"
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
            details={
              <>
                Suggest platform integration requests in{' '}
                <a
                  className="underline after:content-['↗']"
                  href="https://community.devprotocol.xyz/c/market/21"
                  target="_blank"
                  rel="norefferer noopener noreferrer"
                >
                  the forum
                </a>
              </>
            }
            disabled={true}
            path="/tokenize/youtube"
          />
        </div>
      </section>
    </div>
  )
}

export default TokenizeMarketSelect
