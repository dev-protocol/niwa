import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface TokenizeLinkProps {
  title: string;
  icon: IconDefinition;
  details: string;
  iconColor?: string;
  disabled?: boolean;
  path: string;
}

const TokenizeLink: FunctionComponent<TokenizeLinkProps> = ({
  title,
  icon,
  details,
  iconColor,
  path,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col border-2 border-grey-500 rounded-lg">
      {disabled && (
        <div>
          <TokenizeLinkContent
            title={title}
            icon={icon}
            details={details}
            iconColor={iconColor}
            path={path}
            disabled={disabled}
          ></TokenizeLinkContent>
        </div>
      )}
      {!disabled && (
        <Link to={path}>
          <TokenizeLinkContent
            title={title}
            icon={icon}
            details={details}
            iconColor={iconColor}
            path={path}
            disabled={disabled}
          ></TokenizeLinkContent>
        </Link>
      )}
    </div>
  );
};

const TokenizeLinkContent: FunctionComponent<TokenizeLinkProps> = ({
  title,
  icon,
  details,
  iconColor,
  path,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col p-8">
      <div className={`flex items-center justify-between w-full mb-2`}>
        <div className="flex items-center">
          <FontAwesomeIcon
            className="mr-2"
            icon={icon}
            style={{ color: iconColor ?? "black", opacity: disabled ? 0.5 : 1 }}
            size="2x"
          />
          <span
            className={`font-bold text-lg ${
              disabled ? "text-gray-400" : "text-black"
            }`}
          >
            {title}
          </span>
        </div>
        {disabled && <span className="text-gray-400 text-sm">Coming Soon</span>}
      </div>
      <span className="text-gray-400 text-sm">{details}</span>
    </div>
  );
};

export default TokenizeLink;
