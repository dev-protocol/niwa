import { FunctionComponent } from "react";
import BackButton from "../../components/BackButton";
import TokenizeLink from "./TokenizeLink";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

interface TokensPageProps {}

const TokensPage: FunctionComponent<TokensPageProps> = () => {
  return (
    <div>
      <BackButton title="Home" path="/" />
      <h1 className="page-header">Tokens</h1>
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
          disabled={true}
          path="#"
        />
      </div>
    </div>
  );
};

export default TokensPage;
