import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  title: string;
  path: string;
}

const BackButton: FunctionComponent<BackButtonProps> = ({ title, path }) => {
  return (
    <Link to={path}>
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faChevronLeft} size="xs" className="mr-2" />
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default BackButton;
