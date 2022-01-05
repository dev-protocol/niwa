import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface HomeNavItemProps {
    title: string;
    message: string;
    path: string;
}
 
const HomeNavItem: FunctionComponent<HomeNavItemProps> = ({title, message, path}) => {
    return (
        <Link className={`flex flex-col mb-12 px-12 py-8`} to={path}>
            <div className="flex items-center">
                <span className="text-2xl font-bold mr-3">{title}</span>
                <div className="pt-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
            <span>{message}</span>
        </Link>
    );
}
 
export default HomeNavItem;