import { FunctionComponent, useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import TokenizeLink from "./TokenizeLink";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { UserToken } from "../../types/userToken";

interface TokensPageProps {}

const TokensPage: FunctionComponent<TokensPageProps> = () => {
  const [userTokens, setUserTokens] = useState<UserToken[]>([]);

  useEffect(() => {
    // TODO: fetch user tokens
  }, []);

  return (
    <div>
      <BackButton title="Home" path="/" />
      <h1 className="page-header">Tokens</h1>
      <div className="mb-6">
        <h2 className="section-header">Tokenize Your Project</h2>
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
          <div></div>
        </div>
      </div>
      <div>
        <h2 className="section-header">Your Tokens</h2>
        {userTokens.length <= 0 && (
          <div className="border-2 border-grey-500 rounded-lg flex justify-center py-12">
            <span>Create your first token!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokensPage;
